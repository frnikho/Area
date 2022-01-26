import Route from "../../../Route";

import express = require('express');
import axios from 'axios';
import GoogleService from "../../../services/external/GoogleService";
import UserController from "../../../controllers/UserController";
import JWTService from "../../../services/JWTService";

export default class GoogleLoginRoute extends Route {

    constructor() {
        super();
        this.router.get('/code', this.code);
        this.router.get('/', this.get);
    }

    private code(req: express.Request, res: express.Response) {
        const {code} = req.query;

        axios.post(`https://oauth2.googleapis.com/token`, {
            code: code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        }).then((response) => {
            const {access_token, error} = response.data;
            if (error)
                console.log(error);
            GoogleService.getUser(access_token, (data) => {
                if (data.email === null || data.email === undefined)
                    return res.status(400).json({success: false, error: 'Your email need to be public !', link: 'https://myaccount.google.com/?utm_source=OGB&tab=wk&utm_medium=act'});
                new UserController().authWithGoogle(data, (context, user) => {
                    return res.status(200).json({
                        success: true,
                        token: new JWTService({
                            uuid: user.uuid,
                            email: user.email,
                        }).sign()
                    });
                }, (err) => {
                    return res.status(400).json({success: false, error: err})
                })
            }, (err) => {
                return res.status(400).json({success: false, error: err})
            })
        }).catch((err) => {
            return res.status(400).json({success: false, error: err})
        });
    }

    private get(req: express.Request, res: express.Response) {
        res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?`
            + `client_id=${process.env.GOOGLE_CLIENT_ID}&`
            + `response_type=code&state=state_parameter_passthrough_value&`
            + `scope=openid%20profile%20email&`
            + `redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&`
            + `prompt=consent&include_granted_scopes=true`)
    }

}
