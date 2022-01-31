import Route from "../../Route";

import express = require('express');
import * as querystring from "querystring";
import axios from "axios";
import ServiceRoute from "./ServiceRoute";
import {Services} from "../../models/Services";
import {authorization} from "../../middlewares/AuthMiddleware";

export default class SpotifyServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/', this.login);
    }

    public callback(req: express.Request, res: express.Response) {
        const {code} = req.query;


        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64'))
            },
        };

        const params = new URLSearchParams();
        params.append('code', code as string);
        params.append('grant_type', "authorization_code");
        params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URL);

        new ServiceRoute().postRequest("https://accounts.spotify.com/api/token", params, headers, req['user']['uuid'], Services.SPOTIFY.valueOf(), (token) => {
            return res.status(200).json({success: true, token: token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    public getUserId() {

    }

    public login(req: express.Request, res: express.Response) {
        let scope: string = 'user-read-private user-read-email';
        return res.redirect(`https://accounts.spotify.com/authorize?`
        + querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: scope,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
                state: '',
            }))
    }

}
