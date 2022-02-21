import axios from 'axios';
import {GithubUser} from "../../models/GithubUser";
import {buildAuthorizationHeaders} from "../../utils/Axios";
import {User} from "../../models/User";
import {Context} from "../../models/Context";
import ContextController from "../../controllers/ContextController";
import {Services} from "../../models/Services";
import AxiosType = require('axios');

type successRefresh = (newContext: Context) => void;
type errorFnc = (error: string) => void;

export default class GithubService {

    public static refreshToken(user: User, context: Context, success: successRefresh, errorCb: errorFnc) {
        axios.post(`https://github.com/login/oauth/access_token`, {
            refresh_token: context.tokenData.token['refresh_token'],
            grant_type: 'refresh_token',
            client_id: process.env.GITHUB_SERVICES_CLIENT_ID,
            client_secret: process.env.GITHUB_SERVICES_SECRET,
        }, {
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => {
            console.log(response.data);
            if (response.data.error !== undefined)
                return errorCb(response.data.error_description)
            const newContext = context;
            newContext.tokenData.token['access_token'] = response.data.access_token;
            newContext.tokenData.token['refresh_token'] = response.data.refresh_token;
            new ContextController().updateContext(user.uuid, Services.GITHUB, newContext, (changedContext, error) => {
                if (error)
                    return errorCb(error);
                return success(changedContext);
            });
        }).catch((err) => {
            console.log(err);
            errorCb(err);
        })
    }

    public static requestListRepository(user: User, context: Context, responseCallback: (response: any) => void, errorCallback: (err: any) => void) {
        axios.get(`https://api.github.com/user/repos?per_page=100`, buildAuthorizationHeaders(context.tokenData.token['access_token'])).then((response) => {
            return responseCallback(response);
        }).catch((err) => {
            if (err.response.status === 401) {
                GithubService.refreshToken(user, context, (newContext) => {
                    axios.get(`https://api.github.com/user/repos?per_page=100`, buildAuthorizationHeaders(newContext.tokenData.token['access_token'])).then((secondResponse) => {
                        return responseCallback(secondResponse);
                    }).catch((secondErr) => {
                        errorCallback(secondErr);
                    });
                }, (errA) => {
                    console.log("Error refreshing", errA);
                });
            } else {
                errorCallback(err);
            }
        })
    }

    public static requestUser(user: User, context: Context, responseCallback: (response: any) => void, errorCallback: (err: any) => void) {

    }

    public static listRepository(user: User, context: Context, callback: (success?: string, error?: string) => void): void {
        GithubService.requestListRepository(user, context, (response) => {
            callback(response.data, null);
        }, (err) => {
            callback(null, err);
        })
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

    public static getUser(user: User, context: Context, success: (data: GithubUser) => void, errorCb: (msg) => void) {
        axios.get(`https://api.github.com/user`, {
            headers: {
                "Authorization": `Bearer ${context.tokenData.token['access_token']}`,
                "Accept": "application/json",
            },
        }).then((response) => {
            success(response.data);
        }).catch((err) => {
            if (err.response.status === 401) {
                GithubService.refreshToken(user, context, (newContext) => {
                    axios.get(`https://api.github.com/user`, {
                        headers: {
                            "Authorization": `Bearer ${newContext.tokenData.token['access_token']}`,
                            "Accept": "application/json",
                        },
                    }).then((secondResponse) => {
                        return success(secondResponse.data);
                    }).catch((secondErr) => {
                        return errorCb(secondErr);
                    });
                }, (errA) => {
                    console.log("Error refreshing", errA);
                });
            } else {
                errorCb(err);
            }
        })
    }

    public static getUserByToken(token: string, success: (data: GithubUser) => void, errorCb: (msg) => void) {
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
