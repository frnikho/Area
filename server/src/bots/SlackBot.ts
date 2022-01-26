const { WebClient } = require("@slack/web-api");

export default class SlackBot {
    private client: any;

    public constructor(token: string) {
        this.client = new WebClient(token);
        console.log("Slack Bot is created !");
    }

    public getClient() {
        return this.client;
    }
}