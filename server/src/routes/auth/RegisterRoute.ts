import Route from "../../Route";
import express = require('express');
import Credentials from "../../utils/Credentials";
import UserController from "../../controllers/UserController";

export interface RegisterBody {
    email: string,
    password: string,
    firstname: string,
    lastname: string
}

export default class RegisterRoute extends Route {

    constructor() {
        super();
        this.router.post('/', this.checkBodyParameters, this.post);
    }

    /**
     * Verify body request
     *
     * @param req
     * @param res
     * @param next - If body is correct, program continue to this.post
     * @returns
     */
    private checkBodyParameters(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const body: RegisterBody = req.body;
        Credentials.verifyEmail(body.email, () => {
            Credentials.verifyPasswordStrength(body.password, () => {
                req['registerBody'] = body;
               next();
            }, (msg) => {
                res.status(400).json({success: false, error: msg});
            });
        }, (msg) => {
            res.status(400).json({success: false, error: msg});
        });
    }

    /**
     * @openapi
     * /auth/register:
     *   post:
     *     tags:
     *       - Authentication
     *     description: Register
     *     consumes:
     *       - application/x-www-form-urlencoded
     *     parameters:
     *      - name: email
     *        type: string
     *        required: true
     *      - name: password
     *        type: string
     *        required: true
     *      - name: lastname
     *        type: string
     *        required: true
     *      - name: firstname
     *        type: string
     *        required: true
     *     responses:
     *       200:
     *         description: Successful registration
     *       400:
     *         description: Error while registering
     */
    private post(req: express.Request, res: express.Response): void {
        const body: RegisterBody = req['registerBody'];
        new UserController().register(body, (user) => {
            res.status(200).json({success: true, user});
        }, (msg) => {
            res.status(400).json({success: false, error: msg});
        });
    }

}
