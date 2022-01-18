import axios from "axios";
import {GoogleUser} from "../models/GoogleUser";

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

}
