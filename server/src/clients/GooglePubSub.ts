import {PubSub} from "@google-cloud/pubsub";
import * as pub from "@google-cloud/pubsub";

export class GooglePubSub {

    private client: pub.PubSub;

    constructor() {
        this.client = new PubSub({
            projectId: process.env.GOOGLE_PROJECT_ID,
        });
    }

    public test() {
        this.client.subscription('projects/area-338416/subscriptions/gmail-sub').on('message', (data: pub.Message) => {
            console.log({
                time: data.publishTime,
                msg: data.data.toString(),
            });
            let msg: object = JSON.parse(data.data.toString());

            data.ack();
        });
    }

}
