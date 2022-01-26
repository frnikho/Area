import DiscordBot from "../../bots/DiscordBot";

export default class DiscordService {

    public sendDiscordBotChanelMessage(channelId: string, message: String) {
        let channel = DiscordBot.getClient().channels.cache.get(channelId);
        channel.send(message)
    }

}
