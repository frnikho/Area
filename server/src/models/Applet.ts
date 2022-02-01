export enum ActionType {
    github_repository_push,
    github_repository_created,
    github_repository_deleted,
    github_issue_opened,
    github_issue_closed,
    github_issue_reopened,
    github_release_created,

    discord_channel_created,
    discord_private_message_received,
    discord_guild_message_received,

    intra_new_notifications,
    intra_gpa_updated,
    intra_credits_updated,

    spotify_song_changed,
}

export const getActionTypeByStr = (name: string): ActionType => ActionType[name];

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
