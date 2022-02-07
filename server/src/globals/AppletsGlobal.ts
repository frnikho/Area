export const GmailAppletActionsAbout = [
    {
        name: "New email received",
        description: '',
        type: 'google_gmail_email_received',
        base_key: 'email',
        parameters: [
            {
                name: "token_key",
                type: 'string',
                required: true,

            }
        ],
        ingredients: [],
    }
]

export const SpotifyAppletActionsAbout = [
    {
        name: "Song Changed",
        description: '',
        type: 'spotify_song_changed',
        base_key: 'token_key',
        parameters: [
        ]
    }
]

export const IntraAppletActionsAbout = [
    {
        name: "New notifications",
        description: '',
        type: 'intra_new_notifications',
        base_key: undefined,
        parameters: [
            {
                name: 'login_link',
                type: 'string',
                required: true
            },
            {
                name: 'notification_type',
                type: 'string',
                required: false,
            },
        ],
        ingredients: ["notification_username", "notification_title"],
    },
    {
        name: "Credit updated",
        description: '',
        type: 'intra_credits_updated',
        base_key: undefined,
        parameters: []
    },
    {
        name: "Gpa updated",
        description: '',
        type: 'intra_gpa_updated',
        base_key: undefined,
        parameters: []
    }
]

export const DiscordAppletActionsAbout = [
    {
        name: "When a Discord chanel is created",
        description: '',
        base_key: 'guild_id',
        type: 'discord_channel_created',
        parameters: [
            {
                name: "guild_id",
                type: 'string',
                required: true,
            },
            {
                name: "channel_type",
                type: 'string',
                required: false,
            }
        ],
        ingredients: [],
    },
    {
        name: "When a Discord chanel is deleted",
        description: '',
        type: 'discord_channel_deleted',
        base_key: 'guild_id',
        parameters: [
            {
                name: "guild_id",
                type: 'string',
                required: true,
            },
            {
                name: "channel_type",
                type: 'string',
                required: false,
            }
        ],
        ingredients: []
    },
    {
        name: "When receive a private message",
        description: '',
        type: 'discord_private_message_received',
        parameters: [
            {
                name: 'user_id',
                type: 'string',
                required: true,
            }
        ],
        ingredients: [],
    },
    {
        name: "When receive a guild message",
        description: '',
        type: 'discord_guild_message_received',
        parameters: [
            {
                name: "guild_id",
                type: 'string',
                required: true,
            },
            {
                name: "user_id",
                type: 'string',
                required: false,
            }
        ],
        ingredients: ["sender_id", "sender_username"]
    },
    {
        name: "When a guild message is updated",
        description: '',
        type: 'discord_guild_message_updated',
        base_key: 'guid_id',
        parameters: [
            {
                name: "guild_id",
                type: 'string',
                required: true,
            },
        ],
        ingredients: []
    },
    {
        name: "When a guild message is deleted",
        description: '',
        type: 'discord_guild_message_deleted',
        base_key: 'guild_id',
        parameters: [
            {
                name: "guild_id",
                type: 'string',
                required: true,
            }
        ],
        ingredients: [],
    },
    {
        name: "Reaction added",
        description: '',
        type: 'discord_guild_message_reaction_add',
        base_key: 'message_id',
        parameters: [
            {
                name: "message_id",
                type: 'string',
                required: true,
            }
        ],
        ingredients: []
    },
    {
        name: "Reaction removed",
        description: '',
        type: 'discord_guild_message_reaction_removed',
        base_key: 'message_id',
        parameters: [
            {
                name: "message_id",
                type: 'string',
                required: true,
            }
        ],
        ingredients: [],
    },
    {
        name: "Member get banned",
        description: '',
        type: 'discord_guild_member_banned',
        base_key: 'guild_id',
        parameters: [
            {
                name: "guild_id",
                type: 'string',
                required: true,
            }
        ],
        ingredients: []
    },
    {
        name: "Member get unbanned",
        description: '',
        type: 'discord_guild_member_unbanned',
        base_key: 'guild_id',
        parameters: [
            {
                name: "guild_id",
                type: 'string',
                required: true,
            }
        ],
        ingredients: []
    },
    {
        name: "Server updated",
        description: '',
        type: 'discord_guild_update',
        base_key: 'guild_id',
        parameters: [
            {
                name: "guild_id",
                type: 'string',
                required: true,
            }
        ],
        ingredients: []
    }
]

