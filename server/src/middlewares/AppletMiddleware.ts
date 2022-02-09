import express = require('express');
import AppletController from "../controllers/AppletController";
import {Action, ActionType, Applet, Reaction, ReactionType} from "../models/Applet";
import {AppAbout, GithubAppletActionsAbout} from "../globals/AppletsGlobal";
import App from "../App";

/**
 * Get applet with the uuid of applet in the request body {uuid: string}
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 */
export const parseAppletBody = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {appletUuid} = req.body;
    parse(appletUuid, req, res, next);
}

/**
 * Get applet with the uuid of applet in the request params '/:appletUuid'
 * @param req express.Request
 * @param res express.Response
 * @param next express.NextFunction
 */
export const parseAppletParams = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {appletUuid} = req.params;
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
    const {action_type, action, reactions, action_key}: {
        action_type: string,
        action: Action,
        reactions: Reaction[],
        action_key: string,
    } = req.body;

    const type: ActionType = ActionType[action_type];
    if (action_key === undefined)
        return res.status(400).json({success: false, error: "Required action key !"});
    if (type === undefined)
        return res.status(400).json({success: false, error: "Invalid action type !"});
    if (reactions === undefined || reactions.length === undefined)
        return res.status(400).json({success: false, error: "Required reactions !"});
    const applets = {
        action: {
            missing: [], good: []
        },
        reactions: [

        ]
    }
    AppAbout.server.services.forEach((service) => {
        service.actions.forEach((serviceAction) => {
            if (serviceAction.type === ActionType[type]) {
                serviceAction.parameters.forEach((params) => {
                    const {name, required}: {name: string, type: string, required: boolean} = params;
                    const p = action.parameters.filter((par) => par['name'] === name)[0];

                    if (p === undefined) {
                        if (required)
                            applets.action.missing.push(name);
                        else
                            applets.action.good.push(p);
                    } else {
                        applets.action.good.push(p);
                    }
                });
            }
        })
        service.reactions.forEach((serviceReaction) => {
            reactions.filter((reaction) => ReactionType[reaction.type] === ReactionType[serviceReaction.type]).forEach((reaction) => {
                const reactionData = {type: reaction.type, token_key: reaction.token_key, missing: [], good: []};
                serviceReaction.parameters.forEach((params) => {
                    const {name, required}: {name: string, type: string, required: boolean} = params;
                    const p = reaction.parameters.filter((par) => par['name'] === name)[0];
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

    const applet: Applet = {
        action_type: type,
        action: {
            parameters: applets.action.good,
        },
        action_key,
        reactions: applets.reactions.map((reaction) => {
            return {
                type: reaction['type'],
                token_key: reaction['token_key'],
                parameters: reaction['good'],
            }
        }),
        user_uuid: req['user']['uuid']
    }
    req['applet'] = applet;
    next();
}
