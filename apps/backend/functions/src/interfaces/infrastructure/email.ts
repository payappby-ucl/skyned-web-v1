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
  attachments?: {
    /** File name including file extension eg (invoice.pdf) */
    filename: string;
    /** Base64 string */
    content: string;
    /** Content type should always be "text/plain" */
    contentType: "text/plain";
    /** Encoding should always be base64 */
    encoding: "base64";
  }[];
}

/** Email infrastructure interface */
export interface IEmail {
  /** For sending the email */
  send(data: IEmailTemplate): Promise<void>;
}
