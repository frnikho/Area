import {RegisterBody} from "../routes/auth/RegisterRoute";
import {User} from "../models/User";
import DBService from "../services/DBService";
import uuid = require('uuid');
import EmailService from "../services/EmailService";
import EncryptService from "../services/EncryptService";

export default class UserController {

    public register(data: RegisterBody, success: (user: User) => void, error: (msg) => void) {
        new EncryptService(data.password).hash((hashedPassword) => {
            if (hashedPassword === undefined)
                return error(`Can't hashed password !`);
            DBService.queryValues(`INSERT INTO users (uuid, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?) RETURNING uuid, email, firstname, lastname, created_date`, [uuid.v4(), data.email, hashedPassword, data.firstname, data.lastname], (result) => {
                this.sendEmailVerification(result[0] as User, (info) => {
                    console.log(info);
                    success(result[0]);
                }, (err) => {
                    error(err);
                });
            }, (err) => {
                error(err);
            })
        });
    }

    public getByUuid(uuid: string, result: (user: User | undefined) => void): void {
        DBService.query(`SELECT uuid, email, password, firstname, lastname FROM users WHERE uuid = '${uuid}'`, (rows) => {
            if (rows.length === 0)
                return result(undefined)
            result(rows[0]);
        }, () => {
            result(undefined);
        })
    }

    public verifyUserEmail(userUuid, token, success: () => void, error: (msg) => void) {
        this.getByUuid(userUuid, (user) => {
            if (user === undefined)
                return error('invalid user uuid !');
            new EncryptService(user.email).compare(token, (same) => {
                if (same) {
                    return DBService.query(`UPDATE users SET verified = 1 WHERE uuid LIKE '${user.uuid}' ESCAPE '#'`, () => {
                        return success();
                    });
                }
                return error('invalid token !');
            })
        })
    }

    public sendEmailVerification(user: User, success: (info?) => void, error: (msg) => void) {
        new EncryptService(user.email).hash((hashedEmail) => {
            const mailData = {
                from: 'nicolas.sansd@gmail.com',
                to: user.email,
                subject: 'Verify your email address',
                text: "",
                html: `<b>Token: ${hashedEmail}</b>`
            }
            EmailService.getTransporter().sendMail(mailData, (err, info) => {
                if (err)
                    return error(err)
                return success(info);
            })
        });
    }

}
