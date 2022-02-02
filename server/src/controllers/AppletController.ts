import {Action, ActionType, Applet, getActionTypeByStr, Ingredient, Reaction, ReactionType} from "../models/Applet";
import DBService from "../services/DBService";
import App from "../app";
import * as randomstring from "randomstring";
import ServiceController, {TokenData} from "./ServiceController";
import ReactionManager from "../managers/ReactionManager";

type successGet = (applet: Applet) => void;
type successGets = (applet: Applet[]) => void;
type successBool = (success: boolean) => void;

type error = (error: string) => void;


export default class AppletController {

    public callReactions(applet: Applet, ingredients: Ingredient[], end: error) {
        let reactions = applet.reactions;
        reactions.forEach((reaction) => {
            let service = ReactionType[reaction.type].split('_')[0];
            new ServiceController().getTokenByKeyAndService(applet.user_uuid, service, reaction.token_key, (key) => {
                ReactionManager.get().callReaction(reaction, ingredients, key, () => {
                    console.log("All reactions called !");
                }, () => {
                    console.log("An error occurred when call a reaction !");
                });
            }, (abc) => console.log("abc"));
        });
    }

    public registerApplets(applet: Applet, userUuid: string, success: successGet, error: error) {
        DBService.queryValues(`INSERT INTO applets (user_uuid, action, action_type, reactions, enable, action_key) VALUES (?, ?, ?, ?, ?, ?) RETURNING uuid, user_uuid, action, action_type, reactions, updated_at, enable, created_at, action_key`, [userUuid, JSON.stringify(applet.action), ActionType[applet.action_type], JSON.stringify(applet.reactions), '1', applet?.action_key], (result) => {
            result[0]['action'] = JSON.parse(result[0]['action']);
            result[0]['reactions'] = JSON.parse(result[0]['reactions']);
            return success(result[0]);
        }, error);
    }

    public getAppletsByTypeAndKey(type: string, key: string, success: successGets, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE action_type = '${type}' AND action_key = '${key}'`, (result) => {
            if (result.length === 0)
                return success([]);
            return success(result.map((app) => {
                return this.parseApplet(app);
            }));
        }, error);
    }

    public getAppletsByActionType(type: string, success: successGets, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE action_type = '${type}'`, (result) => {
            if (result.length === 0)
                return success([]);
            return success(result.map(app => this.parseApplet(app)));
        }, error);
    }

    public getAppletByUuid(uuid: string, success: successGet, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE uuid = '${uuid}'`, (result) => {
            if (result.length === 0)
                return success(null);
            success(result.map(app => this.parseApplet(app)));
        }, err => error(err));
    }

    public getAppletsByUserUuid(userUuid: string, success: successGets, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE user_uuid = '${userUuid}'`, (result) => {
            if (result.length === 0)
                return success([]);
            success(result.map(app => this.parseApplet(app)));
        }, err => error(err));
    }

    public getAppletByUserUuidAndUuid(appletUuid: string, userUuid: string, success: successGet, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE uuid = '${appletUuid}' AND user_uuid = '${userUuid}'`, (result) => {
            if (result.length === 0)
                return success(null);
            success(this.parseApplet(result[0]));
        }, err => error(err));
    }

    public getAppletsByService(service: string, success: successGets, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE action_type LIKE '${service}%'`, (result) => {
            success(result.map((app) => this.parseApplet(app)));
        }, error);
    }

    public parseApplet(app: any) {
        let action: Action = JSON.parse(app.action);
        let action_type: ActionType = getActionTypeByStr(<string>app.action_type);
        let reactions: Reaction[] = JSON.parse(app.reactions);
        return {
            action_type: action_type,
            uuid: app.uuid,
            user_uuid: app.user_uuid,
            action: action,
            reactions: reactions.map((reaction) => {
                let type: ReactionType = ReactionType[<string><unknown>reaction.type];
                return {
                    type: type,
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

    }

    public disableAppletByUuid(uuid: string, success: successBool): void {

    }

}
