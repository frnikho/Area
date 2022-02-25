import { authorization } from "../../middlewares/AuthMiddleware";
import Route from "../../Route";
import express = require('express');
import ServiceAuthRoute from "./ServiceAuthRoute"

export default class DropboxServiceRoute extends Route {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/', this.login);
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
     *        description: Code given by Dropbox OAuth
     *        required: true
     *     responses:
     *       200:
     *         description: Successful login
     *       400:
     *         description: Error while login
     */
    private callback(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;

        const params = new URLSearchParams();
        params.append("code", code);
        params.append("grant_type", "authorization_code");
        params.append("client_id", process.env.DROPBOX_SERVICES_CLIENT_ID);
        params.append("client_secret", process.env.DROPBOX_SERVICES_CLIENT_SECRET);
        params.append("redirect_uri", process.env.DROPBOX_SERVICES_REDIRECT_URL);

        const headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        };

        new ServiceAuthRoute().postRequest("https://api.dropboxapi.com/oauth2/token", params, headers, (token) => {
            return res.status(200).json({ success: true, token });
        }, (err) => {
            return res.status(400).json({ success: false, error: err });
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
        return res.redirect("https://www.dropbox.com/oauth2/authorize?"
            + "client_id=wehqfyczn14a619" + "&"
            + "response_type=code&"
            + "redirect_uri=https://localhost:8080/services/dropbox/callback&")
    }
}