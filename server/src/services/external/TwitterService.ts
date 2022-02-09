import axios from 'axios';
import ServiceController from "../../controllers/ServiceController";
import {Services} from "../../models/Services";
import {TokenData} from "../../controllers/ServiceController";

const utf8 = require('utf8');


export default class TwitterService {

    /**
     * Send Tweet
     *
     * @param userAccesToken
     * @param userUuid
     * @param message
     * @param callback - status = true = success - status = false = error
     */
    public SendTweet(userAccesToken: string, userUuid: string, message: string, callback: (status: boolean, response: string) => void) {

        const body = {
            text: message
        }

        this.post("https://api.twitter.com/2/tweets", body,
        {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + userAccesToken
            }
        }, (status, response) => {
            if (status) {
                console.log("Tweet sended");
                return callback(status, response.data);
            }
            if (response.response.status !== undefined && response.response.status === 401) {
                console.log("access_token of " + userUuid + " users has been expired");
                this.refreshToken(userUuid, userAccesToken, (refreshStatus, refreshResponse) => {
                    if (refreshStatus) {
                        console.log("New access_token has been generated for user : " + userUuid);
                        this.post("https://api.twitter.com/2/tweets", body,
                        {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + refreshResponse.new_access_token
                            }
                        }, (refreshStatusCb, refreshResponseCb) => {
                            return callback(refreshStatusCb, refreshResponseCb);
                        });
                    } else {
                        return callback(refreshStatus, refreshResponse);
                    }
                });
            }
        });
    }

    /**
     * Refresh twitter token
     *
     * @param userUuid
     * @param accessToken
     * @param callback - status = true = success - status = false = error
     */
    private refreshToken(userUuid: string, accessToken: string, callback: (status: boolean, response: any) => void) {
        // Get key by user's access token and service
        new ServiceController().getTokenByAccessTokenAndService(userUuid, Services.TWITTER.valueOf(), accessToken, (status, response) => {
            if (status) {
                // Refresh token
                const authStr = utf8.encode(process.env.TWITTER_SERVICES_CLIENT_ID + ":" + process.env.TWITTER_SERVICES_CLIENT_SECRET);

                const headers = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Basic " + utf8.decode(Buffer.from(authStr).toString("base64"))
                    }
                };

                const params = new URLSearchParams();
                params.append('client_id', process.env.TWITTER_SERVICES_CLIENT_ID);
                params.append("grant_type", "refresh_token");
                params.append("refresh_token", response.token["refresh_token"]);

                this.post("https://api.twitter.com/2/oauth2/token", params, headers, (statusPost, postReponse) => {
                    if (statusPost) {
                        const token: TokenData = {
                            key: response.key,
                            created_at: response.created_at,
                            type: response.type,
                            token: {
                                access_token: postReponse.data.access_token,
                                refresh_token: postReponse.data.refresh_token,
                            }
                        }
                        // Update token by key and service in DB
                        new ServiceController().updateTokenByKeyAndService(token, userUuid, (updateStatus, updateResponse) => {
                            if (updateStatus)
                                return callback(updateStatus, {msg: updateResponse, new_access_token: postReponse.data.access_token});
                            return callback(updateStatus, updateResponse);
                        });
                    } else
                        return callback(statusPost, response)
                });
            } else
                return callback(status, response);
        });
    }

    /**
     * Execute post request
     *
     * @param url
     * @param body
     * @param headers
     * @param callback - status = true = success - status = false = error
     */
    private post(url: string, body: object, headers: object, callback: (status: boolean, response: any) => void) {
        axios.post(url, body, headers).then((response) => {
            return callback(true, response.data);
        }).catch((err) => {
            return callback(false, err.data);
        });
    }
}
