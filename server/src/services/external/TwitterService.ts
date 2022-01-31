import axios from 'axios';
import ServiceController from "../../controllers/ServiceController";
import {Services} from "../../models/Services";
import {TokenData} from "../../controllers/ServiceController";

const utf8 = require('utf8');

type success = (data: any) => void;
type error = (error: any) => void;

export default class TwitterService {

    /**
     * Send Tweet
     *
     * @param userAccessToken - Given during OAuth
     * @param message - Tweet message
     * @param userUuid - user uuid
     * @param callback - status = true = success - status = false = error
     */
    public SendTweet(userAccesToken: string, userUuid: string, message: string, callback: (status: boolean, response: string) => void) {
        const headers = {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + userAccesToken
            }
        };

        let body = {
            text: message
        }

        this.post("https://api.twitter.com/2/tweets", body, headers, (response) => {
            return callback(true, response.data);
        }, (err) => {
            if (err.response.status !== undefined && err.response.status === 401) {
                console.log("access_token of " + userUuid + " users has been expired");
                this.refreshToken(userUuid, (status, response) => {
                    if (status)
                        console.log("New access_token has been generated for user : " + userUuid);
                    return callback(status, response);
                });
            }
        });

    }

    /**
     * Refresh Twitter access token
     *
     * @param userUuid
     * @param callback - status = true = success - status = false = error
     */
    private refreshToken(userUuid: string, callback: (status: boolean, response: string) => void) {
        new ServiceController().getTokensForService(userUuid, Services.TWITTER.valueOf(), (response) => {
            let string = utf8.encode(process.env.TWITTER_SERVICES_CLIENT_ID + ":" + process.env.TWITTER_SERVICES_CLIENT_SECRET);

            const headers = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + utf8.decode(Buffer.from(string).toString("base64"))
                }
            };

            let array = JSON.parse(response[0][Services.TWITTER.valueOf()]);

            const params = new URLSearchParams();
            params.append('client_id', process.env.TWITTER_SERVICES_CLIENT_ID);
            params.append("grant_type", "refresh_token");
            params.append("refresh_token", array[0].token["refresh_token"]);


            this.post("https://api.twitter.com/2/oauth2/token", params, headers, (response) => {
                console.log(response.data);
                    let token: TokenData = {
                        key: array[0].key,
                        created_at: array[0].created_at,
                        type: array[0].type,
                        token: {
                            access_token: response.data.access_token,
                            refresh_token: response.data.refresh_token,
                        }
                    }
                new ServiceController().updateTokenByKeyAndService(token, userUuid, (status, response) => {
                    return callback(status, response);
                });
            }, (err) => {
                return callback(false, err.data);
            });
        }, (err) => {
            return callback(false, err);
        });
    }

    /**
     * Execute post request
     *
     * @param url
     * @param body
     * @param headers
     * @param successFunc
     * @param errorFunc
     */
    private post(url: string, body: object, headers: object, successFunc: success, errorFunc: error) {
        axios.post(url, body, headers).then((response) => {
            return successFunc(response);
        }).catch((err) => {
            return errorFunc(err);
        });
    }
}