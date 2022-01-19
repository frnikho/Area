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
            return success(result[0][service]);
        }, err => {
            if (err === undefined)
                return success(null);
            return error(err)
        });
    }

    public registerUserToken(userUuid: string, token: TokenData, success: success, error: error) {
        this.getUserTokens(userUuid, token.type, (tokens) => {
            if (tokens === undefined || tokens === null)
                tokens = [];
            tokens.push(token);
            DBService.query(`UPDATE yep.services t SET t.${token.type} = '${JSON.stringify(tokens)}' WHERE t.user_uuid = '${userUuid}'`, (result) => {
                if (result['affectedRows'] >= 1)
                    return success();
                return error('An error occurred, please try again later !');
            });
        }, error);
    }

}
