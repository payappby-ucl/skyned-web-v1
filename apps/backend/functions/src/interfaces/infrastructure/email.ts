import { SendMailOptions } from "nodemailer";

/** Template for sending email */
export interface IEmailTemplate {
  /** Account sending the mail */
  from: {
    email: string;
    name?: string;
  };
  /** Who the email is sent to */
  to: string[];
  /** The subject of the email */
  subject: string;
  /** The email content */
  html: string;
  /** Any attachments */
  attachments?: SendMailOptions["attachments"];
}

/** Email infrastructure interface */
export interface IEmail {
  /** For sending the email */
  send(data: IEmailTemplate): Promise<void>;
}
