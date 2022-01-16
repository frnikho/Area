import {RegisterBody} from "../routes/auth/RegisterRoute";
import {User} from "../models/User";
import DBService from "../services/DBService";
import uuid = require('uuid');
import EmailService from "../services/EmailService";
import EncryptService from "../services/EncryptService";
import {getGithubUserFirstname, getGithubUserLastname, GithubUser} from "../models/GithubUser";

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

    public login(email: string, password: string, success: (user: User) => void, error: (msg) => void) {
        DBService.query(`SELECT password FROM users WHERE email = '${email}'`, (response) => {
            if (response.length === 0)
                return error('Cannot found user !');
            new EncryptService(password).compare(response[0].password, (same) => {
               if (!same)
                   return error('Invalid password !');
               this.getByEmail(email, (user) => {
                   if (user === undefined)
                       return error('An error occurred ! please try again later ');
                   return success(user);
               })
            });
        }, (err) => {
            return error(err);
        })
    }

    private registerWithGithub(user: GithubUser, success: (context: string, user: User) => void, error: (msg) => void) {
        let firstname = getGithubUserFirstname(user);
        let lastname = getGithubUserLastname(user);
        DBService.queryValues(`INSERT INTO users (uuid, email, password, firstname, lastname, auth_type, verified) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING uuid, email, firstname, lastname, created_date`, [uuid.v4(), user.email, uuid.v4(), firstname, lastname, 'github', '1'], (response) => {
            success('register', response[0]);
        }, (err) => error(err));
    }

    public loginWithGithub(user: GithubUser, success: (context: string, user: User) => void, error: (msg) => void) {
        DBService.query(`SELECT uuid, email, firstname, lastname, auth_type FROM users WHERE email = '${user.email}'`, (result) => {
            if (result.length === 0)
                return error('User not found !');
            success('login', result[0]);
        }, err => error(err));
    }

    public authWithGithub(githubUser: GithubUser, success: (context: string, user: User) => void, error: (msg) => void) {
        this.getByEmail(githubUser.email, (user) => {
            if (user === undefined)
                return this.registerWithGithub(githubUser, success, error);
            if (user.auth_type !== 'github')
                return error('Invalid auth method !');
            return this.loginWithGithub(githubUser, success, error);
        },);
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

    public getByEmail(email: string, result: (user: User | undefined) => void): void {
        DBService.query(`SELECT uuid, email, password, firstname, lastname, auth_type, verified FROM users WHERE email = '${email}'`, (rows) => {
            if (rows.length === 0)
                return result(undefined)
            result(rows[0]);
        }, () => {
            result(undefined);
        })
    }

    public verifyUserEmail(userUuid: string, token: string, success: () => void, error: (msg) => void) {
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
