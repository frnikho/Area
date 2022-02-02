import {Ingredient, Reaction, ReactionType} from "../models/Applet";
import {TokenData} from "../controllers/ServiceController";
import DiscordBot from "../bots/DiscordBot";
import DiscordService from "../services/external/DiscordService";
import Logger from "../utils/Logger";

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
    private readonly reactions: reactionHook[] = [{type: ReactionType.discord_send_chanel_message, func: this.discordSendChanelMessage}]

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

    private discordSendChanelMessage(reaction: Reaction, ingredients: Ingredient[], tokenData: TokenData): void {
        const channelId: string = reaction.parameters.filter((param) => param['name'] === 'chanel_id')[0]['value'];
        let message: string = reaction.parameters.filter((param) => param['name'] === 'text')[0]['value'];

        ingredients.forEach((ingredient) => {
            message = message.replace(ingredient.key, ingredient.value);
        });

        new DiscordService().sendDiscordBotChanelMessage(channelId, message);
        console.log("discord send message ");
    }

}
