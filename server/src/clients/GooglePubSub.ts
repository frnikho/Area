import * as pub from "@google-cloud/pubsub";
import {PubSub} from "@google-cloud/pubsub";
import Logger from "../utils/Logger";
import AppletController from "../controllers/AppletController";
import ContextController from "../controllers/ContextController";
import {Services} from "../models/Services";
import GoogleService from "../services/external/GoogleService";
import ReactionManager from "../managers/ReactionManager";
import {ingredientsHook} from "../utils/Ingredients";
import {ActionType} from "../models/Applet";

const base64 = require('base-64');

interface GmailMailData {
    id: string,
    deliveredTo: string,
    from: string,
    to: string,
    subject: string,
    date: Date,
    body: string,
}

export class GooglePubSub {

    private client: pub.PubSub;
    private reactionManager: ReactionManager;

    constructor() {
        this.reactionManager = ReactionManager.get();
        this.client = new PubSub({
            projectId: process.env.GOOGLE_PROJECT_ID,
        });
        Logger.i("Google Client PubSub initialize");
    }

    public parseJsonGmailData(json): GmailMailData {
        const headers = json['payload']['headers'];
        const deliveredTo = headers.find((header) => header.name === "Delivered-To")['value'];
        const from = headers.find((header) => header.name === "From")['value'];
        const to = headers.find((header) => header.name === "To")['value'];
        const subject = headers.find((header) => header.name === "Subject")['value'];

        let bodyBase64;
        try {
            const bodyPart = json['payload']['parts'].find((part) => part['mimeType'] === "text/plain");
            bodyBase64 = new Buffer(bodyPart['body']['data'], 'base64').toString("utf8");
        } catch (ex) {
            console.log(ex);
        }

        return {
            id: json['id'],
            deliveredTo,
            to,
            subject,
            from,
            date: json['internalDate'],
            body: bodyBase64,
        }
    }

    public test() {
        this.client.subscription(process.env.GMAIl_PUBSUB_SUBSCRIPTION).on('message', (data: pub.Message) => {
            let payload;
            data.ack();
            try {
                payload = JSON.parse(data.data.toString());
            } catch (ex) {
                return;
            }
            new AppletController().getGmailApplets(payload['emailAddress'] as string, (applet, error) => {
                if (error)
                    return Logger.e(error);
                const userUuid = applet.action.parameters.find((params) => params['name'] === 'user_uuid')['value'];
                const historyId = applet.action_key;
                const contextUuid = applet.action.parameters.find((params) => params['name'] === 'context_uuid')['value'];
                new ContextController().getContextByUuid(userUuid, Services.GOOGLE, contextUuid, (context) => {
                    GoogleService.getHistoryEmailId(context, userUuid, historyId, (historyData, historyError) => {
                        if (error)
                            return Logger.e(`GooglePubSub: ${historyError}`);
                        const history = historyData['history']
                        if (history === undefined || history.length === 0)
                            return Logger.d("GooglePubSub: History is undefined");
                        const messagesAdded: object[] = history[0]['messagesAdded'];
                        if (messagesAdded === undefined || messagesAdded.length === 0)
                            return Logger.d("GooglePubSub: messagesAdded undefined or empty");
                        const emailId: string = messagesAdded[0]['message']['id'];
                        GoogleService.getEmail(context, applet.uuid, emailId, (emailData, emailError) => {
                            if (emailError)
                                return Logger.e(emailError);
                            const gmailData: GmailMailData = this.parseJsonGmailData(emailData);
                            new AppletController().updateAppletActionKey(applet.uuid, payload['historyId'], (updateAppletError) => {
                                if (updateAppletError)
                                    return Logger.e(updateAppletError);
                                Logger.i(`GooglePubSub: Email received successfully: '${emailId}'`)
                                applet.reactions.forEach((reaction) =>
                                     this.reactionManager.callReaction(reaction, ingredientsHook(gmailData, ActionType.gmail_new_email), context.tokenData.token['access_token'], () => {}, () => {})
                                );
                            });
                        })
                    })
                })
            });

        });
    }

}
