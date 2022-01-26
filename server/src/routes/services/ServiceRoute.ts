import axios from "axios";
import ServiceController, {TokenData} from "../../controllers/ServiceController";
import randomstring = require('randomstring');

type token = (data: TokenData) => void;
type error = (error: string) => void;

export default class ServiceRoute {

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
