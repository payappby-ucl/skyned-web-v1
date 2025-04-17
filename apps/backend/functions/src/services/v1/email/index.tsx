/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import { email } from "../../../infrastructure";
import { SkynedUtils } from "../../../utils";
import { render } from "@react-email/components";
import { AdminAccountCreation, VerifyEmail } from "./templates";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";
import { IEmail, IEmailService } from "../../../interfaces";

export * from "./templates";

/** Dependencies needed to instantiate {@link EmailService} */

export interface EmailServiceDependencies {
  emailServer: IEmail;
}

/**
 * Email Service Class
 *
 * @class
 */

export class EmailService implements IEmailService {
  private static instance: IEmailService | null = null;
  private constructor(private emailServer: IEmail) {}

  /**
   * Instantiate the email service
   *
   * @param {Dependencies} dependencies
   * @returns The Email Service instance
   */

  static factory({ emailServer }: EmailServiceDependencies) {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService(emailServer);
    }

    return EmailService.instance;
  }

  private async getTemplate({
    type,
    data,
  }: Parameters<IEmailService["send"]>["0"]["template"]) {
    switch (type) {
      case "verify":
        return await render(<VerifyEmail {...data} />);
      case "create-admin-account":
        return await render(<AdminAccountCreation {...data} />);
      default:
        throw SkynedUtils.createException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Please pass in a type for email template",
        );
    }
  }

  /**
   * Selects email templates and format data needed before sending to the email infrastructure responsible for sending mails
   */

  send: IEmailService["send"] = async (data) => {
    const { template, ...rest } = data;
    const html = await this.getTemplate(template);
    await this.emailServer.send({
      ...rest,
      html,
    });
  };
}

/**
 * Initializes the email service
 */
export const emailService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.EMAIL_SERVICE,
  () =>
    EmailService.factory({
      emailServer: email,
    }),
);
