import Route from "../../Route";

import express = require('express');
import UserController from "../../controllers/UserController";
import JWTService from "../../services/JWTService";

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Login user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Login Body Request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginBody'
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Error while login
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 *       required: true
 */

export default class LoginRoute extends Route {

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
    private verifyBody(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const {email, password}: {email: string, password: string} = req.body;
        if (email === undefined || password === undefined) {
            res.status(400).json({success: false, error: 'Required email and password body data !'});
            return;
        }
        req['email'] = email;
        req['password'] = password;
        next();
    }

    private post(req: express.Request, res: express.Response): void {
        new UserController().login(req['email'], req['password'], (user) => {
            return res.status(200).json({success: true, token: new JWTService({
                    uuid: user.uuid,
                    email: user.email,
                }).sign()})
        }, (msg) => {
            return res.status(400).json({success: false, error: msg});
        });
    }

}
