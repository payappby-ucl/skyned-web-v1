import {
  AdminAccountCreationEmailProps,
  ContactUsEmailTemplateProps,
  FinancialAidNotificationEmailProps,
  LeadCollectionNotificationEmailProps,
} from "../../services";
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

/**
 * Interface for contact us email template
 */
export interface IContactUsEmailProps {
  type: "contact-us";
  data: ContactUsEmailTemplateProps;
}

/** Interface for lead collection */
export interface ILeadCollectionEmailProps {
  type: "lead-collection";
  data: LeadCollectionNotificationEmailProps;
}

/** Interface for financial aid */
export interface IFinancialAidEmailProps {
  type: "financial-aid";
  data: FinancialAidNotificationEmailProps;
}

/** Represents email template type */
export type TemplateDataType =
  | IVerifyEmail
  | IAdminAccountCreationEmailProps
  | IContactUsEmailProps
  | ILeadCollectionEmailProps
  | IFinancialAidEmailProps;

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
