import express = require('express');
import randomstring = require('randomstring');
import {Context} from "../models/Context";
import ContextController from "../controllers/ContextController";
import {User} from "../models/User";
import {Services} from "../models/Services";

const sendError = (res: express.Response, message: string) => {
    return res.status(400).json({success: false, message: message});
}

export const checkContextCreation = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.body === undefined)
        return sendError(res, "Required context body for creation !");
    const {title, description, token_data, service} = req.body;
    if (title === undefined || description === undefined || token_data === undefined || service === undefined)
        return sendError(res, "missing parameters ! (required: title, description, token_data, service)");
    req['context'] = {
        description,
        title,
        tokenData: token_data,
        created_date: new Date(),
        uuid: randomstring.generate(),
        updated_date: new Date(),
    } as Context;
    req['service'] = service as string;
    next();
}

export const checkContextRead = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {key, service} = req.query;
    const user: User = req['user'];
    if (key === undefined || service === undefined)
        return sendError(res, "Required 'key' and 'service' query parameters !");

    new ContextController().getContextByUuid(user.uuid, Services[(service as string).toUpperCase()], key as string, (context) => {
        req['context'] = context;
        next();
    })
}

export const checkContextReadAll = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {service} = req.query;
    if (service === undefined)
        return sendError(res, "Required 'service' query parameters !");
    req['service'] = service;
    next();
}

export const checkContextDelete = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {key, service} = req.query;
    req['contextUuid'] = key;
    req['service'] = Services[service as string];
    next();
}

export const checkContextUpdate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {key, service, context} = req.query;
    const user: User = req['user'];
    if (key === undefined || service === undefined)
        return sendError(res, "Required 'key' and 'service' query parameters !");
}
