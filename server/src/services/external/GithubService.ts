import axios from 'axios';
import {GithubUser} from "../../models/GithubUser";
import {TokenData} from "../../controllers/ServiceController";
import {buildAuthorizationHeaders} from "../../utils/Axios";

type successRefresh = (data: object) => void;
type error = (error: string) => void;

export default class GithubService {

    public static refreshToken(token: TokenData, clientId: string, clientSecret: string, success: successRefresh, errorCb: error) {
        axios.post(`https://github.com/login/oauth/access_token`, {
            refresh_token: token.token['refresh_token'],
            grant_type: 'refresh_token',
            client_id: clientId,
            client_secret: clientSecret,
        }).then((response) => {
            console.log(response.data);
            success(response.data);
        }).catch((err) => {
            console.log(err);
            errorCb(err);
        })
    }

    public static listRepository(token: string, callback: (success?: string, error?: string) => void): void {
        axios.get(`https://api.github.com/user/repos?per_page=100`, buildAuthorizationHeaders(token)).then((response) => {
            callback(response.data, null)
        }).catch((err) => callback(null, err));
    }

    public static listRepositoryWebhooks(token: string, repo: string, success: (data) => void) {
        axios.get(`https://api.github.com/repos/${repo}/hooks`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err.response.data)
        });
    }

    public static getUser(token: string, success: (data: GithubUser) => void, errorCb: (msg) => void) {
        axios.get(`https://api.github.com/user`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        }).then((response) => {
            success(response.data);
        }).catch((err) => {
            errorCb(err);
        })
    }

}
