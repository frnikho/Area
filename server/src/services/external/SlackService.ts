import SlackBot from "../../bots/SlackBot";
import {SlackChannelList} from "../../models/Slack";

type success = (data: any) => void;
type error = (error: string) => void;

export default class SlackService {

    /**
     * Send message to channel
     *
     * @param bot - Slack Bot
     * @param channelId - Channel id, channel to send a message
     * @param message - Text of the message to send
     */
    public async SendMessageToChannel(bot: SlackBot, channelId: string, message: string) {
        try {
            await bot.getClient().chat.postMessage({channel: channelId, text: message});
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Send a scheduled message bot
     *
     * @param bot - Slack Bot
     * @param channelId - Channel id, channel to send a message
     * @param message - Text of the message to send
     * @param schedule - Unix EPOCH timestamp of time in future to send the message
     * @param successFunc - success callback function
     * @param errorFunc - error callback function
     * @returns error or success
     */
    public async SendScheduleMessage(bot: SlackBot, channelId: string, message: string, schedule: string, successFunc: success, errorFunc: error) {
        try {
            await bot.getClient().chat.scheduleMessage({
                channel: channelId,
                text: message,
                post_at: schedule
              });
            return successFunc("Message:`" + message + "` has been scheduled at " + schedule + " in channel " + channelId);
        } catch (e) {
            return errorFunc(e);
        }
    }

    /**
     * List all channels of team
     *
     * @param bot - Slack Bot
     * @param successFunc - success callback function
     * @param errorFunc - error callback function
     * @returns error or success: channels info formated as SlackChannelList
     */
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