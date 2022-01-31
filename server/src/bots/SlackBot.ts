import Logger from "../utils/Logger";

const { WebClient } = require("@slack/web-api");

export default class SlackBot {

    private readonly client: any;

    /**
     * Constructor
     *
     * @param token
     */
    public constructor(token: string) {
        this.client = new WebClient(token);
        Logger.i("Slack", "Slack bot is created")
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
