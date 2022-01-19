import {Applet} from "../models/Applet";
import DBService from "../services/DBService";

type successGet = (applet: Applet) => void;
type successGets = (applet: Applet[]) => void;
type successBool = (success: boolean) => void;

type error = (error: string) => void;

export default class AppletController {

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
