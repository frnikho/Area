const { WebClient } = require("@slack/web-api");

export default class SlackService {

    private readonly client;

    constructor() {
        this.client = new WebClient(process.env.SLACK_BOT_TOKEN)
    }

    public async SendMessageToChannel(channelId : string, message : string) {
        try {
            const result = await this.client.chat.postMessage({channel: channelId, text: message});
        } catch (error) {
            console.log(error);
        }
    }
}