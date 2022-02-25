import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";
import ServiceAuthRoute from "./ServiceAuthRoute"
const pkceChallenge = require("pkce-challenge");
const utf8 = require('utf8');
import randomstring = require('randomstring');

interface CodeVerifier {
    key: string,
    codeVerifier: string,
}

export default class TwitterServiceRoute extends Route {

    private static codes: CodeVerifier[] = [];
    private static codeVerifier: any;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/', this.login);
        this.router.get('/link', this.link);
    }

    /**
     * @openapi
     * /services/twitter/callback:
     *   get:
     *     tags:
     *       - Services
     *     description: Twitter Service OAuth
     *     parameters:
     *      - in: path
     *        name: code
     *        schema:
     *          type: string
     *        description: Code given by Twitter OAuth
     *        required: true
     *      - in: path
     *        name: code_verifier
     *        schema:
     *          type: string
     *        description: code_verifier is given after PKCE generation
     *        required: true
     *      - in: path
     *        name: type
     *        schema:
     *          type: string
     *        description: type if is mobile or web
     *        required: true
     *     responses:
     *       200:
     *         description: Successful login
     *       400:
     *         description: Error while login
     */
    private callback(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;
        const codeVerifier: string = req.query['code_verifier'] as string;
        const type: string = req.query['type'] as string;

        const authStr = utf8.encode(process.env.TWITTER_SERVICES_CLIENT_ID + ":" + process.env.TWITTER_SERVICES_CLIENT_SECRET);
        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + utf8.decode(Buffer.from(authStr).toString("base64"))
            }
        };

        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', process.env.TWITTER_SERVICES_CLIENT_ID);
        params.append("code_verifier", (codeVerifier === undefined || codeVerifier.length === 0 ? TwitterServiceRoute.codeVerifier : codeVerifier));
        params.append("grant_type", "authorization_code");
        params.append('redirect_uri', type === 'web' ? process.env.TWITTER_SERVICES_REDIRECT_URL : process.env.TWITTER_SERVICES_REDIRECT_URL_MOBILE);

        new ServiceAuthRoute().postRequest("https://api.twitter.com/2/oauth2/token", params, headers, (token) => {
            return res.status(200).json({success: true, token});
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
        TwitterServiceRoute.codeVerifier = pkce["codeVerifier"];
        return res.redirect("https://twitter.com/i/oauth2/authorize?"
            + "response_type=code&"
            + "client_id=" + process.env.TWITTER_SERVICES_CLIENT_ID + "&"
            + "redirect_uri=" + process.env.TWITTER_SERVICES_REDIRECT_URL + "&"
            + "scope=tweet.write tweet.read users.read offline.access&"
            + "state=state&"
            + "code_challenge=" + pkce["code_challenge"] + "&"
            + "code_challenge_method=s256");
    }

    private link(req: express.Request, res: express.Response) {
        const pkce = pkceChallenge();
        const key: string = randomstring.generate();
        TwitterServiceRoute.codes.push({
            key,
            codeVerifier: pkce['codeVerifier']
        })

        const url = "https://twitter.com/i/oauth2/authorize?"
            + "response_type=code&"
            + "client_id=" + process.env.TWITTER_SERVICES_CLIENT_ID + "&"
            + "redirect_uri=" + process.env.TWITTER_SERVICES_REDIRECT_URL + "&"
            + "scope=tweet.write tweet.read users.read offline.access&"
            + "state=state&"
            + "code_challenge=" + pkce["code_challenge"] + "&"
            + "code_challenge_method=s256";

        return res.status(200).json({
            pkceKey: key,
            link: url
        });
    }
}
