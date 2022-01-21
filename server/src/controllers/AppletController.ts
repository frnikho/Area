import {ActionType, Applet} from "../models/Applet";
import DBService from "../services/DBService";
import App from "../app";
import * as randomstring from "randomstring";

type successGet = (applet: Applet) => void;
type successGets = (applet: Applet[]) => void;
type successBool = (success: boolean) => void;

type error = (error: string) => void;

export default class AppletController {

    public registerApplets(applet: Applet, userUuid: string, success: successGet, error: error) {
        let action_type = applet.action_type;

        DBService.queryValues(`INSERT INTO applets (user_uuid, action, action_type, reactions, enable) VALUES (?, ?, ?, ?, ?)`, [userUuid, JSON.stringify(applet.action), ActionType[applet.action_type], JSON.stringify(applet.reactions), '1'], (result) => {

        });
    }

    public getAppletsByActionTypeAndUserUuid(type: string, uuid: string, success: successGets, error: error): void {
        DBService.query(`SELECT * FROM applets WHERE action_type = '${type}' AND user_uuid = '${uuid}'`, (result) => {
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
