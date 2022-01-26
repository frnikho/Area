import {Webhooks} from "@octokit/webhooks";
import AppletController from "../controllers/AppletController";
import {ingredientsHook} from "../utils/Ingredients";
import {ActionType} from "../models/Applet";

const EventSource = require('eventsource');

export default class GithubWebhook {

    private readonly webhooks: Webhooks;

    constructor() {
        this.webhooks = new Webhooks({
            secret: process.env.GITHUB_WEBHOOK_SECRET
        })

        this.webhooks.on('push', this.onPush);
        this.webhooks.on('repository', this.onRepositoryCreated);
    }

    private onPush(data): void {
        let repo_name: string = data.payload.repository.full_name;
        console.log(data.payload);
        const appletController = new AppletController();
        appletController.getAppletsByTypeAndKey('github_repository_push', repo_name, (applets) => {
            applets.forEach((applet) => {
                let parameters: object[] = applet.action.parameters;
                let repository = parameters.filter((param) => param['name'] === 'repository_name')[0];
                if (repository['value'] === repo_name) {
                    appletController.callReactions(applet, ingredientsHook(data.payload, ActionType.github_repository_push),(error) => {
                        if (error)
                            console.log(error);
                    });
                }
            });
        }, (err) => {
            console.log("Error", err);
        });
    }

    private onRepositoryCreated(data): void {
        console.log(data.name);
    }

    public getWebhooks(): Webhooks {
        return this.webhooks;
    }

    public init(): void {
        const webhookProxyUrl = process.env.WEBHOOK_PROXY_URL;

        const source = new EventSource(webhookProxyUrl);
        source.onmessage = (event) => {
            const webhookEvent = JSON.parse(event.data);
            this.webhooks.verifyAndReceive({
                id: webhookEvent["x-request-id"],
                name: webhookEvent["x-github-event"],
                signature: webhookEvent["x-hub-signature"],
                payload: webhookEvent.body,
            }).catch((err) => console.error("Github Webhook", err));
        }
    }
}
