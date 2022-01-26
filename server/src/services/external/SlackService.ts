import SlackBot from "../../bots/SlackBot";

export default class SlackService {

    public async SendMessageToChannel(channelId : string, message : string) {
        try {
            const result = await SlackBot.getClient().chat.postMessage({channel: channelId, text: message});
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
}