import axios from "axios";
import ServiceController, {TokenData} from "../../controllers/ServiceController";
import randomstring = require('randomstring');

type token = (data: TokenData) => void;
type errorFnc = (error: string) => void;

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
    public postRequest(url: string, body: object, header: object, userUUID: string, tokenType: string, success: token, errorFunc: errorFnc): void {
        axios.post(url, body, header).then((response) => {
            const {error, access_token, refresh_token} = response.data;
            console.log(response.data)
            if (error)
                return errorFunc(error);
            return this.token(tokenType, access_token, refresh_token, userUUID, (tokenData) => {
                return success(tokenData);
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
    public getRequest(url: string, params: object, userUUID: string, tokenType: string, success: token, errorFunc: errorFnc): void {
        axios.get(url, {params}).then((response) => {
            const {error, access_token, refresh_token} = response.data;
            if (error)
                return errorFunc(error);
            return this.token(tokenType, access_token, refresh_token, userUUID, (tokenData) => {
                return success(tokenData);
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
     * @param accessToken
     * @param refreshToken
     * @param userUUID
     * @param success - return token
     * @param errorFunc - return error
     */
    private token(tokenType: string, accessToken: string, refreshToken: string, userUUID: string, success: token, errorFunc: errorFnc) {
        // tslint:disable-next-line:no-shadowed-variable
        const token: TokenData = {
            key: randomstring.generate(),
            created_at: new Date(),
            token: {
                access_token: accessToken,
                refresh_token: refreshToken,
            }
        }
        return success(token);
    }
}
