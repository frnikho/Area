import Route from "../../Route";
import {authorization} from "../../middlewares/AuthMiddleware";

import express = require('express');
import UserController from "../../controllers/UserController";

/**
 * @openapi
 * components:
 *   schemas:
 *     MePatch:
 *       type: object
 *       properties:
 *         lastname:
 *           type: string
 *           required: false
 *         firstname:
 *           type: string
 *           required: false
 *       required: true
 *
 */

export default class MeRoute extends Route {

    constructor() {
        super();
        this.router.get('/', authorization, this.get);
        this.router.patch('/', authorization, this.patch);
        this.router.delete('/', authorization, this.delete);
    }

    /**
     * @openapi
     * /me:
     *   get:
     *     tags:
     *       - User
     *     description: Get information about logged user
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    private get(req: express.Request, res: express.Response): void {
        res.status(200).json(req['user']);
    }

    /**
     * @openapi
     * /me:
     *   patch:
     *     tags:
     *       - User
     *     description: Update information about logged user
     *     requestBody:
     *       description: /me body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MePatch'
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    private patch(req: express.Request, res: express.Response) {
        const {firstname, lastname} = req.body;
        if (firstname === undefined && lastname === undefined)
            return res.status(400).json({success: false, error: `required 'firstname' or 'lastname' body parameters !`});
        if (firstname !== undefined)
            req['user'].firstname = firstname;
        if (lastname !== undefined)
            req['user'].lastname = lastname;
        new UserController().update(req['user'], () => {
            return res.status(200).json({success: true});
        }, (err) => {
            return res.status(400).json({success: false, error: err});
        })
    }

    /**
     * @openapi
     * /me:
     *   delete:
     *     tags:
     *       - User
     *     description: Delete user
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    private delete(req: express.Request, res:express.Response): void {
        new UserController().delete(req['user'], () => {
            return res.status(200).json({success: true});
        }, (err) => {
            return res.status(400).json({success: false, error: err})
        })
    }
}
