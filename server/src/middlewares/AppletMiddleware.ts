import express = require('express');
import AppletController from "../controllers/AppletController";
import {Action, ActionType, Reaction, ReactionType} from "../models/Applet";
import {AppAbout, GithubAppletActionsAbout} from "../globals/AppletsGlobal";
import App from "../app";

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

export const checkNewApplet = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let {action_type, action, reactions}: {
        action_type: string,
        action: Action,
        reactions: Reaction[]
    } = req.body;

    const type: ActionType = ActionType[action_type];
    if (type === undefined)
        return res.status(400).json({success: false, error: "Invalid action type !"});
    if (reactions === undefined || reactions.length === undefined)
        return res.status(400).json({success: false, error: "Required reactions !"});
    let applets = {
        action: {
            missing: [], good: []
        },
        reactions: [

        ]
    }
    AppAbout.server.services.forEach((service) => {
        service.actions.forEach((serviceAction) => {
            if (ActionType[serviceAction.type] === type) {
                serviceAction.parameters.forEach((params) => {
                    const {name, type, required}: {name: string, type: string, required: boolean} = params;
                    let p = action.parameters.filter((p) => p['name'] === name)[0];

                    if (p === undefined && required)
                        applets.action.missing.push(name);
                    else
                        applets.action.good.push(p);
                });
            }
        })
        service.reactions.forEach((serviceReaction) => {
            reactions.filter((reaction) => ReactionType[reaction.type] === ReactionType[serviceReaction.type]).forEach((reaction) => {
                let reactionData = {missing: [], good: []};
                serviceReaction.parameters.forEach((params) => {
                    const {name, type, required}: {name: string, type: string, required: boolean} = params;
                    let p = reaction.parameters.filter((p) => p['name'] === name)[0];
                    if (p === undefined && required)
                        reactionData.missing.push(name);
                    else
                        reactionData.good.push(p);
                });
                applets.reactions.push(reactionData);
            });
        })
    })
    if (applets.action.missing.length !== 0)
        return res.status(400).json({success: false, error: `Missing parameters '${applets.action.missing}' for action '${action_type}'`})

   if (applets.reactions.filter((reaction) => reaction['missing'].length > 0).length > 0)
       return res.status(400).json({success: false, error: `Missing parameters for reactions !`})

    req['applet'] = applets;
    next();
}
