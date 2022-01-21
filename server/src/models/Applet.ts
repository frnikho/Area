export enum ActionType {
    github_repository_push,
    GMAIL_RECEIVE_EMAIL,
    DISCORD_GET_CHANNEL_MESSAGE
}

export enum ReactionType {
    discord_send_message,
    discord_create_channel
}

export interface Action {
    parameters: object[]
}

export interface Reaction {
    type: ReactionType,
    tokenKey: string,
    parameters: object[],
}

export interface Applet {
    uuid: string,
    user_uuid: string,
    action: Action,
    action_type: ActionType,
    reactions: Reaction[],
    created_at: Date,
    updated_at: Date,
}
