import type { Attachment, Transporter } from "nodemailer";
import nodemailer from "nodemailer";

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}



export class EmailService {
    private transporter: Transporter;


    constructor(    
        private mailerService: string,
        private mailerEmail: string,
        private mailerPassword: string,
        private readonly postToProvider: boolean = true // Útil para desactivar envíos reales en testing

    ){
        this.transporter = nodemailer.createTransport({
            service: this.mailerService,
            auth: {
                user: this.mailerEmail,
                pass: this.mailerPassword,
            }
        })
    }




    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            if (!this.postToProvider) return true;

            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            return true;
        } catch (error) {
            console.error('Error enviando email:', error);
            return false;
        }
    }
}