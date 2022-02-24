import axios from "axios";
import {User} from "../../models/User";
import {Context} from "../../models/Context";
import ContextController from "../../controllers/ContextController";
import {Services} from "../../models/Services";

export enum SpotifyControlType {
    NEXT,
    PREVIOUS,
    PAUSE,
    PLAY,
}

export default class SpotifyService {

    constructor() {

    }

    public buildAuthorizationHeader(token): object {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    public getPlayer(token: string, success: (data, error) => void): void {
        axios.get('https://api.spotify.com/v1/me/player/recently-played', this.buildAuthorizationHeader(token)).then((response) => {
            success(response.data, null);
        }).catch((error) => success(null, error));
    }

    public control(): void {

    }

    public getMe(token: string, callback: (data, error) => void): void {
        axios.get('https://api.spotify.com/v1/me', this.buildAuthorizationHeader(token)).then((response) => {
            callback(response.data, null);
        }).catch((err) => callback(null, err));
    }

    public checkToken(token: string, callback: (valid: boolean) => void): void {
        this.getMe(token, (data, err) => {
            if (data === null || err !== null)
                return callback(false);
            return callback(true);
        })
    }

    public playTrack(userUuid: string, context: Context, songUri: string, callback: (data: string, error?: string) => void) {
        axios.put("https://api.spotify.com/v1/me/player/play", {
            context_uri: songUri,
        }, this.buildAuthorizationHeader(context.tokenData.token['access_token'])).then((response) => {
            callback(response.data, null);
        }).catch((err) => {
            if (err.response.status === 401) {
                this.refreshToken(context, userUuid, (newContext => {
                    axios.put("https://api.spotify.com/v1/me/player/play", {
                        context_uri: songUri,
                    }, this.buildAuthorizationHeader(newContext.tokenData.token['access_token'])).then((response) => {
                        callback(response.data, null);
                    }).catch((newErr) => console.error(newErr.response.data));
                }));
            } else {
                callback(null, err.response.data);
            }
        });
    }

    public pauseTrack(userUuid: string, context: Context, callback: (data: string, error?: string) => void) {
        axios.put("https://api.spotify.com/v1/me/player/pause", {}, this.buildAuthorizationHeader(context.tokenData.token['access_token'])).then((response) => {
            callback(response.data, null);
        }).catch((err) => {
            if (err.response.status === 401) {
                this.refreshToken(context, userUuid, (newContext => {
                    axios.put("https://api.spotify.com/v1/me/player/pause", {}, this.buildAuthorizationHeader(newContext.tokenData.token['access_token'])).then((response) => {
                        callback(response.data, null);
                    }).catch((newErr) => console.error(newErr.response.data));
                }));
            } else {
                callback(null, err.response.data);
            }
        });
    }

    public changeVolume(userUuid: string, context: Context, volume: number, callback: (data: string, error?: string) => void) {
        axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {}, this.buildAuthorizationHeader(context.tokenData.token['access_token'])).then((response) => {
            callback(response.data, null);
        }).catch((err) => {
            if (err.response.status === 401) {
                this.refreshToken(context, userUuid, (newContext => {
                    axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {}, this.buildAuthorizationHeader(newContext.tokenData.token['access_token'])).then((response) => {
                        callback(response.data, null);
                    }).catch((newErr) => console.error(newErr.response.data));
                }));
            } else {
                callback(null, err.response.data);
            }
        });
    }

    public getCurrentPlayingSong(context: Context,  userUuid: string, callback: (data, error?) => void) {
        axios.get(`https://api.spotify.com/v1/me/player`, this.buildAuthorizationHeader(context.tokenData.token['access_token'])).then((response) => {
            if (response.status === 204)
                callback(undefined, undefined);
            callback(response.data, null);
        }).catch((err) => {
            if (err === undefined)
                return callback(undefined, "An error occurred, please try again later");
            if (err.response.status === 401) {
                this.refreshToken(context, userUuid, (newContext => {
                    axios.get(`https://api.spotify.com/v1/me/player`, this.buildAuthorizationHeader(newContext.tokenData.token['access_token'])).then((response) => {
                        callback(response.data, null);
                    }).catch((newErr) => console.error(newErr));
                }));
            } else {
                callback(null, err.response.data);
            }
        });
    }

    public getRecentlyPlayedTrack(context: Context, userUuid: string, callback: (data, error?) => void) {
        axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=1`, this.buildAuthorizationHeader(context.tokenData.token['access_token'])).then((response) => {
            callback(response.data, null);
        }).catch((err) => {
            if (err.response.status === 401) {
                this.refreshToken(context, userUuid, (newContext => {
                    axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=1`, this.buildAuthorizationHeader(newContext.tokenData.token['access_token'])).then((response) => {
                        callback(response.data, null);
                    }).catch((newErr) => console.error(newErr.response.data));
                }));
            } else {
                callback(null, err.response.data);
            }
        });
    }

    public refreshToken(context: Context, userUuid: string, callback: (newToken: Context, error: string) => void) {
        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_SERVICE_CLIENT_ID + ':' + process.env.SPOTIFY_SERVICE_CLIENT_SECRET).toString('base64'))
            },
        };
        const params = new URLSearchParams();
        params.append('refresh_token', context.tokenData.token['refresh_token']);
        params.append('grant_type', "refresh_token");
        axios.post(`https://accounts.spotify.com/api/token`, params, headers).then((response) => {
            context.tokenData.token['access_token'] = response.data['access_token'];
            if (response.data['refresh_token'] !== undefined)
                context.tokenData.token['refresh_token'] = response.data['refresh_token'];
            new ContextController().updateContext(userUuid, Services.SPOTIFY, context, (replacedContext, contextError) => {
                if (contextError)
                    return callback(undefined, contextError);
                return callback(replacedContext, null);
            });
        }).catch((err) => console.log(err.response.data));
    }

}
