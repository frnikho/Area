import express = require('express');
import AppletController from "../controllers/AppletController";

/**
 * Get applet with the uuid of applet in the request body {uuid: string}
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 */
export const parseAppletBody = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let {appletUuid} = req.body;
    parse(appletUuid, req, res, next);
}

/**
 * Get applet with the uuid of applet in the request params '/:appletUuid'
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 */
export const parseAppletParams = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let {appletUuid} = req.params;
    parse(appletUuid, req, res, next);
}

const parse = (uuid: string, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (uuid === undefined || uuid === null || uuid.length === 0)
        return res.status(400).json({success: false, error: 'Required appletsUuid body parameters !'})

    return new AppletController().getAppletByUuid(uuid, (applet) => {
        if (applet === undefined || applet === null)
            return res.status(400).json({success: false, error: `Applet with uuid '${uuid}' not found !`});
        req['applet'] = applet;
        next();
    }, (err) => res.status(400).json({success: false, error: err}));
}
