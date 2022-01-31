import axios from "axios";
import ServiceController, {TokenData} from "../../controllers/ServiceController";
import randomstring = require('randomstring');

type token = (data: TokenData) => void;
type error = (error: string) => void;

export default class ServiceAuthRoute {

    /**
     * Execute post request for services auth
     *
     * @param url
     * @param body
     * @param header
     * @param userUUID
     * @param tokenType - cf Services in "./src/models/Services"
     * @param success - return token
     * @param errorFunc return error
     */
    public postRequest(url: string, body: object, header: object, userUUID: string, tokenType: string, success: token, errorFunc: error): void {
        axios.post(url, body, header).then((response) => {
            let {error, access_token, refresh_token} = response.data;
            if (error)
                return errorFunc(error);
            return this.token(tokenType, access_token, refresh_token, userUUID, (token) => {
                return success(token);
            }, (err) => {
                return errorFunc(err);
            });
        }).catch((err) => {
            return errorFunc(err);
        })
    }

    /**
     * Execute get request for services auth
     *
     * @param url
     * @param params
     * @param userUUID
     * @param tokenType - cf Services in "./src/models/Services"
     * @param success - return token
     * @param errorFunc - return error
     */
    public getRequest(url: string, params: object, userUUID: string, tokenType: string, success: token, errorFunc: error): void {
        axios.get(url, {params}).then((response) => {
            let {error, access_token, refresh_token} = response.data;
            if (error)
                return errorFunc(error);
            return this.token(tokenType, access_token, refresh_token, userUUID, (token) => {
                return success(token);
            }, (err) => {
                return errorFunc(err);
            });
        }).catch((err) => {
            return errorFunc(err);
        })
    }

    /**
     * Generate token
     *
     * @param tokenType - cf Services in "./src/models/Services"
     * @param access_token
     * @param refresh_token
     * @param userUUID
     * @param success - return token
     * @param errorFunc - return error
     */
    private token(tokenType: string, access_token: string, refresh_token: string, userUUID: string, success: token, errorFunc: error) {
        let token: TokenData = {
            key: randomstring.generate(),
            created_at: new Date(),
            type: tokenType,
            token: {
                access_token: access_token,
                refresh_token: refresh_token,
            }
        }
        new ServiceController().registerUserToken(userUUID, token, () => {
            return success(token);
        }, (err) => {
            return errorFunc(err);
        });
    }
}
