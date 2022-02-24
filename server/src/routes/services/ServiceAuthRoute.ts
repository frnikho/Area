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
     * @param success - return token
     * @param errorFunc return error
     */
    public postRequest(url: string, body: object, header: object, success: token, errorFunc: errorFnc): void {
        axios.post(url, body, header).then((response) => {
            const {error} = response.data;
            console.log(error);
            if (error)
                return errorFunc(error);
            return success(ServiceAuthRoute.token(response.data));
        }).catch((err) => {
            console.log(err.response.data);
            return errorFunc(err);
        })
    }

    /**
     * Execute get request for services auth
     *
     * @param url
     * @param params
     * @param success - return token
     * @param errorFunc - return error
     */
    public getRequest(url: string, params: object, success: token, errorFunc: errorFnc): void {
        axios.get(url, {params}).then((response) => {
            const {error} = response.data;
            if (error)
                return errorFunc(error);
            return success(ServiceAuthRoute.token(response.data));
        }).catch((err) => {
            return errorFunc(err);
        })
    }

    /**
     * Generate token
     *
     * @param data
     */
    public static token(data: object): TokenData {
        return {
            key: randomstring.generate(),
            created_at: new Date(),
            token: data
        } as TokenData
    }
}
