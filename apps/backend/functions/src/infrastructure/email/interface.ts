import { SendMailOptions } from "nodemailer";

interface IEmailTemplate {
  to: string[];
  subject: string;
  html: string;
  attachments?: SendMailOptions["attachments"];
}

export interface IEmail {
  send(data: IEmailTemplate): Promise<void>;
}
