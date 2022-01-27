import {ActionType, Ingredient} from "../models/Applet";

const githubPushData = (data) : Ingredient[] => [{key: "{{github_sender_login}}", value: `${data.sender.login}`}]
const githubCreatedData = (data) : Ingredient[] => [];
const discordChanelMessageReceived = (data): Ingredient[] => [{key: "{{sender_id}}", value: `${data.author.id}`}, {key: "{{sender_username}}", value: `${data.author.username}`}];

type dataFunc = (data) => Ingredient[];
type hookFunc = {type: ActionType, func: dataFunc}

const hooksType: hookFunc[] = [
    {
        type: ActionType.github_repository_push,
        func: githubPushData
    },
    {
        type: ActionType.github_repository_created,
        func: githubCreatedData
    },
    {
        type: ActionType.discord_guild_message_received,
        func: discordChanelMessageReceived
    }]

/**
 * Transform raw data to ingredients
 * @param data data must be webhooks payload
 * @param type
 */
export const ingredientsHook = (data, type: ActionType): Ingredient[] => {
    let ingredients: Ingredient[] = [];
    hooksType.map((hook) => {
        if (hook.type === type)
            hook.func(data).map((ingredient) => ingredients.push(ingredient));
    });
    return ingredients;
}
