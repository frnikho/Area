import {Webhooks} from "@octokit/webhooks";
import AppletController from "../controllers/AppletController";

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


        //new AppletController().getAppletsByActionTypeAndUserUuid('github_repository_push')

        console.log(data.name);
        console.log(data.payload.repository.full_name);

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
