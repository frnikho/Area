import Route from "../../Route";

import express = require('express');
import UserController from "../../controllers/UserController";

export default class VerifyEmailRoute extends Route {

    constructor() {
        super();
        this.router.post('/', this.verifyBody, this.post);
    }

    /**
     * Verify body request
     *
     * @param req
     * @param res
     * @param next - If body is correct, program continue to this.post
     * @returns
     */
    private verifyBody(req: express.Request, res: express.Response, next: express.NextFunction) {
        const {userUuid, token}: {userUuid: string, token: string} = req.body;
        if (userUuid === undefined || token === undefined)
            return res.status(400).json({success: false, error: 'Missing userUuid or token data in body request !'});
        req['uuid'] = userUuid;
        req['token'] = token;
        next();
    }

    /**
     * @openapi
     * /auth/verify:
     *   post:
     *     tags:
     *       - Authentication
     *     description: Verify Email
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     */
    private post(req: express.Request, res: express.Response): void {
        new UserController().verifyUserEmail(req['uuid'], req['token'], () => {
            return res.status(200).json({success: true});
        }, (msg) => {
            return res.status(400).json({success: false, error: msg});
        })
    }

}
