import {ActionType, Ingredient} from "../models/Applet";

const JSSoup = require('jssoup').default;

const gmailNewEmail = (data): Ingredient[] => [{key: "{{email_id}}", value: data['id']}, {key: "{{email_sender}}", value: data['from']}, {key: "{{email_receiver}}", value: data['to']}, {key: "{{email_date}}", value: data['date']}, {key: "{{email_content}}", value: data['body']}];

const spotifySongChangedData = (data): Ingredient[] => [{key: "{{track_name}}", value: data.name}, {key: "{{track_uri}}", value: data.uri}, {key: "{{track_url}}", value: data.external_urls.spotify}]

const githubPushData = (data) : Ingredient[] => [{key: "{{sender_login}}", value: `${data.sender.login}`}, {key: "{{sender_email}}", value: data.sender.email}, {key: "{{repo_name}}", value: data.repository.name}]
const githubReleaseData = (data): Ingredient[] => [
        {
            key: "{{release_url}}",
            value: `${data.release.url}`
        },
        {
            key: "{{release_tag_name}}",
            value: `${data.release.tag_name}`
        },
        {
            key: "{{release_name}}",
            value: `${data.release.name}`
        },
        {
            key: "{{release_body}}",
            value: `${data.release.body}`
        }
    ].concat(githubRepositoryData(data))
const githubIssueData = (data): Ingredient[] => [
        {
            key: "{{issue_title}}",
            value: `${data.issue.title}`
        },
        {
            key: "{{issue_url}}",
            value: `${data.issue.url}`
        },
        {
            key: "{{issue_state}}",
            value: `${data.issue.state}`
        },
        {
            key: "{{issue_locked}}",
            value: `${data.issue.locked}`
        },
        {
            key: "{{issue_body}}",
            value: `${data.issue.body}`
        },
        {
            key: "{{issue_user_login}}",
            value: `${data.issue.user.login}`
        },
        {
            key: "{{issue_user_url}}",
            value: `${data.issue.user.url}`
        }
    ].concat(githubRepositoryData(data))
const githubRepositoryData = (data) : Ingredient[] => [
    {
        key: "{{repository_name}}",
        value: `${data.repository.name}`
    },
    {
        key: "{{repository_is_private}}",
        value: `${data.repository.private}`
    },
    {
        key: "{{repository_owner_login}}",
        value: `${data.repository.owner.login}`
    },
    {
        key: "{{repository_url}}",
        value: `${data.repository.url}`,
    },
    {
        key: "{{repository_git_url}}",
        value: `${data.repository.git_url}`
    }
];
const discordChanelMessageReceived = (data): Ingredient[] => [{key: "{{sender_id}}", value: `${data.author.id}`}, {key: "{{sender_username}}", value: `${data.author.username}`}];
const intraNewNotification = (data): Ingredient[] => [{key: "{{notification_username}}", value: data.user.title}, {key: "{{notification_title}}", value: cleanHtml(data.title)}]

const discordChannelData = (data): Ingredient[] => [
    {
        key: "{{channel_type}}",
        value: `${data.type}`
    },
    {
        key: "{{channel_name}}",
        value: `${data.name}`
    },
    {
        key: "{{channel_id}}",
        value: `${data.id}`
    }
];

type dataFunc = (data) => Ingredient[];
type hookFunc = {type: ActionType, func: dataFunc}

const hooksType: hookFunc[] = [
    {type: ActionType.github_repository_push, func: githubPushData},
    {type: ActionType.github_repository_created, func: githubRepositoryData},
    {type: ActionType.github_repository_deleted, func: githubRepositoryData},
    {type: ActionType.github_release_created, func: githubReleaseData},
    {type: ActionType.github_issue_opened, func: githubIssueData},
    {type: ActionType.github_issue_closed, func: githubIssueData},
    {type: ActionType.github_issue_reopened, func: githubIssueData},
    {type: ActionType.discord_guild_message_received, func: discordChanelMessageReceived},
    {type: ActionType.intra_new_notifications, func: intraNewNotification},
    {type: ActionType.discord_channel_created, func: discordChannelData},
    {type: ActionType.discord_channel_deleted, func: discordChannelData},
    {type: ActionType.spotify_song_changed, func: spotifySongChangedData},
    {type: ActionType.gmail_new_email, func: gmailNewEmail}
]
/**
 * Transform raw data to ingredients
 * @param data data must be webhooks payload
 * @param type
 */
export const ingredientsHook = (data, type: ActionType): Ingredient[] => {
    const ingredients: Ingredient[] = [];
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
