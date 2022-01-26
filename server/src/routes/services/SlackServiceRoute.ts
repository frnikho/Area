import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";
import ServiceAuthRoute from "./ServiceAuthRoute"
import SlackService from "../../services/external/SlackService";
import {Services} from "../../models/Services"
import ServiceController, { TokenData } from "../../controllers/ServiceController";
import SlackBot from "../../bots/SlackBot"

export default class SlackServiceRoute extends Route {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.router.get('/callback', authorization, this.callback);
        this.router.get('/list', authorization, this.list);
        this.router.get('/', this.login);
    }

    /**
     * Callback Route: allow us to have an access token thanks to the redirect uri
     *
     * @param req - code - given by redirect uri
     * @param res
     */
    private callback(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;

        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', process.env.SLACK_SERVICES_CLIENT_ID);
        params.append('client_secret', process.env.SLACK_SERVICES_CLIENT_SECRET);

        new ServiceAuthRoute().getRequest("https://slack.com/api/oauth.v2.access", params, req['user']['uuid'], Services.SLACK.valueOf(), (token) => {
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
        return res.redirect("https://slack.com/oauth/v2/authorize?"
        + "client_id=" + process.env.SLACK_SERVICES_CLIENT_ID + "&"
        + "scope=channels:read,chat:write,chat:write.public,groups:read,im:read,mpim:read&"
        + "user_scope=");
    }

    /**
     * List Route: List all channels of team
     * @param req - key -> key is associated to a service token
     * @param res
     * @returns
     */
    private list(req: express.Request, res: express.Response) {
        const key: string = req.query['key'] as string;

        try {
            new ServiceController().getTokenByKeyAndService(req['user']['uuid'],  Services.SLACK.valueOf(), key, (token) => {
                if (token === undefined)
                    return res.status(400).json({success: false, error: "Error during query."});
                new SlackService().ListChannelsOfTeam(new SlackBot((<TokenData>token).token["access_token"]), (allChannels) => {
                    return res.status(200).json({success: true, channels: allChannels});
                }, (err) => {
                    return res.status(400).json({success: false, error: err});
                });
            }, (err) => {
                return res.status(400).json({success: false, error: err});
            });
        } catch (err) {
            return res.status(400).json({success: false, error: err});
        }
    }
}
