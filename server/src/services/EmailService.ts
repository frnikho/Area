import nodemailer = require('nodemailer');

export default class EmailService {

    private static transporter: nodemailer.Transporter = null;

    private static init(): void {
        EmailService.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP_HOST,
            port: 465,
            auth: {
                user: process.env.EMAIL_SMTP_USER,
                pass: process.env.EMAIL_SMTP_PASSWORD,
            },
            secure: true
        });
    }

    public static getTransporter(): nodemailer.Transporter {
        if (EmailService.transporter === null)
            EmailService.init();
        return EmailService.transporter;
    }

}
