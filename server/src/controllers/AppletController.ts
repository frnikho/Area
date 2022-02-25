import {Action, ActionType, Applet, getActionTypeByStr, Ingredient, Reaction, ReactionType} from "../models/Applet";
import DBService from "../services/DBService";
import ServiceController from "./ServiceController";
import ReactionManager from "../managers/ReactionManager";

type successGet = (applet: Applet) => void;
type successGets = (applet: Applet[]) => void;
type successBool = (success: boolean) => void;

type error = (error: string) => void;


export default class AppletController {

    public callReactions(applet: Applet, ingredients: Ingredient[], end: (error?: string | undefined) => void) {
        const reactions = applet.reactions;
        reactions.forEach((reaction) => {
            const service = ReactionType[reaction.type].split('_')[0];
            new ServiceController().getTokenByKeyAndService(applet.user_uuid, service, reaction.token_key, (key) => {
                ReactionManager.get().callReaction(reaction, ingredients, key, () => {
                    end(undefined)
                }, (msg) => {
                    end(msg);
                });
            }, (err) => end(err));
        });
    }

    public registerApplets(applet: Applet, userUuid: string, success: successGet, errorCallback: error) {
        DBService.queryValues(`INSERT INTO applets (title, user_uuid, action, action_type, reactions, enable, action_key) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING uuid, title, user_uuid, action, action_type, reactions, updated_at, enable, created_at, action_key`, [applet.title, userUuid, JSON.stringify(applet.action), ActionType[applet.action_type], JSON.stringify(applet.reactions), '1', applet?.action_key], (result) => {
            result[0]['action'] = JSON.parse(result[0]['action']);
            result[0]['reactions'] = JSON.parse(result[0]['reactions']);
            return success(result[0]);
        }, errorCallback);
    }

    public getAppletsByTypeAndKey(type: string, key: string, success: successGets, errorCallback: error): void {
        DBService.query(`SELECT * FROM applets WHERE action_type = '${type}' AND action_key = '${key}'`, (result) => {
            if (result.length === 0)
                return success([]);
            return success(result.map((app) => {
                return this.parseApplet(app);
            }));
        }, errorCallback);
    }

    public getAppletsByActionType(type: string, success: successGets, errorCallback: error): void {
        DBService.query(`SELECT * FROM applets WHERE action_type = '${type}'`, (result) => {
            if (result.length === 0)
                return success([]);
            return success(result.map(app => this.parseApplet(app)));
        }, errorCallback);
    }

    public getAppletByUuid(uuid: string, success: successGet, errorCallback: error): void {
        DBService.query(`SELECT * FROM applets WHERE uuid = '${uuid}'`, (result) => {
            if (result.length === 0)
                return success(null);
            success(result.map(app => {
                const newApp = this.parseApplet(app)
                newApp.action_type = ActionType[newApp.action_type];
                newApp.reactions.forEach((reaction) => {
                    reaction.type = ReactionType[reaction.type];
                })
                return newApp;
            }));
        }, errorCallback);
    }

    public getAppletsByUserUuid(userUuid: string, success: successGets, errorCallback: error): void {
        DBService.query(`SELECT * FROM applets WHERE user_uuid = '${userUuid}'`, (result) => {
            if (result.length === 0)
                return success([]);
            success(result.map(app => {
                const newApp = this.parseApplet(app)
                newApp.action_type = ActionType[newApp.action_type];
                newApp.reactions.forEach((reaction) => {
                    reaction.type = ReactionType[reaction.type];
                })
                return newApp;
            }));
        }, errorCallback);
    }

    public getAppletByUserUuidAndUuid(appletUuid: string, userUuid: string, success: successGet, errorCallback: error): void {
        DBService.query(`SELECT * FROM applets WHERE uuid = '${appletUuid}' AND user_uuid = '${userUuid}'`, (result) => {
            if (result.length === 0)
                return success(null);
            success(this.parseApplet(result[0]));
        }, errorCallback);
    }

    public getAppletsByService(service: string, success: successGets, errorCallback: error): void {
        DBService.query(`SELECT * FROM applets WHERE action_type LIKE '${service}%'`, (result) => {
            success(result.map((app) => this.parseApplet(app)));
        }, errorCallback);
    }

    public parseApplet(app: any) {
        const action: Action = JSON.parse(app.action);
        const actionType: ActionType = getActionTypeByStr(app.action_type);
        const reactions: Reaction[] = JSON.parse(app.reactions);
        return {
            action_type: actionType,
            title: app.title,
            uuid: app.uuid,
            user_uuid: app.user_uuid,
            enable: app.enable,
            action,
            reactions: reactions.map((reaction) => {
                const type: ReactionType = ReactionType[reaction.type as unknown as string];
                return {
                    type,
                    token_key: reaction.token_key,
                    parameters: reaction.parameters
                } as Reaction
            }),
            action_key: app.action_key,
            created_at: app.created_at,
            updated_at: app.updated_at,
        } as Applet
    }

    public deleteApplet(uuid: string, success: successBool): void {
        DBService.query(`DELETE FROM applets WHERE uuid = '${uuid}'`, (response) => {
            success(true);
        }, (err) => {
            success(false);
        });
    }

    public isAppletsEnableByUuid(uuid: string, success: successBool): void {

    }

    public enableAppletByUuid(uuid: string, success: successBool): void {
        DBService.query(`UPDATE area.applets applet SET applet.enable = '1' WHERE applet.uuid = '${uuid}'`, (result) => {
            return success(true)
        }, (err) => {
            success(false);
        });
    }

    public disableAppletByUuid(uuid: string, success: successBool): void {
        DBService.query(`UPDATE area.applets applet SET applet.enable = '0' WHERE applet.uuid = '${uuid}'`, (result) => {
            return success(true)
        }, (err) => {
            success(false);
        });
    }

    public getGmailApplets(historyId: string, callback: (appletFound: Applet, error?: string) => void) {
        this.getAppletsByActionType(ActionType[ActionType.gmail_new_email], (applets) => {
            const appletFound = applets.find((applet) => {
                const value = applet.action.parameters.find((params) => params['name'] === 'history_id')['value'];
                if (value === historyId)
                    return true;
            })
            if (appletFound === undefined)
                return callback(undefined, "No applets found !");
            return callback(appletFound);
        }, (appletError) => {
            return callback(undefined, appletError);
        })
    }
}
