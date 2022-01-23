import axios from "axios";
import ServiceController, {TokenData} from "../../controllers/ServiceController";
import randomstring = require('randomstring');

type token = (data: TokenData) => void;
type error = (error: string) => void;

export default class ServiceRoute {

    constructor() {
    }

    public request(url: string, body, header, userUUID:string, tokenType: string, success: token, errorFunc: error): void {
        axios.post(url, body, header).then((response) => {
            let {error, access_token, refresh_token} = response.data;
            console.log(response.data);
            if (error)
                return errorFunc(error);

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
            }, error)
        }).catch((err) => {
            return errorFunc(err);
        })
    }
}
