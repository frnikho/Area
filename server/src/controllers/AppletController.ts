import {ActionType, Applet, Ingredient, ReactionType} from "../models/Applet";
import DBService from "../services/DBService";
import App from "../app";
import * as randomstring from "randomstring";
import ServiceController from "./ServiceController";

type successGet = (applet: Applet) => void;
type successGets = (applet: Applet[]) => void;
type successBool = (success: boolean) => void;

type error = (error: string) => void;


export default class AppletController {

    public callReactions(applet: Applet, ingredients: Ingredient[], end: error) {
        let reactions = JSON.parse(<any>applet.reactions);
        reactions.forEach((reaction) => {
            new ServiceController().getTokenByKeyAndService(applet.user_uuid, ReactionType[reaction.type], reaction.tokenKey, (key) => {
                if (key === undefined)
                    return;
                console.log(key);
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
            return success(result.map((app) => app as Applet));
        }, error);
    }

    public getAppletsByActionType(type: string, success: successGets, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE action_type = '${type}'`, (result) => {
            if (result.length === 0)
                return success([]);
            return success(result.map(app => app as Applet));
        }, error);
    }

    public getAppletByUuid(uuid: string, success: successGet, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE uuid = '${uuid}'`, (result) => {
            if (result.length === 0)
                return success(null);
            success(result.map(app => app as Applet));
        }, err => error(err));
    }

    public getAppletsByUserUuid(userUuid: string, success: successGets, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE user_uuid = '${userUuid}'`, (result) => {
            if (result.length === 0)
                return success([]);
            success(result.map(app => app as Applet));
        }, err => error(err));
    }

    public getAppletByUserUuidAndUuid(appletUuid: string, userUuid: string, success: successGet, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE uuid = '${appletUuid}' AND user_uuid = '${userUuid}'`, (result) => {
            if (result.length === 0)
                return success(null);
            success(result[0]);
        }, err => error(err));
    }

    public isAppletsEnableByUuid(uuid: string, success: successBool): void {

    }

    public enableAppletByUuid(uuid: string, success: successBool): void {

    }

    public disableAppletByUuid(uuid: string, success: successBool): void {

    }

}
