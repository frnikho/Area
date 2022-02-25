import axios from "axios";
import {GoogleUser} from "../../models/GoogleUser";
import {buildAuthorizationHeaders} from "../../utils/Axios";
import {Context} from "../../models/Context";
import {response} from "express";

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

    public static refreshToken(refreshToken: string) {
        const oAuth2Client = GoogleService.buildOauth();

        oAuth2Client.setCredentials({
            refresh_token: refreshToken,
        });

        return oAuth2Client.getAccessToken();
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
            error(err);
        })
    }

    public static sendWatchGmail(token: string, userEmail: string, callback: (successData: object | null, error: string | null) => void): void {
        axios.post(`https://gmail.googleapis.com/gmail/v1/users/${userEmail}/watch/`, {
            topicName: process.env.GMAIL_PUBSUB_TOPIC,
            labelIds: ["INBOX"],
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

    public static getHistoryEmailId(context: Context, messageHistory: string, callback: (data, error?) => void) {
        try {
            const email = context.tokenData.token['email'];
            const token = context.tokenData.token['access_token'];
            axios.get(`https://gmail.googleapis.com/gmail/v1/users/${email}/history?startHistoryId=${messageHistory}`, buildAuthorizationHeaders(token)).then((response) => {
                return callback(response.data);
            }).catch((err) => {
                console.log(err.response.status);
                console.log(err.response.data);
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
                callback(emailError.response.data);
            });
        }, (error) => {
            callback(error.response.data);
        })
    }

    public static stopWatchGmail(token: string, userEmail: string) {

    }

}
