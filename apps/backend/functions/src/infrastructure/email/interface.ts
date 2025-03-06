interface IEmailTemplate {
  to: string[];
  subject: string;
  html: string;
}

export interface IEmail {
  send(data: IEmailTemplate): Promise<void>;
}
