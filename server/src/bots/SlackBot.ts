const { WebClient } = require("@slack/web-api");

export default class SlackBot {
    private client: any;

    /**
     * Constructor
     *
     * @param token
     */
    public constructor(token: string) {
        this.client = new WebClient(token);
        console.log("Slack Bot is created !");
    }

    /**
     * Get client
     *
     * @returns client
     */
    public getClient() {
        return this.client;
    }
}