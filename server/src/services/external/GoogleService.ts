import axios from "axios";
import {GoogleUser} from "../../models/GoogleUser";
import {buildAuthorizationHeaders} from "../../utils/Axios";

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
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
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

        console.log(authorizeUrl);

        console.log(process.env.GOOGLE_REDIRECT_URL)

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

    public static sendWatchGmail(token: string, userEmail: string, topicName: string, callback: (successData: object | null, error: string | null) => void): void {
        axios.post(`https://gmail.googleapis.com/gmail/v1/users/${userEmail}/watch/`, {
            topicName,
            labelIds: ["SENT"]
        }, buildAuthorizationHeaders(token)).then((response) => {
            if (response.status === 200)
                return callback(response.data, null);
            return callback(null, response.data)
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

    public static stopWatchGmail(token: string, userEmail: string) {

    }

}
