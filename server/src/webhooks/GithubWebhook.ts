import {Webhooks} from "@octokit/webhooks";
import AppletController from "../controllers/AppletController";
import {ingredientsHook} from "../utils/Ingredients";
import {ActionType} from "../models/Applet";
import Logger from "../utils/Logger";

const EventSource = require('eventsource');

export default class GithubWebhook {

    private readonly webhooks: Webhooks;

    constructor() {
        this.webhooks = new Webhooks({
            secret: process.env.GITHUB_WEBHOOK_SECRET
        })
        Logger.i("GitHub", "Webhook event initialize");
        this.webhooks.on('push', this.onPush);
        this.webhooks.on('repository.created', this.onRepositoryCreated);
        this.webhooks.on('repository.deleted', this.onRepositoryDeleted);
        this.webhooks.on('release.created', this.onReleaseCreated);
        this.webhooks.on('issues.opened', this.onIssueOpened);
        this.webhooks.on('issues.closed', this.onIssueClosed);
        this.webhooks.on('issues.reopened', this.onIssueReopened);
    }

    private onPush(data): void {
        console.log(data);
        Logger.i("Github", "On push");
        const repoName: string = data.payload.repository.full_name;
        const appletController = new AppletController();
        appletController.getAppletsByTypeAndKey('github_repository_push', repoName, (applets) => {
            applets.forEach((applet) => {
                const parameters: object[] = applet.action.parameters;
                const repository = parameters.filter((param) => param['name'] === 'repository_name')[0];
                if (repository['value'] === repoName) {
                    appletController.callReactions(applet, ingredientsHook(data.payload, ActionType.github_repository_push),(error) => {
                        if (error)
                            Logger.e("Github", error);
                    });
                }
            });
        }, (err) => {
            Logger.e("Github", err);
        });
    }

    private onIssueReopened(data): void {
        Logger.i("Github", "On issue reopened");
        const repositoryName: string = data.payload.repository.full_name;
        const appletController = new AppletController();
        appletController.getAppletsByTypeAndKey('github_issue_reopened', repositoryName, (applets) => {
            applets.forEach((applet) => {
                const parameters: object[] = applet.action.parameters;
                const repository = parameters.filter((param) => param['name'] === 'repository_name')[0];
                if (repository['value'] === repositoryName) {
                    appletController.callReactions(applet, ingredientsHook(data.payload, ActionType.github_issue_reopened),(error) => {
                        if (error)
                            Logger.e("Github", error);
                    });
                }
            });
        }, (err) => {
            Logger.e("Github", err);
        });
    }

    private onIssueClosed(data): void {
        Logger.i("Github", "On issue closed");
        const repositoryName: string = data.payload.repository.full_name;
        const appletController = new AppletController();
        appletController.getAppletsByTypeAndKey('github_issue_closed', repositoryName, (applets) => {
            applets.forEach((applet) => {
                const parameters: object[] = applet.action.parameters;
                const repository = parameters.filter((param) => param['name'] === 'repository_name')[0];
                if (repository['value'] === repositoryName) {
                    appletController.callReactions(applet, ingredientsHook(data.payload, ActionType.github_issue_closed),(error) => {
                        if (error)
                            Logger.e("Github", error);
                    });
                }
            });
        }, (err) => {
            Logger.e("Github", err);
        });
    }

    private onIssueOpened(data): void {
        Logger.i("Github", "On issue opened");
        const repositoryName: string = data.payload.repository.full_name;
        const appletController = new AppletController();
        appletController.getAppletsByTypeAndKey('github_issue_opened', repositoryName, (applets) => {
            applets.forEach((applet) => {
                const parameters: object[] = applet.action.parameters;
                const repository = parameters.filter((param) => param['name'] === 'repository_name')[0];
                if (repository['value'] === repositoryName) {
                    appletController.callReactions(applet, ingredientsHook(data.payload, ActionType.github_issue_opened),(error) => {
                        if (error)
                            Logger.e("Github", error);
                    });
                }
            });
        }, (err) => {
            Logger.e("Github", err);
        });
    }

    private onReleaseCreated(data): void {
        Logger.i("Github", "On release created");
        const repositoryName: string = data.payload.repository.full_name;
        const appletController = new AppletController();
        appletController.getAppletsByTypeAndKey('github_release_created', repositoryName, (applets) => {
            applets.forEach((applet) => {
                const parameters: object[] = applet.action.parameters;
                const repository = parameters.filter((param) => param['name'] === 'repository_name')[0];
                if (repository['value'] === repositoryName) {
                    appletController.callReactions(applet, ingredientsHook(data.payload, ActionType.github_release_created),(error) => {
                        if (error)
                            Logger.e("Github", error);
                    });
                }
            });
        }, (err) => {
            Logger.e("Github", err);
        });
    }

    private onRepositoryDeleted(data): void {
        Logger.i("Github", "on repository deleted called !");
        const ownerLogin: string = data.payload.repository.owner.login;
        const appletController = new AppletController();
        appletController.getAppletsByTypeAndKey('github_repository_deleted', ownerLogin, (applets) => {
            applets.forEach((applet) => {
                const parameters: object[] = applet.action.parameters;
                const repository = parameters.filter((param) => param['name'] === 'owner_login')[0];
                if (repository['value'] === ownerLogin) {
                    appletController.callReactions(applet, ingredientsHook(data.payload, ActionType.github_repository_deleted),(error) => {
                        if (error)
                            Logger.e("Github", error);
                    });
                }
            });
        }, (err) => {
            Logger.e("Github", err);
        });
    }

    private onRepositoryCreated(data): void {
        Logger.i("Github", "on repository created called !");
        const ownerLogin: string = data.payload.repository.owner.login;
        const appletController = new AppletController();
        appletController.getAppletsByTypeAndKey('github_repository_created', ownerLogin, (applets) => {
            applets.forEach((applet) => {
                const parameters: object[] = applet.action.parameters;
                const repository = parameters.filter((param) => param['name'] === 'owner_login')[0];
                if (repository['value'] === ownerLogin) {
                    appletController.callReactions(applet, ingredientsHook(data.payload, ActionType.github_repository_created),(error) => {
                        if (error)
                            Logger.e("Github", error);
                    });
                }
            });
        }, (err) => {
            Logger.e("Github", err);
        });

    }

    public getWebhooks(): Webhooks {
        return this.webhooks;
    }

    public init(): void {
        const webhookProxyUrl = process.env.GITHUB_WEBHOOK_URL;

        const source = new EventSource(webhookProxyUrl);
        source.onmessage = (event) => {
            const webhookEvent = JSON.parse(event.data);
            this.webhooks.verifyAndReceive({
                id: webhookEvent["x-request-id"],
                name: webhookEvent["x-github-event"],
                signature: webhookEvent["x-hub-signature"],
                payload: webhookEvent.body,
            }).catch((err) => console.error("Github Webhook", err));
        }
    }
}
