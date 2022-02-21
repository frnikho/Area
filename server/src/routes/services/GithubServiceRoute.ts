import Route from "../../Route";
import {authorization} from "../../middlewares/AuthMiddleware";
import ServiceAuthRoute from "./ServiceAuthRoute";
import {Services} from "../../models/Services"
import GithubService from "../../services/external/GithubService";
import ContextController from "../../controllers/ContextController";
import {User} from "../../models/User";
import express = require('express');

export default class GithubServiceRoute extends Route {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/listRepositories', authorization, this.list);
        this.router.get('/user', authorization, this.getUser);
        this.router.get('/', this.login);
    }


    /**
     * @openapi
     * /services/github/listRepositories:
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
        const {context} = req.query;
        const user: User = req['user'];
        if (context === undefined)
            return res.status(400).json({success: false, message: "No context provided !"});

        new ContextController().getContextByUuid(user.uuid, Services.GITHUB, context as string, (contextFound, error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            GithubService.listRepository(user, contextFound, (data, err) => {
                if (err)
                    console.log(err);
                res.status(200).json(data);
            });

        })
    }

    private getUser(req: express.Request, res: express.Response) {
        const {context} = req.query;
        const user: User = req['user'];
        if (context === undefined)
            return res.status(400).json({success: false, message: "context not provided !"});
        new ContextController().getContextByUuid(user.uuid, Services.GITHUB, context as string, (contextFound, error) => {
            if (error)
                return res.status(400).json({success: false, message: error})
            GithubService.getUser(user, contextFound, (githubUser) => {
                return res.status(200).json(githubUser);
            }, (errorCb) => {
                return res.status(400).json({success: false, message: errorCb})
            })
        });
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

        const body = {
            code,
            client_id: process.env.GITHUB_SERVICES_CLIENT_ID,
            client_secret: process.env.GITHUB_SERVICES_SECRET,
            redirect_uri: process.env.GITHUB_SERVICES_REDIRECT_URL,
        }

        new ServiceAuthRoute().postRequest("https://github.com/login/oauth/access_token", body, headers, req['user']['uuid'], Services.GITHUB.valueOf(), (token) => {
            return res.status(200).json({success: true, token});
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
