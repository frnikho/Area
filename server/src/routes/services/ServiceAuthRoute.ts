import axios from "axios";
import {TokenData} from "../../controllers/ServiceController";
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
            const {error} = response.data;
            if (error)
                return errorFunc(error);
            return this.token(response.data, userUUID, (tokenData) => {
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
            const {error} = response.data;
            if (error)
                return errorFunc(error);
            return this.token(response.data, userUUID, (tokenData) => {
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
     * @param data
     * @param userUUID
     * @param success - return token
     * @param errorFunc - return error
     */
    private token(data: object, userUUID: string, success: token, errorFunc: errorFnc) {
        // tslint:disable-next-line:no-shadowed-variable
        const token: TokenData = {
            key: randomstring.generate(),
            created_at: new Date(),
            token: data
        }
        return success(token);
    }
}
