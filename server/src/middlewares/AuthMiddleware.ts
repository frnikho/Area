import express = require('express');
import JWTService from "../services/JWTService";
import UserController from "../controllers/UserController";

const sendUnauthorizedRequest = (req: express.Request, res: express.Response): void => {
    res.status(401).json({error: 'You need to be logged !'});
}

export const authorization = (req: express.Request, res: express.Response, next: express.NextFunction)  => {
    let token = req.header('authorization');
    if (token === undefined || token.length === 0)
        return sendUnauthorizedRequest(req, res);
    token = token.substring(7, token.length);
    if (!token)
        return sendUnauthorizedRequest(req, res);
    try {
        const data = JWTService.verify(token);
        new UserController().getByUuid(data['uuid'], (user) => {
            if (!user)
                return sendUnauthorizedRequest(req, res);
            req['user'] = {
                uuid: user.uuid,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            };
            next();
        });
    } catch (ex) {
        return sendUnauthorizedRequest(req, res);
    }
}
