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
                return success(result[0][service]);
            } catch (ex) {
                console.log('abc', ex);
            }

        }, error);
    }

    public registerUserToken(userUuid: string, token: TokenData, success: success, error: error) {
        this.getUserTokens(userUuid, token.type, (tokens) => {
            let tokensArray = JSON.parse(tokens);
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

    public getTokenByKeyAndService(userUuid: string, serviceName: string, key: string, success: (token: TokenData | undefined) => void, error: error) {
        if (serviceName === undefined)
            return error("Invalid reaction service type !");
        this.getTokensForService(userUuid, serviceName, (tokens) => {
            let obj = JSON.parse(tokens[0][serviceName]);
            let good = obj.filter((token) => token.key === key);
            if (good.length === 0)
                return success(undefined);
            return success(good[0]);
        }, error);
    }

    /**
     * Get token key by access token
     *
     * @param userUuid
     * @param serviceName
     * @param accessToken
     * @param callback
     * @returns
     */
    public getTokenByAccessTokenAndService(userUuid: string, serviceName: string, accessToken: string, callback: (status: boolean, response: any) => void) {
        if (serviceName == undefined)
            return callback(false, "Invalid reaction service type !");
        DBService.query(`SELECT ${serviceName} FROM services WHERE user_uuid = '${userUuid}'`, (result) => {
            let obj = JSON.parse(result[0][serviceName]);
            let token = obj.filter((token) => token.token["access_token"] === accessToken);
            if (token.length === 0)
                return callback(false, "No token founded for user : " + userUuid);
            return callback(true, token[0])
        });
    }

    /**
     * Update user's access/refresh tokens of a service by key
     *
     * @param newToken - TokenData - newToken contains old token data (key, type, created_at) and new access & refresh tokens
     * @param userUuid
     * @param callback - status = true = success - status = false = error
     * @returns
     */
    public updateTokenByKeyAndService(newToken: TokenData, userUuid: string, callback: (status: boolean, response: string) => void) {
        let serviceName = newToken.type;
        if (serviceName === undefined)
            return callback(false, "Invalid reaction service type !");
        let key = newToken.key;
        this.getTokensForService(userUuid, serviceName, (tokens) => {
            let obj = JSON.parse(tokens[0][serviceName]);
            obj.map((token) => {
                if (token.key === key) {
                    token.token["access_token"] = newToken.token["access_token"]
                    token.token["refresh_token"] = newToken.token["refresh_token"]
                }
            });
            DBService.query(`UPDATE area.services services SET services.${serviceName} = '${JSON.stringify(obj)}' WHERE services.user_uuid = '${userUuid}'`, (result) => {
                return callback(true, "Tokens for user : " + userUuid + " has been updated");
            });
        }, (error) => {
            return callback(false, error);
        })
    }

}
