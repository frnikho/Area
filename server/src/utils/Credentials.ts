import {EMAIL_REGEX, PASSWORD_REGEX} from "../globals/AuthGlobal";
import DBService from "../services/DBService";

const emailRegex = new RegExp(EMAIL_REGEX);
const passwordRegex = new RegExp(PASSWORD_REGEX);

export default class Credentials {

    /**
     * Check email syntax and availability before a user registration
     * @param email
     * @param success
     * @param error
     */
    public static verifyEmail(email: string, success: () => void, error: (msg: string) => void): void {
        this.verifyEmailSyntax(email, () => {
            this.verifyEmailAvailability(email, () => {
                success();
            }, error);
        }, error);
    }

    /**
     * Check email syntax with regex
     * @param email
     * @param success
     * @param error
     */
    public static verifyEmailSyntax(email: string, success: () => void, error: (msg: string) => void): void {
        if (!emailRegex.test(email))
            return error("Invalid email format !");
        success();
    }

    /**
     * Verify if user email can be used
     * @param email
     * @param success
     * @param error
     */
    public static verifyEmailAvailability(email: string, success: () => void, error: (msg: string) => void): void {
        //TODO finish the function
        DBService.query(`SELECT email FROM users WHERE email = '${email}'`, (result) => {
           if (result.length >= 1) {
               error('user already exist with this email address !');
           } else {
               success();
           }
        }, error);
    }

    /**
     * Verify password strength and strategy
     * @param password
     * @param success
     * @param error
     */
    public static verifyPasswordStrength(password: string, success: () => void, error: (msg: string) => void): void {
        if (!passwordRegex.test(password))
            return error('Password must contains a least 8 characters and numbers');
        success();
    }

}
