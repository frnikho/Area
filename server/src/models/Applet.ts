export enum ActionType {
    github_repository_push,
    github_repository_created,
    discord_channel_created,
    discord_private_message_received,
    discord_guild_message_received,
    GMAIL_RECEIVE_EMAIL,
    DISCORD_GET_CHANNEL_MESSAGE
}

const githubPushData: hookFunc[] = [{type: ActionType.github_repository_push, serviceName: 'github'}]

type hookFunc = {type: ActionType, serviceName: string}

export const getReactionService = (type: ReactionType) => {

}

export enum ReactionType {
    discord_send_chanel_message,
    discord_create_channel
}

export interface Ingredient {
    key: string,
    value: string
}

export interface Action {
    parameters: object[]
}

export interface Reaction {
    type: ReactionType,
    token_key: string,
    parameters: object[],
}

export interface Applet {
    uuid?: string,
    user_uuid: string,
    action: Action,
    action_key: string,
    action_type: ActionType,
    reactions: Reaction[],
    created_at?: Date,
    updated_at?: Date,
}
