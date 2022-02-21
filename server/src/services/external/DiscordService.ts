import DiscordBot from "../../bots/DiscordBot";
import {Context} from "../../models/Context";
import {User} from "../../models/User";
import axios from "axios";

export default class DiscordService {

    public sendDiscordBotChanelMessage(channelId: string, message: string) {
        const channel = DiscordBot.getClient().channels.cache.get(channelId);
        channel.send(message)
    }

    public listChannels(user: User, context: Context, callback: (success?: object, error?: string) => void) {
        const guildId = context.tokenData.token['guild']['id'];
        axios.get(`https://discord.com/api/guilds/${guildId}/channels`, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_SERVICES_BOT_TOKEN}`,
            }
        }).then((response) => {
            return callback(response.data);
        }).catch((err) => {
            return callback(undefined, err);
        });

    }

}
