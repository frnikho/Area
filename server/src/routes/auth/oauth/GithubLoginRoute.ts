import Route from "../../../Route";

import axios from 'axios';
import express = require('express');
import GithubService from "../../../services/GithubService";
import UserController from "../../../controllers/UserController";
import JWTService from "../../../services/JWTService";

export default class GithubLoginRoute extends Route {

    constructor() {
        super();
        this.router.get('/code', this.code);
        this.router.get('/', this.post);
    }

    private code(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;

        axios.post(`https://github.com/login/oauth/access_token`, {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.GITHUB_REDIRECT_URL,
        }, {
            headers: {
                "Accept": "application/json"
            }
        }).then((response) => {
            let {error, error_description} = response.data;
            if (error)
                return res.status(400).json({success: false, error: error_description});

            GithubService.getUser(response.data['access_token'], (data) => {
                if (data.email === null || data.email === undefined)
                    return res.status(400).json({success: false, error: 'Your email need to be public !', link: 'https://github.com/settings/profile'});

                new UserController().authWithGithub(data, (type, user) => {
                    return res.status(200).json({
                        success: true,
                        token: new JWTService(user).sign()
                    });
                }, (err) => {
                    console.log(err);
                })

            }, (msg) => {
                return res.status(400).json({success: false, error: msg});
            });
        })
    }

    private post(req: express.Request, res: express.Response) {
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
    }

}
