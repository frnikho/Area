export const GmailAppletActionsAbout = [
    {
        name: "New email received",
        description: '',
        type: 'google_gmail_email_received',
        base_key: 'email',
        if: "new email is received",
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
        if: "No information for the moment",
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
        if: "I received a new notifications",
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
        if: "my credits are updated",
        parameters: []
    },
    {
        name: "Gpa updated",
        description: '',
        type: 'intra_gpa_updated',
        base_key: undefined,
        if: "my GPA is updated",
        parameters: []
    }
]

export const DiscordAppletActionsAbout = [
    {
        name: "Discord chanel is created",
        description: 'When a channel is created in a specific discord guild',
        base_key: 'guild_id',
        type: 'discord_channel_created',
        if: "a new Discord channel is created",
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
        name: "Discord chanel is deleted",
        description: 'When a channel is deleted in a specific discord guild',
        type: 'discord_channel_deleted',
        base_key: 'guild_id',
        if: "a Discord channel is deleted",
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
        name: "Receive a private message",
        description: 'When a specific user send a private message to the bot',
        type: 'discord_private_message_received',
        if: "I receive a Discord private message",
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
        name: "Receive a guild message",
        description: 'When a specific user send a message into a discord guild',
        type: 'discord_guild_message_received',
        if: "I receive a Discord guild message",
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
        name: "Message is updated",
        description: 'When a message guild is updated',
        type: 'discord_guild_message_updated',
        base_key: 'guid_id',
        if: "a Discord guild message is updated",
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
        name: "Message is deleted",
        description: 'When a guild message is deleted',
        type: 'discord_guild_message_deleted',
        base_key: 'guild_id',
        if: "a Discord guild message is deleted",
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
        description: 'When a reaction is added to a specific guild message',
        type: 'discord_guild_message_reaction_add',
        base_key: 'message_id',
        if: "a Discord guild message have a reaction",
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
        description: 'When a reaction is removed to a specific guild message',
        type: 'discord_guild_message_reaction_removed',
        base_key: 'message_id',
        if: "a reaction of a Discord guild message is removed",
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
        description: 'When a member get banned from a discord guild',
        type: 'discord_guild_member_banned',
        base_key: 'guild_id',
        if: "a Discord member is banned",
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
        description: 'When a member get unbanned from a discord guild',
        type: 'discord_guild_member_unbanned',
        base_key: 'guild_id',
        if: "a Discord member is unbanned",
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
        description: 'When a discord server is updated (title, grades, information....)',
        type: 'discord_guild_update',
        base_key: 'guild_id',
        if: "Discord server params are updated",
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
        name: "New push in a repository",
        description: 'When a new content is push from a specific repository',
        type: 'github_repository_push',
        base_key: 'repository_name',
        if: "a Github repository have a new push",
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
        description: 'When a new repository is created',
        base_key: 'owner_login',
        if: "a Github repository is created",
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
        if: "a Github repository is deleted",
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
        if: "a Github release is created",
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
        if: "a Github issue is opened",
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
        if: "a Github issue is closed",
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
        if: "a Github issue is reopened",
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
            name: 'Post chanel message',
            description: 'Post a message in a server channel',
            type: 'discord_send_chanel_message',
            then: "post in Discord channel a message",
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
            name: 'Post chanel message',
            description: 'Post a message in a channel',
            type: 'slack_send_chanel_message',
            then: "post in Slack channel a message",
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
        },
        {
            name: 'Post a schedule chanel message',
            description: 'Post scheduled message in Slack channel',
            type: 'slack_send_schedule_chanel_message',
            then: "post in Slack channel a scheduled message",
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
                },
                {
                    name: 'scheduling',
                    type: 'string',
                    required: true,
                }
            ]
        }
    ]

export const GithubAppletReactionsAbout = [

    ]


export const TwitterAppletReactionsAbout = [
    {
        name: 'Tweet',
        description: 'Post a Tweet',
        type: 'twitter_post_tweet',
        then: "post Tweet",
        parameters: [
            {
                name: 'text',
                type: 'string',
                required: true,
            }
        ]
    }
]

export const AppAbout = {
    client: {
        host: '10.blabla'
    },
    server: {
        current_time: 165161,
        services: [{
            name: "Github",
            type: 'github',
            color: "#95A5A6",
            icon: "icons/github.png",
            actions: GithubAppletActionsAbout,
            reactions: GithubAppletReactionsAbout
        }, {
            name: "Discord",
            type: 'discord',
            icon: "icons/discord.png",
            color: "#34495E",
            actions: DiscordAppletActionsAbout,
            reactions: DiscordAppletReactionsAbout,
        }, {
            name: "Slack",
            type: 'slack',
            icon: "icons/slack.png",
            color: "#8E44AD",
            actions: [],
            reactions: SlackAppletReactionsAbout,
        }, {
            name: "Twitter",
            type: 'twitter',
            color: "#1DA1F2",
            actions: [],
            icon: "icons/twitter.png",
            reactions: TwitterAppletReactionsAbout,
        }, {
            name: "Intra Epitech",
            type: 'epitech_intra',
            color: "#2980B9",
            icon: "icons/epitech.png",
            actions: IntraAppletActionsAbout,
            reactions: [],
        }, {
            name: "Spotify",
            type: 'spotify',
            color: "#27AE60",
            icon: "icons/spotify.png",
            actions: SpotifyAppletActionsAbout,
            reactions: [],
        }, {
            name: "Gmail",
            type: 'google',
            icon: "icons/gmail.png",
            color: "#C0392B",
            actions: GmailAppletActionsAbout,
            reactions: []
        }]
    }
}
