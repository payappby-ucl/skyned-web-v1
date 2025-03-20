import { IEmail } from "../infrastructure";

/**
 * Interface for email verification template
 */
export interface IVerifyEmail {
  type: "verify";
  data: {
    tokenId: string;
  };
}

type TemplateDataType = IVerifyEmail;

/**
 * Email Service interface
 */
export interface IEmailService {
  /**
   * Responsible for sending emails
   *
   * @param data
   */
  send(
    data: Omit<Parameters<IEmail["send"]>["0"], "html"> & {
      template: TemplateDataType;
    },
  ): Promise<void>;
}
