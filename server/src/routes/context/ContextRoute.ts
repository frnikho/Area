import Route from "../../Route";
import express = require('express');
import {authorization} from "../../middlewares/AuthMiddleware";
import {
    checkContextCreation,
    checkContextDelete,
    checkContextRead, checkContextReadAll,
    checkContextUpdate
} from "../../middlewares/ContextMiddleware";
import {User} from "../../models/User";
import {Context} from "../../models/Context";
import ContextController from "../../controllers/ContextController";
import {Services} from "../../models/Services";

/**
 * @openapi
 * components:
 *   schemas:
 *     ContextBody:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           required: true
 *         description:
 *           type: string
 *           required: true
 *         service:
 *           type: string
 *           required: true
 *         token_data:
 *           type: object
 *           properties:
 *             key:
 *               type: string
 *               required: true
 *             created_at:
 *               type: Date
 *               required: true
 *           required: true
 *       required: true
 *
 */


export class ContextRoute extends Route {

    constructor() {
        super();
        this.router.get('/', authorization, checkContextRead, this.read);
        this.router.patch('/', authorization, checkContextUpdate, this.update);
        this.router.post('/', authorization, checkContextCreation, this.create);
        this.router.delete('/', authorization, checkContextDelete, this.delete);
        this.router.get('/all', authorization, checkContextReadAll, this.readAll);
    }

    /**
     * @openapi
     * /context:
     *   post:
     *     tags:
     *       - Context
     *     description: Create a new context
     *     requestBody:
     *         description: Context body
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ContextBody'
     *     responses:
     *       200:
     *         description: Successful registration
     *       400:
     *         description: Error while registering
     */
    public create(req: express.Request, res: express.Response) {
        const user: User = req['user'];
        const context: Context = req['context'];
        const service: string = req['service'];

        new ContextController().createContext(user.uuid, Services[service.toUpperCase()], context, (resultContext, error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            return res.status(200).json({success: true, context: resultContext, service});
        });
    }

    /**
     * @openapi
     * /context:
     *   get:
     *     parameters:
     *       - in: query
     *         name: service
     *         required: true
     *         schema:
     *           type: string
     *         description: service name
     *       - in: query
     *         name: key
     *         required: true
     *         schema:
     *           type: string
     *         description: context uuid as key
     *     security:
     *       - bearerAuth: []
     *     tags:
     *       - Context
     *     description: Get context
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    public read(req: express.Request, res: express.Response) {
        res.status(200).json(req['context']);
    }

    /**
     * @openapi
     * /context/all:
     *   get:
     *     parameters:
     *       - in: query
     *         name: service
     *         schema:
     *           type: string
     *         description: service filter
     *     security:
     *       - bearerAuth: []
     *     tags:
     *       - Context
     *     description: Get all context
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    public readAll(req: express.Request, res: express.Response) {
        const service: string = req['service'];
        const user: User = req['user'];
        if (service === undefined) {
            new ContextController().getContexts(user.uuid, (contexts) => {
                return res.status(200).json(contexts);
            });
        } else {
            new ContextController().getContextsByService(user.uuid, Services[service.toUpperCase()], (contexts, error) => {
                if (error)
                    return res.status(400).json({success: false, message: error});
                res.status(200).json(contexts);
            });
        }
    }

    /**
     * @openapi
     * /context:
     *   delete:
     *     tags:
     *       - Context
     *     description: Delete context
     *     parameters:
     *       - in: query
     *         name: service
     *         required: true
     *         schema:
     *           type: string
     *         description: service name
     *       - in: query
     *         name: key
     *         required: true
     *         schema:
     *           type: string
     *         description: context uuid as key
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Successful
     *       400:
     *         description: Error
     *       401:
     *         description: Unauthorized
     */
    public delete(req: express.Request, res: express.Response) {
        const contextUuid = req['contextUuid'];
        const service: Services = req['service'];
        const user: User = req['user'];
        new ContextController().deleteContextByUuid(user.uuid, service, contextUuid, (error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            return res.status(200).json({success: true});
        });
    }

    public update(req: express.Request, res: express.Response) {
        const context = req['context'];
        const service: Services = req['service'];
        const user: User = req['user'];
        new ContextController().updateContext(user.uuid, service, context, (contextUpdated, error) => {
            if (error)
                return res.status(400).json({success: false, message: error});
            return res.status(200).json({success: true, context: contextUpdated});
        });
    }

}
