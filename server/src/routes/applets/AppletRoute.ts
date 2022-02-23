import express = require('express');
import Route from "../../Route";
import {authorization} from "../../middlewares/AuthMiddleware";
import AppletController from "../../controllers/AppletController";
import {checkNewApplet, parseAppletBody, parseAppletParams} from "../../middlewares/AppletMiddleware";
import {ActionType, Applet, ReactionType} from "../../models/Applet";

/**
 * @openapi
 * components:
 *   schemas:
 *     AppletBodyUuid:
 *       type: object
 *       properties:
 *         appletUuid:
 *           type: string
 *           required: true
 *       required: true
 *
 */

export default class AppletRoute extends Route {

    constructor() {
        super();
        this.router.get('/all', authorization, this.getAll) // GOOD
        this.router.get('/:appletUuid', authorization, parseAppletParams, this.get); // GOOD
        this.router.delete('/:appletUuid', authorization, parseAppletParams, this.delete); // GOOD
        this.router.post('/toggle', parseAppletBody, authorization, this.toggle); // GOOD
        this.router.post('/enable', parseAppletBody, authorization, this.enable); // GOOD
        this.router.post('/disable', parseAppletBody, authorization, this.disable); // GOOD
        this.router.post('/', authorization, checkNewApplet, this.create); // GOOD
        this.router.patch('/', parseAppletBody, authorization, this.update); // TODO
    }

    /**
     * @openapi
     * /applets/all:
     *   get:
     *     tags:
     *       - Applets
     *     description: Get all user's applets
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error while getting applets
     *       401:
     *         description: Unauthorized
     *
     */
    private getAll(req: express.Request, res: express.Response) {
        new AppletController().getAppletsByUserUuid(req['user']['uuid'], (applets) => {
            return res.status(200).json({success: true, data: applets});
        }, (err) => res.status(400).json({success: false, error: err}));
    }

    /**
     * @openapi
     * /applets/{appletId}:
     *   get:
     *     tags:
     *       - Applets
     *     description: Get a user applet with specific applet id
     *     parameters:
     *         - in: path
     *           name: appletId
     *           schema:
     *             type: string
     *           required: true
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    private get(req: express.Request, res: express.Response) {
        const applet: Applet = req['applet'];
        return res.status(200).json(applet[0]);
    }

    private create(req: express.Request, res: express.Response) {
        new AppletController().registerApplets(req['applet'], req['user']['uuid'],(applet) => {
            return res.status(200).json({success: true, applet});
        }, (err) => {
            return res.status(400).json({success: false, error: err})
        });
    }

    /**
     * @openapi
     * /applets/{appletId}:
     *   delete:
     *     tags:
     *       - Applets
     *     description: Delete a user applet with specific applet id
     *     parameters:
     *         - in: path
     *           name: appletId
     *           schema:
     *             type: string
     *           required: true
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    private delete(req: express.Request, res: express.Response) {
        new AppletController().deleteApplet(req['applet']['uuid'], (success) => {
            return res.status(200).json({success});
        });
    }

    private update(req: express.Request, res: express.Response) {

    }

    /**
     * @openapi
     * /applets/enable:
     *   post:
     *     tags:
     *       - Applets
     *     description: enable a user applet with specific applet id in body
     *     requestBody:
     *       description: applet body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/AppletBodyUuid'
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    private enable(req: express.Request, res: express.Response) {
        new AppletController().enableAppletByUuid(req['applet']['uuid'], (success) => {
            return res.status(200).json({success});
        });
    }

    /**
     * @openapi
     * /applets/disable:
     *   post:
     *     tags:
     *       - Applets
     *     description: disable a user applet with specific applet id in body
     *     requestBody:
     *       description: applet body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/AppletBodyUuid'
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    private disable(req: express.Request, res: express.Response) {
        new AppletController().disableAppletByUuid(req['applet']['uuid'], (success) => {
            return res.status(200).json({success});
        });
    }


    /**
     * @openapi
     * /applets/toggle:
     *   post:
     *     tags:
     *       - Applets
     *     description: disable a user applet with specific applet id in body
     *     requestBody:
     *       description: applet body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/AppletBodyUuid'
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    private toggle(req: express.Request, res: express.Response) {
        if (req['applet']['enable'] === 1) {
            new AppletController().disableAppletByUuid(req['applet']['uuid'], (success) => {
                return res.status(200).json({success});
            });
        } else {
            new AppletController().enableAppletByUuid(req['applet']['uuid'], (success) => {
                return res.status(200).json({success});
            });
        }
    }

}
