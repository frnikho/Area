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
        name: "When a Discord chanel created",
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
        ]
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
        ]
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
        ]
    }
]

export const GithubAppletActionsAbout = [
        {
            name: "From new push in a repository",
            description: '',
            type: 'github_repository_push',
            parameters: [
                {
                    name: "repository_name",
                    type: 'string',
                    required: true
                }
            ]
        },
        {
            name: 'New repository created',
            type: 'github_repository_created',
            description: '',
            parameters: [
                {
                    name: "application_id",
                    type: 'string',
                    required: true,
                }
            ]
        }
    ]

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
        }]
    }
}
