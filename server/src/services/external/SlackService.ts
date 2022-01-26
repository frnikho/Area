import SlackBot from "../../bots/SlackBot";
import {SlackChannelList} from "../../models/Slack";

export default class SlackService {

    public async SendMessageToChannel(channelId : string, message : string) {
        try {
            await SlackBot.getClient().chat.postMessage({channel: channelId, text: message});
        } catch (error) {
            console.log(error);
        }
    }

    public async ListChannelsOfTeam(teamId : string) {
        try {
            let result = await SlackBot.getClient().conversations.list();
            console.log(result);
            return result.channels.map(channels => {
                return {
                    id: channels.id,
                    name: channels.name,
                    nbMembers: channels.num_members
            } as SlackChannelList
                });
        } catch (error) {
            console.log(error);
        }
    }
}