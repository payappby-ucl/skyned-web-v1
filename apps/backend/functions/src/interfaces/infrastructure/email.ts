import { SendMailOptions } from "nodemailer";

/** Template for sending email */
export interface IEmailTemplate {
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
