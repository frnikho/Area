import Route from "../../../Route";

import axios from 'axios';
import express = require('express');
import GithubService from "../../../services/external/GithubService";
import UserController from "../../../controllers/UserController";
import JWTService from "../../../services/JWTService";

export default class GithubLoginRoute extends Route {

    constructor() {
        super();
        this.router.get('/code', this.code);
        this.router.get('/', this.post);
    }

    /**
     * @openapi
     * /auth/github/code:
     *   get:
     *     tags:
     *       - Authentication
     *     description: Github Login
     *     parameters:
     *       - in: path
     *         name: code
     *         schema:
     *           type: string
     *         description: Code given by Github Auth
     *         required: true
     *       - in: path
     *         name: type
     *         schema:
     *           type: string
     *         description: Context if request come from mobile or web ('web' or 'mobile')
     *         required: true
     *     responses:
     *       200:
     *         description: Successful login
     *       400:
     *         description: Error while login
     */
    private code(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;
        const type: string = req.query['type'] as string;

        axios.post(`https://github.com/login/oauth/access_token`, {
            client_id: type === 'web' ? process.env.GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID_MOBILE,
            client_secret: type === 'web' ? process.env.GITHUB_SECRET : process.env.GITHUB_CLIENT_SECRET_MOBILE,
            code,
            redirect_uri: type === 'web' ? process.env.GITHUB_REDIRECT_URL : process.env.GITHUB_REDIRECT_URL_MOBILE,
        }, {
            headers: {
                "Accept": "application/json"
            }
        }).then((response) => {
            const {error, error_description} = response.data;
            if (error)
                return res.status(400).json({success: false, error: error_description});

            GithubService.getUserByToken(response.data['access_token'], (data) => {
                if (data.email === null || data.email === undefined)
                    return res.status(400).json({success: false, error: 'Your email need to be public !', link: 'https://github.com/settings/profile'});

                new UserController().authWithGithub(data, (type, user) => {
                    return res.status(200).json({
                        success: true,
                        token: new JWTService({
                            uuid: user.uuid,
                            email: user.email,
                        }).sign()
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
