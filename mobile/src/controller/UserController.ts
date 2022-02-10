import AxiosController from "./AxiosController";
import TokenController from './TokenController';
import { UserInfo } from "../models/UserModels";

export default class UserController {

    /**
     * Get user's info
     */
    public getUserInfo(callback: (status: boolean, callback: any) => void) {
        new TokenController().getUserToken((status, tokenResponse) => {
            if (status) {
                new AxiosController().get(new AxiosController().baseURL() + "/me", new AxiosController().config(tokenResponse), (status, meResponse) => {
                    if (status) {
                        return callback(status, {
                            email: meResponse.data.email,
                            firstname: meResponse.data.firstname,
                            lastname: meResponse.data.lastname,
                            uuid: meResponse.data.uuid,
                        } as UserInfo);
                    } else {
                        return callback(status, meResponse);
                    }
                });
            } else {
                return callback(status, tokenResponse);
            }
        });
    }
}