export const GithubAppletActionsAbout = [
    {
        name: "From new push in a repository",
        description: '',
        type: 'github_repository_push',
        base_key: 'repository_name',
        parameters: [
            {
                name: "repository_name",
                type: 'string',
                required: true
            }
        ],
        ingredients: ["sender_login", "sender_email", "repo_name"]
    },
    {
        name: 'New repository created',
        type: 'github_repository_created',
        description: '',
        base_key: 'owner_login',
        parameters: [
            {
                name: "owner_login",
                type: 'string',
                required: true,
            }
        ],
        ingredients: ["repository_name", "repository_is_private", "repository_owner_login", "repository_url", "repository_git_url"]
    },
    {
        name: 'Repository Deleted',
        type: 'github_repository_deleted',
        description: '',
        base_key: 'owner_login',
        parameters: [
            {
                name: 'owner_login',
                type: 'string',
                required: true
            }
        ],
        ingredients: []
    },
    {
        name: 'Release created !',
        type: 'github_release_created',
        description: '',
        base_key: 'repository_name',
        parameters: [
            {
                name: 'repository_name',
                type: 'string',
                required: true
            }
        ],
        ingredients: [],
    },
    {
        name: "New Issue open",
        type: 'github_issue_opened',
        description: '',
        base_key: 'repository_name',
        parameters: [
            {
                name: 'repository_name',
                type: 'string',
                required: true
            }
        ],
        ingredients: [],
    },
    {
        name: "Issue closed",
        type: 'github_issue_closed',
        description: '',
        base_key: 'repository_name',
        parameters: [
            {
                name: 'repository_name',
                type: 'string',
                required: true
            }
        ],
        ingredients: [],
    },
    {
        name: "Issue reopened",
        type: 'github_issue_reopened',
        description: '',
        base_key: 'repository_name',
        parameters: [
            {
                name: 'repository_name',
                type: 'string',
                required: true
            }
        ],
        ingredients: [],
    }]

export const DiscordAppletReactionsAbout = [
        {
            name: 'Send chanel message',
            description: '',
            type: 'discord_send_chanel_message',
            parameters: [
                {
                    name: 'chanel_id',
                    type: 'string',
                    required: true
                },
                {
                    name: 'text',
                    type: 'string',
                    required: true,
                }
            ]
        }
    ]

export const SlackAppletReactionsAbout = [
        {
            name: 'Send chanel message',
            description: '',
            type: 'slack_send_chanel_message',
            parameters: [
                {
                    name: 'chanel_id',
                    type: 'string',
                    required: true
                },
                {
                    name: 'text',
                    type: 'string',
                    required: true,
                }
            ]
        }
    ]

export const GithubAppletReactionsAbout = [

    ]

export const AppAbout = {
    client: {
        host: '10.blabla'
    },
    server: {
        current_time: 165161,
        services: [{
            name: "Github",
            actions: GithubAppletActionsAbout,
            reactions: GithubAppletReactionsAbout
        }, {
            name: "Discord",
            actions: DiscordAppletActionsAbout,
            reactions: DiscordAppletReactionsAbout,
        }, {
            name: "Slack",
            actions: [],
            reactions: SlackAppletReactionsAbout,
        }, {
            name: "Intra Epitech",
            actions: IntraAppletActionsAbout,
            reactions: [],
        }, {
            name: "Spotify",
            actions: SpotifyAppletActionsAbout,
            reactions: [],
        }, {
            name: "Gmail",
            actions: GmailAppletActionsAbout,
            reactions: []
        }]
    }
}
