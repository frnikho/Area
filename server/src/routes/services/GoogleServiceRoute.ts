import Route from "../../Route";
import express = require('express');
import GoogleService from "../../services/external/GoogleService";
import ServiceAuthRoute from "./ServiceAuthRoute";

export default class GoogleServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/link', this.getLink);
        this.router.get('/callback', this.callback);
    }

    public getLink(req: express.Request, res: express.Response) {
        return res.status(200).json({url: GoogleService.getAuthorizeUrl()});
    }

    public callback(req: express.Request, res: express.Response) {
        const {code} = req.query;
        GoogleService.getOAuth2ClientOfflineToken(code as string, (tokenData, error) => {
            if (error)
                return console.error(error);

            return res.status(200).json(ServiceAuthRoute.token(tokenData['tokens']));
        });

    }

}
