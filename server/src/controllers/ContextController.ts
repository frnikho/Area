import {Services} from "../models/Services";
import {Context, NamedContext} from "../models/Context";
import DBService from "../services/DBService";

export default class ContextController {

    public getContextsByService(userUuid: string, service: Services, callback: (context: Context[], error: string) => void) {
        if (service === undefined)
            return callback(null, `Unknown service '${service}'`);
        DBService.query(`SELECT ${service.valueOf()} FROM area.services WHERE user_uuid = '${userUuid}'`, (result) => {
            const jsonData = result[0][service.valueOf()];
            callback(JSON.parse(jsonData), null);
        })
    }

    public getContexts(userUuid: string, callback: (contexts: NamedContext[], error: string) => void) {
        DBService.query(`SELECT * FROM area.services WHERE user_uuid = '${userUuid}'`, (result) => {
            const namedContexts: NamedContext[] = [];
            for (const service of Object.keys(Services)) {
                const obj = result[0][service.toLowerCase()];
                try {
                    const contexts = JSON.parse(obj);
                    namedContexts.push({
                        count: contexts.length,
                        contexts,
                        service: service.valueOf().toLowerCase()
                    });
                } catch (ex) {
                    namedContexts.push({
                        count: obj.length,
                        contexts: obj,
                        service: service.valueOf().toLowerCase()
                    });
                }
            }
            callback(namedContexts, null);
        })
    }

    public createContext(userUuid: string, service: Services, context: Context, callback: (context: Context, error: string) => void) {
        this.getContextsByService(userUuid, service, (userContexts) => {
            userContexts.push(context);
            DBService.query(`UPDATE area.services t SET t.${service.valueOf()} = '${JSON.stringify(userContexts)}' WHERE t.user_uuid = '${userUuid}'`, (result) => {
                if (result === undefined)
                    return callback(null, "An internal error occurred, please try again later !");
                if (result.affectedRows >= 1)
                    return callback(context, null);
            });
        });
    }

    public getContextByUuid(userUuid: string, service: Services, uuid: string, callback: (context: Context, error: string) => void): void {
        this.getContextsByService(userUuid, service, (contexts, error) => {
            if (error)
                return callback(null, error);
            callback(contexts.filter((context) => context.uuid === uuid)[0], null);
        });
    }

    public deleteContextByUuid(userUuid: string, service: Services, uuid: string, callback: (error) => void): void {
        this.getContextsByService(userUuid, service, (contexts, error) => {
            const index: number = contexts.findIndex((context) => context.uuid === uuid);
            contexts.splice(index, 1);
            DBService.query(`UPDATE area.services t SET t.${service.valueOf()} = '${JSON.stringify(contexts)}' WHERE t.user_uuid = '${userUuid}'`, (result) => {
                if (result === undefined)
                    return callback("An internal error occurred, please try again later !");
                if (result.affectedRows >= 1)
                    return callback(null);
            });
        });
    }

    public updateContext(userUuid: string, service: Services, contextToReplace: Context, callback: (context, error) => void): void {
        this.getContextsByService(userUuid, service, (contexts, error) => {
            const index: number = contexts.findIndex((context) => context.uuid === contextToReplace.uuid);
            if (index === -1)
                return callback(null, "Context not found !");
            contexts.splice(index, 1, contextToReplace);
            DBService.query(`UPDATE area.services t SET t.${service.valueOf()} = '${JSON.stringify(contexts)}' WHERE t.user_uuid = '${userUuid}'`, (result) => {
                if (result === undefined)
                    return callback(null, "An internal error occurred, please try again later !");
                if (result.affectedRows >= 1)
                    return callback(contextToReplace, null);
            });
        });
    }

}
