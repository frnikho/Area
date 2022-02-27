import axios from "axios";
import {GoogleUser} from "../../models/GoogleUser";
import {buildAuthorizationHeaders} from "../../utils/Axios";
import {Context} from "../../models/Context";
import ContextController from "../../controllers/ContextController";
import {Services} from "../../models/Services";

const {OAuth2Client} = require('google-auth-library');

export default class GoogleService {

    private static buildOauth() {
        return new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL,
        );
    }

    public static getAuthorizeUrl() {
        const oAuth2Client = GoogleService.buildOauth();

        return oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://mail.google.com/ https://www.googleapis.com/auth/userinfo.email',
        });
    }

    public static refreshToken(context: Context, userUuid: string, callback: (newContext: Context, error?) => void) {
        GoogleService.refresh(context.tokenData.token['refresh_token'], (newToken) => {
            context.tokenData.token['access_token'] = newToken['access_token'];
            context.tokenData.token['id_token'] = newToken['id_token'];
            context.tokenData.token['expiry_date'] = newToken['expiry_date'];
            new ContextController().updateContext(userUuid, Services.GOOGLE, context, (updatedContext, updatedError) => {
                if (updatedError)
                    return callback(undefined, updatedError);
                return callback(updatedContext);
            });
        });
    }

    private static refresh(refreshToken: string, callback: (newToken) => void) {
        const oAuth2Client = GoogleService.buildOauth();
        oAuth2Client.refreshToken(refreshToken).then((response) => {
            callback(response['tokens']);
        });
    }

    public static getOAuth2ClientOfflineToken(code: string, callback: (tokenData, error?) => void) {
        const oAuth2Client = GoogleService.buildOauth();

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            prompt: 'consent'
        });

        oAuth2Client.getToken(code).then((tokenData) => {
            return callback(tokenData)
        }).catch((error) => {
            return callback(undefined, error);
        })
    }

    public static getUser(token: string, success: (data: GoogleUser) => void, error: (msg) => void) {
        axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        }).then((response) => {
            success(response.data);
        }).catch((err) => {
            if (err.response.status === 401) {
                /*GoogleService.refreshToken(context, userUuid, (newContext => {
                    axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json`, buildAuthorizationHeaders(newContext.tokenData.token['access_token'])).then((response) => {
                        return success(response.data);
                    }).catch((secondError) => error("An error occured !"));
                }));*/
            } else {
                error(err.response.data);
            }
            error(err);
        })
    }

    public static sendWatchGmail(token: string, userEmail: string, callback: (successData: object | null, error: string | null) => void): void {
        axios.post(`https://gmail.googleapis.com/gmail/v1/users/${userEmail}/watch/`, {
            topicName: process.env.GMAIL_PUBSUB_TOPIC,
        }, buildAuthorizationHeaders(token)).then((response) => {
            return callback(response.data, null);
        }).catch((error) => {
            return callback(null, error);
        });
    }


    public static listGmailHistory(token: string, userEmail: string, historyId: string, callback: (successData: object | null, error?: string) => void): void {
        axios.get(`https://gmail.googleapis.com/gmail/v1/users/${userEmail}/history?historyTypes=messageAdded&startHistoryId=${historyId}`, buildAuthorizationHeaders(token)).then((response) => {
            return callback(response.data, null);
        }).catch((err) => {
            console.log(err);
            return callback(null, err);
        });
    }

    public static getHistoryEmailId(context: Context, userUuid: string, messageHistory: string, callback: (data, error?) => void) {
        try {
            const email = context.tokenData.token['email'];
            axios.get(`https://gmail.googleapis.com/gmail/v1/users/${email}/history?startHistoryId=${messageHistory}`, buildAuthorizationHeaders(context.tokenData.token['access_token'])).then((response) => {
                return callback(response.data);
            }).catch((err) => {
                if (err.response.status === 401) {
                    GoogleService.refreshToken(context, userUuid, (newContext => {
                        axios.get(`https://gmail.googleapis.com/gmail/v1/users/${email}/history?startHistoryId=${messageHistory}`, buildAuthorizationHeaders(newContext.tokenData.token['access_token'])).then((response) => {
                            return callback(response.data);
                        }).catch((secondError) => callback(undefined, secondError.response.data));
                    }));
                } else {
                    callback(undefined, err.response.data);
                }
            });
        } catch (ex) {
            return callback(undefined, "An error occurred ! please try again later !");
        }
    }

    public static getEmail(context: Context, userUuid: string, messageId: string, callback: (data, error?) => void) {
        this.getUser(context.tokenData.token['access_token'], (user) => {
            axios.get(`https://gmail.googleapis.com/gmail/v1/users/${user['email']}/messages/${messageId}`, buildAuthorizationHeaders(context.tokenData.token['access_token'])).then((emailResponse) => {
                callback(emailResponse.data);
            }).catch((emailError) => {
                if (emailError === undefined || emailError.response === undefined)
                    return callback(undefined, "An error occurred, please try again later");
                if (emailError.response.status === 401) {
                    GoogleService.refreshToken(context, userUuid, (newContext => {
                        axios.get(`https://gmail.googleapis.com/gmail/v1/users/${user['email']}/messages/${messageId}`, buildAuthorizationHeaders(newContext.tokenData.token['access_token'])).then((response) => {
                            return callback(response.data);
                        }).catch((secondError) => callback(undefined, secondError.response.data));
                    }));
                } else {
                    callback(undefined, emailError.response.data);
                }
            });
        }, (error) => {
            callback(error.response.data);
        })
    }

    public static stopWatchGmail(token: string, userEmail: string) {

    }

}
