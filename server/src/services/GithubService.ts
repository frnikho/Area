import axios from 'axios';
import {GithubUser} from "../models/GithubUser";

export default class GithubService {

    public static getUser(token: string, success: (data: GithubUser) => void, error: (msg) => void) {
        axios.get(`https://api.github.com/user`, {
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
