import {ActionType, Ingredient} from "../models/Applet";

const JSSoup = require('jssoup').default;

const githubPushData = (data) : Ingredient[] => [{key: "{{sender_login}}", value: `${data.sender.login}`}, {key: "{{sender_email}}", value: data.sender.email}, {key: "{{repo_name}}", value: data.repository.name}]
const githubCreatedData = (data) : Ingredient[] => [];
const discordChanelMessageReceived = (data): Ingredient[] => [{key: "{{sender_id}}", value: `${data.author.id}`}, {key: "{{sender_username}}", value: `${data.author.username}`}];
const intraNewNotification = (data): Ingredient[] => [{key: "{{notification_username}}", value: data.user.title}, {key: "{{notification_title}}", value: cleanHtml(data.title)}]

type dataFunc = (data) => Ingredient[];
type hookFunc = {type: ActionType, func: dataFunc}

const hooksType: hookFunc[] = [{type: ActionType.github_repository_push, func: githubPushData},
    {type: ActionType.github_repository_created, func: githubCreatedData},
    {type: ActionType.discord_guild_message_received, func: discordChanelMessageReceived},
    {type: ActionType.intra_new_notifications, func: intraNewNotification}]

/**
 * Transform raw data to ingredients
 * @param data data must be webhooks payload
 * @param type
 */
export const ingredientsHook = (data, type: ActionType): Ingredient[] => {
    let ingredients: Ingredient[] = [];
    try {
        hooksType.map((hook) => {
            if (hook.type === type)
                hook.func(data).map((ingredient) => ingredients.push(ingredient));
        });
    } catch (err) {
        console.log("Ingredients error !");
        console.log(err);
    }

    return ingredients;
}

const cleanHtml = (data) => new JSSoup(data).getText();
