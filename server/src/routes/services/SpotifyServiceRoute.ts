import Route from "../../Route";

import express = require('express');
import {Services} from "../../models/Services";
import {authorization} from "../../middlewares/AuthMiddleware";
import ServiceAuthRoute from "./ServiceAuthRoute";

export default class SpotifyServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/', this.login);
    }

    public callback(req: express.Request, res: express.Response) {
        const {code, type} = req.query;

        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_SERVICE_CLIENT_ID + ':' + process.env.SPOTIFY_SERVICE_CLIENT_SECRET).toString('base64'))
            },
        };

        const params = new URLSearchParams();
        params.append('code', code as string);
        params.append('grant_type', "authorization_code");
        params.append('redirect_uri', type === 'web' ? process.env.SPOTIFY_SERVICE_REDIRECT_URL : process.env.SPOTIFY_SERVICE_REDIRECT_URL_MOBILE);

        new ServiceAuthRoute().postRequest("https://accounts.spotify.com/api/token", params, headers, (token) => {
            return res.status(200).json({success: true, token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    public getUserId() {

    }

    public login(req: express.Request, res: express.Response) {
        const scope: string = 'user-read-private user-read-email user-modify-playback-state';
        const data = new URLSearchParams();
        data.set('response_type', 'code');
        data.set('client_id', process.env.SPOTIFY_SERVICE_CLIENT_ID);
        data.set('scope', scope);
        data.set('redirect_uri', process.env.SPOTIFY_SERVICE_REDIRECT_URL);
        data.set('state', '');
        return res.redirect(`https://accounts.spotify.com/authorize?${data.toString()}`);
    }

}
