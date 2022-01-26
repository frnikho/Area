import SlackBot from "../../bots/SlackBot";
import {SlackChannelList} from "../../models/Slack";

type success = (data: object) => void;
type error = (error: string) => void;

export default class SlackService {

    public async SendMessageToChannel(bot: SlackBot, channelId : string, message : string) {
        try {
            await bot.getClient().chat.postMessage({channel: channelId, text: message});
        } catch (error) {
            console.log(error);
        }
    }

    public async ListChannelsOfTeam(bot: SlackBot, successFunc: success, errorFunc: error) {
        try {
            let result = await bot.getClient().conversations.list();
            return successFunc(
                result.channels.map(channels => {
                    return {
                        id: channels.id,
                        name: channels.name,
                        nbMembers: channels.num_members
                    } as SlackChannelList}
                )
            );
        } catch (err) {
            return errorFunc(err);
        }
    }
}