import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";
import ServiceAuthRoute from "./ServiceAuthRoute"
import {Services} from "../../models/Services"
const pkceChallenge = require("pkce-challenge");
const utf8 = require('utf8');

export default class TwitterServiceRoute extends Route {

    private static code_verifier: any;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/', this.login);
    }

    /**
     * Callback Route: allow us to have an access token thanks to the redirect uri
     *
     * @param req - code - given by redirect uri - code_verifier PKCE
     * @param res
     */
    private callback(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;
        const code_verifier: string = req.query['code_verifier'] as string;

        let string = utf8.encode(process.env.TWITTER_SERVICES_CLIENT_ID + ":" + process.env.TWITTER_SERVICES_CLIENT_SECRET);
        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + utf8.decode(Buffer.from(string).toString("base64"))
            }
        };

        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', process.env.TWITTER_SERVICES_CLIENT_ID);
        params.append("code_verifier", (code_verifier === undefined || code_verifier.length == 0 ? TwitterServiceRoute.code_verifier : code_verifier));
        params.append("grant_type", "authorization_code");
        params.append('redirect_uri', process.env.TWITTER_SERVICES_REDIRECT_URL);

        new ServiceAuthRoute().postRequest("https://api.twitter.com/2/oauth2/token", params, headers, req['user']['uuid'], Services.TWITTER.valueOf(), (token) => {
            return res.status(200).json({success: true, token: token});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        });
    }

    /**
     * Login Route - TEMPORARY
     *
     * Twitter OAUTH need PCKE
     *
     * When PCKE is generated two code are given code_verifier & code_challenge
     *
     * code_challenge mist be seend during redirect and code_verifier must be send during token recuperation
     * so you must stock and send code_verifier to send as the same as the code
     *
     * @param req
     * @param res
     * @returns
     */
    private login(req: express.Request, res: express.Response) {
            const pkce = pkceChallenge();
            TwitterServiceRoute.code_verifier = pkce["code_verifier"];
            return res.redirect("https://twitter.com/i/oauth2/authorize?"
                + "response_type=code&"
                + "client_id=" + process.env.TWITTER_SERVICES_CLIENT_ID + "&"
                + "redirect_uri=" + process.env.TWITTER_SERVICES_REDIRECT_URL + "&"
                + "scope=tweet.write tweet.read users.read offline.access&"
                + "state=state&"
                + "code_challenge=" + pkce["code_challenge"] + "&"
                + "code_challenge_method=s256");
    }
}