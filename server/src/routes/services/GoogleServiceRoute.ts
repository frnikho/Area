import Route from "../../Route";
import GoogleService from "../../services/external/GoogleService";
import ServiceAuthRoute from "./ServiceAuthRoute";
import ContextController from "../../controllers/ContextController";
import {Services} from "../../models/Services";
import express = require('express');

export default class GoogleServiceRoute extends Route {

    constructor() {
        super();
        this.router.get('/link', this.getLink);
        this.router.get('/callback', this.callback);
        this.router.post('/watchGmail', this.watchGmail);
    }

    public getLink(req: express.Request, res: express.Response) {
        return res.status(200).json({url: GoogleService.getAuthorizeUrl()});
    }

    public watchGmail(req: express.Request, res: express.Response) {
        const {user_uuid, context_uuid} = req.query;
        new ContextController().getContextByUuid(user_uuid as string, Services.GOOGLE, context_uuid as string, ((context, error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            GoogleService.getUser(context.tokenData.token['access_token'], data => {
                GoogleService.sendWatchGmail(context.tokenData.token['access_token'], data['email'], (successData, error) => {
                    const result = Object.assign({}, successData, data);
                    return res.status(200).json(result);
                })
            }, msg => {
                return res.status(400).json({success: false, message: msg});
            });
        }));
    }

    public callback(req: express.Request, res: express.Response) {
        const {code} = req.query;
        GoogleService.getOAuth2ClientOfflineToken(code as string, (tokenData, error) => {
            if (error)
                return console.error(error);
            GoogleService.getUser(tokenData['tokens']['access_token'], (user) => {
                return res.status(200).json(ServiceAuthRoute.token(Object.assign({}, tokenData['tokens'], user)));
            }, (userError) => {
                return res.status(400).json({success: false, message: userError});
            })
        });
    }

}
