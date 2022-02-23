import axios from "axios";
import {User} from "../../models/User";
import {Context} from "../../models/Context";

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

    public playTrack(user: User, context: Context, songUri: string, callback: (data: string, error?: string) => void) {
        axios.put("https://api.spotify.com/v1/me/player/play", {
            context_uri: songUri,
        }, this.buildAuthorizationHeader(context.tokenData.token['access_token'])).then((response) => {
            callback(response.data, null);
        }).catch((err) => callback(null, err));
    }

    public pauseTrack(user: User, context: Context, callback: (data: string, error?: string) => void) {
        axios.put("https://api.spotify.com/v1/me/player/pause", {}, this.buildAuthorizationHeader(context.tokenData.token['access_token'])).then((response) => {
            callback(response.data, null);
        }).catch((err) => callback(null, err));
    }

    public refreshToken(refreshToken: string, callback: (newToken: string, error: string) => void) {
        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64'))
            },
        };
        const params = new URLSearchParams();
        params.append('refresh_token', refreshToken);
        params.append('grant_type', "refresh_token");
        axios.post(`https://accounts.spotify.com/api/token`, params, headers).then((response) => {
           console.log(response.data);
           callback(response.data.access_token, null);
        }).catch((err) => console.log(err.response.data));
    }

}
