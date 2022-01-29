import axios from "axios";
import {GoogleUser} from "../../models/GoogleUser";
import {buildAuthorizationHeaders} from "../../utils/Axios";

export default class GoogleService {

    public static getUser(token: string, success: (data: GoogleUser) => void, error: (msg) => void) {
        axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        }).then((response) => {
            success(response.data);
        }).catch((err) => {
            error(err);
        })
    }

    public static sendWatchGmail(token: string, userEmail: string, topicName: string, callback: (successData: object | null, error: string | null) => void): void {
        axios.post(`https://gmail.googleapis.com/gmail/v1/users/${userEmail}/watch/`, {
            topicName: topicName,
        }, buildAuthorizationHeaders(token)).then((response) => {
            if (response.status === 200)
                return callback(response.data, null);
            return callback(null, response.data)
        }).catch((error) => {
            return callback(null, error);
        });
    }

    public static stopWatchGmail(token: string, userEmail: string)

}
