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
        this.router.get('/channels-list', authorization, this.channelsList);
        this.router.get('/', this.login);
    }

    /**
     * @openapi
     * /services/slack/callback:
     *   get:
     *     tags:
     *       - Services
     *     description: Slack Service OAuth
     *     parameters:
     *       - in: path
     *         name: code
     *         schema:
     *           type: string
     *         description: Code given by Slack OAuth
     *         required: true
     *     responses:
     *       200:
     *         description: Successful login
     *       400:
     *         description: Error while login
     */
    private callback(req: express.Request, res: express.Response) {
        const code: string = req.query['code'] as string;

        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', process.env.SLACK_SERVICES_CLIENT_ID);
        params.append('client_secret', process.env.SLACK_SERVICES_CLIENT_SECRET);

        new ServiceAuthRoute().getRequest("https://slack.com/api/oauth.v2.access", params, (token) => {
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
        return res.redirect("https://slack.com/oauth/v2/authorize?"
        + "client_id=" + process.env.SLACK_SERVICES_CLIENT_ID + "&"
        + "scope=channels:read,chat:write,chat:write.public,groups:read,im:read,mpim:read&"
        + "user_scope=");
    }

    /**
     * @openapi
     * /services/slack/channels-list:
     *   get:
     *     tags:
     *       - Services
     *     description: List all team channels of user's
     *     parameters:
     *       - in: path
     *         name: key
     *         schema:
     *           type: string
     *         description: Key of access_token
     *         required: true
     *     responses:
     *       200:
     *         description: Successful login
     *       400:
     *         description: Error while login
     */
    private channelsList(req: express.Request, res: express.Response) {
        const key: string = req.query['key'] as string;

        try {
            new ServiceController().getTokenByKeyAndService(req['user']['uuid'],  Services.SLACK.valueOf(), key, (token) => {
                if (token === undefined)
                    return res.status(400).json({success: false, error: "Error during query."});
                new SlackService().ListChannelsOfTeam(new SlackBot((token as TokenData).token["access_token"]), (allChannels) => {
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
