import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";
import ServiceAuthRoute from "./ServiceAuthRoute";
import ServiceController from "../../controllers/ServiceController";
import {Services} from "../../models/Services"
import GithubService from "../../services/external/GithubService";

export default class GithubServiceRoute extends Route {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.post('/list', authorization, this.list);
        this.router.get('/', this.login);
    }


    /**
     * @openapi
     * /services/github/list:
     *   post:
     *     tags:
     *       - Services
     *     description: List user's Github repositories
     *     responses:
     *       200:
     *         description: Successful login
     *       400:
     *         description: Error while login
     */
    private list(req: express.Request, res: express.Response) {
        const {tokenKey} = req.body;
        new ServiceController().getTokenByKeyAndService(req['user']['uuid'], 'github', tokenKey,(tokenData) => {
            GithubService.listRepository(tokenData.token['access_token'], (data, err) => {
                if (err)
                    console.log(err);
                res.status(200).json(data);
            });
        }, err => {console.log(err)});
    }

    /**
     * @openapi
     * /services/github/callback:
     *   get:
     *     tags:
     *       - Services
     *     description: Github Service OAuth
     *     parameters:
     *       - in: path
     *         name: code
     *         schema:
     *           type: string
     *         description: Code given by Github OAuth
     *         required: true
     *     responses:
     *       200:
     *         description: Successful login
     *       400:
     *         description: Error while login
     */
    private callback(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;

        const headers = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        };

        let body = {
            code: code,
            client_id: process.env.GITHUB_SERVICES_CLIENT_ID,
            client_secret: process.env.GITHUB_SERVICES_SECRET,
            redirect_uri: process.env.GITHUB_SERVICES_REDIRECT_URL,
        }

        new ServiceAuthRoute().postRequest("https://github.com/login/oauth/access_token", body, headers, req['user']['uuid'], Services.GITHUB.valueOf(), (token) => {
            return res.status(200).json({success: true, token: token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    /**
     * Login Route - TEMPORARY
     *
     * @param req
     * @param res
     * @returns
     */
    private login(req: express.Request, res: express.Response) {
        return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_SERVICES_CLIENT_ID}&scope=repo%20admin:repo_hook`);
    }
}
