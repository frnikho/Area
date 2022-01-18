import Route from "../../Route";

import randomstring = require('randomstring');

import express = require('express');
import axios from "axios";

import ServiceController, {TokenData} from "../../controllers/ServiceController";
import {authorization} from "../../middlewares/AuthMiddleware";

export default class GithubServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/login', this.login);
        this.router.get('/callback', authorization, this.callback);
    }

    private callback(req: express.Request, res: express.Response) {
        let {code} = req.query;

        axios.post(`https://github.com/login/oauth/access_token`, {
            client_id: process.env.GITHUB_SERVICES_CLIENT_ID,
            client_secret: process.env.GITHUB_SERVICES_SECRET,
            code: code,
            redirect_uri: process.env.GITHUB_SERVICES_REDIRECT_URL,
        }, {
            headers: {
                "Accept": "application/json"
            }
        }).then((response) => {
            let {error, error_description, access_token, refresh_token} = response.data;
            if (error) {
                console.log(error);
                return res.status(400).json({success: false, error: error_description});
            }
            let token: TokenData = {
                key: randomstring.generate(),
                created_at: new Date(),
                type: 'github',
                token: {
                    access_token: access_token,
                    refresh_token: refresh_token,
                }
            }
            new ServiceController().registerUserToken(req['user']['uuid'], token, () => {
                return res.status(200).json({success: true, token: token});
            }, (err) => {
                return res.status(400).json({success: false, error: err});
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({success: false, error: err});
        })

    }

    private login(req: express.Request, res: express.Response) {
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_SERVICES_CLIENT_ID}`);
    }

}
