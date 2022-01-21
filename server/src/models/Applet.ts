export enum ActionType {
    GMAIL_RECEIVE_EMAIL,
    DISCORD_GET_CHANNEL_MESSAGE
}

export enum ReactionType {
    DISCORD_SEND_MESSAGE
}

export interface Action {
    type: string,
    parameters: object[]
}

export interface Reaction {
    type: ReactionType,
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
