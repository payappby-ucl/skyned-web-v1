import { AdminAccountCreationEmailProps } from "../../services";
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

/**
 * Interface for create admin account email template
 */
export interface IAdminAccountCreationEmailProps {
  type: "create-admin-account";
  data: AdminAccountCreationEmailProps;
}

/** Represents email template type */
export type TemplateDataType = IVerifyEmail | IAdminAccountCreationEmailProps;

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
