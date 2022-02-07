import DBService from "../services/DBService";

export interface TokenData {
    key: string,
    type: string,
    token: object,
    created_at: Date
}

type success = () => void;
type successQuery = (result) => void;
type error = (error: string) => void;

export default class ServiceController {

    public createTableForUser(userUuid: string, success: success, error: error) {
        DBService.query(`INSERT INTO services (user_uuid) VALUES ('${userUuid}')`, (result) => {
            success();
        }, err => error(err));
    }

    public getUserTokens(userUuid: string, service: string, success: successQuery, error: error) {
        DBService.query(`SELECT ${service} FROM services WHERE user_uuid = '${userUuid}'`, (result) => {
            if (result.length === 0)
                return success(null);
            try {
                return success(result[0][service] as object);
            } catch (ex) {
                console.log('abc', ex);
            }

        }, error);
    }

    public registerUserToken(userUuid: string, token: TokenData, success: success, error: error) {
        this.getUserTokens(userUuid, token.type, (tokens) => {
            let tokensArray;
            try {
                tokensArray = JSON.parse(tokens);
            } catch (ex) {
                tokensArray = [];
            }
            if (tokensArray === undefined || tokensArray === null) {
                console.log("empty tokens !");
                tokensArray = [];
            }
            tokensArray.push(token);
            DBService.query(`UPDATE area.services t SET t.${token.type} = '${JSON.stringify(tokensArray)}' WHERE t.user_uuid = '${userUuid}'`, (result) => {
                if (result['affectedRows'] >= 1)
                    return success();
                return error('An error occurred, please try again later !');
            });
        }, error);
    }

    public getTokensForService(userUuid: string, service: string, success: (tokens) => void, error: error): void {
        DBService.query(`SELECT ${service} FROM services WHERE user_uuid = '${userUuid}'`, (result) => {
            if (result.length === 0)
                return success([]);
            return success(result);
        }, error);
    }

    public getTokenByKeyAndService(userUuid: string, service: string, key: string, success: (token: TokenData | undefined) => void, error: error) {
        if (service === undefined)
            return error("Invalid reaction service type !");
        this.getTokensForService(userUuid, service, (tokens) => {
            let obj = JSON.parse(tokens[0][service]);
            let good = obj.filter((token) => token.key === key);
            if (good.length === 0)
                return success(undefined);
            return success(good[0]);
        }, error);
    }

    public updateTokenByKeyAndService(userUuid: string, service: string, key: string, callback: (success: boolean, error: string) => void) {
        if (service === undefined)
            return callback(false, "Invalid reaction service type !");
/*        this.getTokensForService(userUuid, service, (tokens) => {
            let obj = JSON.parse(tokens[0][service]);
            obj.map((token) => {
                if (token.key === key) {

                } else {
                    return token;
                }
            })

            let good = obj.filter((token) => token.key === key);
            if (good.length === 0)
                return success(undefined);
            return success(good[0]);
        }, error);*/
    }

}
