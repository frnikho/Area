const { WebClient } = require("@slack/web-api");

export default class SlackBot {
    private static client = undefined;

    public constructor() {
        if (SlackBot.client !== undefined)
            throw "You can only create a instance of this class !";
        SlackBot.client = new WebClient(process.env.SLACK_BOT_TOKEN);
        console.log("Slack Bot is online !");
    }

    public static getClient() {
        return SlackBot.client;
    }
}