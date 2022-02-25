import * as pub from "@google-cloud/pubsub";
import {PubSub} from "@google-cloud/pubsub";
import Logger from "../utils/Logger";
import AppletController from "../controllers/AppletController";
import ContextController from "../controllers/ContextController";
import {Services} from "../models/Services";

export class GooglePubSub {

    private client: pub.PubSub;

    constructor() {
        this.client = new PubSub({
            projectId: process.env.GOOGLE_PROJECT_ID,
        });
        Logger.i("Google Client PubSub initialize");
    }

    public test() {
        this.client.subscription(process.env.GMAIl_PUBSUB_SUBSCRIPTION).on('message', (data: pub.Message) => {
            console.log({
                time: data.publishTime,
                msg: data.data.toString(),
            });
            const payload = JSON.parse(data.data.toString());
            console.log("NEW EMAIL", payload);

            new AppletController().getGmailApplets(payload['historyId'] as string, (applet, error) => {
                if (error)
                    return Logger.e(error);
                const userUuid = applet.action.parameters.find((params) => params['name'] === 'user_uuid')['value'];
                const contextUuid = applet.action.parameters.find((params) => params['name'] === 'context_uuid')['value'];
                new ContextController().getContextByUuid(userUuid, Services.GOOGLE, contextUuid, (context) => {
                    console.log(applet, context);
                })
            });
            data.ack();
            // GoogleService.getHistoryEmailId(payload['emailAddress'], payload['historyId'])

        });
    }

}
