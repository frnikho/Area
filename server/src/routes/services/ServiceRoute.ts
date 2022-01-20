import axios from "axios";
import ServiceController, {TokenData} from "../../controllers/ServiceController";
import randomstring = require('randomstring');

type token = (data: TokenData) => void;
type error = (error: string) => void;

export default class ServiceRoute {

    constructor() {
    }

    public request(url: string, userUUID:string, tokenType: string, success: token, error: error): void {
        axios.post(url,
            {

            }, {
                headers: {
                    "Accept": "application/json"
                }
            }).then((response) => {
                let {error, error_description, access_token, refresh_token} = response.data;
                if (error)
                    return error(error_description);
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
                    return error(err);
                })
            }).catch((err) => {
                console.log(err);
                return error(err);
            })
    }
}