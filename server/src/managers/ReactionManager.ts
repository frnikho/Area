import {Ingredient, Reaction, ReactionType} from "../models/Applet";
import {TokenData} from "../controllers/ServiceController";
import DiscordService from "../services/external/DiscordService";
import Logger from "../utils/Logger";
import ContextController from "../controllers/ContextController";
import {Services} from "../models/Services";
import SpotifyService from "../services/external/SpotifyService";
import TwitterService from "../services/external/TwitterService";

type reactionsFunc = (reaction: Reaction, ingredients: Ingredient[], tokenData: TokenData) => void;
type reactionHook = {type: ReactionType, func: reactionsFunc};

export class ReactionEnd {

    private readonly _success: boolean;
    private readonly _error?: string;

    public constructor(success: boolean, error?: string) {
        this._success = success;
        this._error = error;
    }
}

export default class ReactionManager {

    private static instance: ReactionManager;
    private readonly reactions: reactionHook[] = [
        {type: ReactionType.discord_send_chanel_message, func: this.discordSendChanelMessage},
        {type: ReactionType.spotify_play_track, func: this.spotifyPlay},
        {type: ReactionType.spotify_pause_track, func: this.spotifyPause},
        {type: ReactionType.spotify_change_volume, func: this.spotifyChangeVolume},
        {type: ReactionType.twitter_post_tweet, func: this.twitterPostTweet}]

    private constructor() {
        Logger.i("AREA", "ReactionManager initialize");
    }

    public static get(): ReactionManager {
        if (this.instance === undefined)
            ReactionManager.instance = new ReactionManager();
        return ReactionManager.instance;
    }

    public callReaction(reaction: Reaction, ingredients: Ingredient[], tokenData: TokenData, success: () => void, error: (msg) => void) {
        try {
            this.reactions.forEach((hook) => {
                if (hook.type === reaction.type)
                    hook.func(reaction, ingredients, tokenData);
            })
        } catch (ex) {
            return error("An error occurred (4001) !");
        }
        return success();
    }

    private twitterPostTweet(reaction: Reaction, ingredients: Ingredient[], tokenData: TokenData) {
        const userUuid: string = reaction.parameters.filter((param) => param['name'] === 'user_uuid')[0]['value'];
        const text: string = reaction.parameters.filter((param) => param['name'] === 'text')[0]['value'];

        new TwitterService().SendTweet(tokenData.token["access_token"], userUuid, text, (status, response) => {
            if (status === false)
                console.error(response);
        });
    }

    private discordSendChanelMessage(reaction: Reaction, ingredients: Ingredient[], tokenData: TokenData): void {
        const channelId: string = reaction.parameters.filter((param) => param['name'] === 'chanel_id')[0]['value'];
        let message: string = reaction.parameters.filter((param) => param['name'] === 'text')[0]['value'];

        ingredients.forEach((ingredient) => {
            message = message.replace(ingredient.key, ingredient.value);
        });
        new DiscordService().sendDiscordBotChanelMessage(channelId, message);
    }

    private spotifyPlay(reaction: Reaction, ingredients: Ingredient[], tokenData: TokenData): void {
        const contextUuid: string = reaction.parameters.filter((param) => param['name'] === 'context_uuid')[0]['value'];
        const userUuid: string = reaction.parameters.filter((param) => param['name'] === 'user_uuid')[0]['value'];
        const songUri: string = reaction.parameters.filter((param) => param['name'] === 'song_uri')[0]['value'];

        new ContextController().getContextByUuid(userUuid, Services.SPOTIFY, contextUuid, (context, error) => {
            if (error)
                return console.error(error);
            new SpotifyService().playTrack(userUuid, context, songUri, (data, spotifyError) => {
                if (spotifyError)
                    return console.error(spotifyError);
                console.log(data);
            });
        });
    }

    private spotifyPause(reaction: Reaction, ingredients: Ingredient[], tokenData: TokenData) {
        const contextUuid: string = reaction.parameters.filter((param) => param['name'] === 'context_uuid')[0]['value'];
        const userUuid: string = reaction.parameters.filter((param) => param['name'] === 'user_uuid')[0]['value'];

        new ContextController().getContextByUuid(userUuid, Services.SPOTIFY, contextUuid, (context, error) => {
            if (error)
                return console.error(error);
            new SpotifyService().pauseTrack(userUuid, context, (data, spotifyError) => {
                if (spotifyError)
                    return console.error(spotifyError);
                console.log(data);
            });
        });
    }

    private spotifyChangeVolume(reaction: Reaction, ingredients: Ingredient[], tokenData: TokenData) {
        const contextUuid: string = reaction.parameters.filter((param) => param['name'] === 'context_uuid')[0]['value'];
        const userUuid: string = reaction.parameters.filter((param) => param['name'] === 'user_uuid')[0]['value'];
        const volume: number = reaction.parameters.filter((param) => param['name'] === 'volume')[0]['value'];

        new ContextController().getContextByUuid(userUuid, Services.SPOTIFY, contextUuid, (context, error) => {
            if (error)
                return console.error(error);
            new SpotifyService().changeVolume(userUuid, context, volume,(data, spotifyError) => {
                if (spotifyError)
                    return console.error(spotifyError);
                console.log(data);
            });
        });
    }

}
