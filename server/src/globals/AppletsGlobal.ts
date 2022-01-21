export const GithubAppletActionsAbout =
    [
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
            parameters: [
                {
                    name: "application_id",
                    type: 'string',
                    required: true,
                }
            ]
        }
    ]

export const GithubAppletReactionsAbout =
    [
        {
            name: 'Discord send channel message',
            description: 'Send a message into a discord channel',
            type: 'discord_send_message',
            parameters: [
                {
                    name: 'text',
                    type: 'string',
                    required: true,
                },
            ]
        },
        {
            name: 'Discord create a channel',
            description: 'Create a channel',
            type: 'discord_create_channel',
            parameters: [
                {
                    name: 'title',
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
            actions: GithubAppletActionsAbout,
            reactions: GithubAppletReactionsAbout
        }]
    }
}
