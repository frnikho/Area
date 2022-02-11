export enum ActionType {
    github_repository_push,
    github_repository_created,
    github_repository_deleted,
    github_issue_opened,
    github_issue_closed,
    github_issue_reopened,
    github_release_created,

    discord_channel_created,
    discord_channel_deleted,
    discord_private_message_received,
    discord_guild_message_received,
    discord_guild_message_updated,
    discord_guild_message_deleted,
    discord_guild_message_reaction_add,
    discord_guild_message_reaction_removed,
    discord_guild_member_banned,
    discord_guild_member_unbanned,
    discord_guild_update,

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
    type: ReactionType | string,
    token_key: string,
    parameters: object[],
}

export interface Applet {
    uuid?: string,
    user_uuid: string,
    action: Action,
    action_key: string,
    action_type: ActionType | string,
    reactions: Reaction[],
    created_at?: Date,
    updated_at?: Date,
}
