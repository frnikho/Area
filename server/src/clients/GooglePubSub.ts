import {PubSub} from "@google-cloud/pubsub";
import * as pub from "@google-cloud/pubsub";

export class GooglePubSub {

    private client: pub.PubSub;

    constructor() {
        this.client = new PubSub({
            projectId: process.env.GOOGLE_PROJECT_ID,
        });
    }

    public startSubscription() {
        this.client.topic('projects/area-338416/topics/gmail').createSubscription('', (error, sub) => {

        })
    }

}
