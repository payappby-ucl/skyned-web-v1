/* eslint-disable operator-linebreak */
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import * as key from "./key.json";
import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import {
  PROHIBITED_USER_EMAIL_DOMAINS,
  SkynedUtils,
  validationUtility,
} from "../../utils";
import { IEmail, IValidationUtility } from "../../interfaces";
import { env } from "../../config";
import { CommonSchema } from "@workspace/shared";
import { emailTemplateSchema } from "./schema";

/** Dependencies needed to create email infrastructure instance */
export interface EmailDependencies {
  /** for input validation */
  validationUtility: IValidationUtility;
}
/**
 * Infrastructure setup for sending email
 *
 * @class
 */

class Email implements IEmail {
  private static instance: IEmail | null = null;
  private constructor(private readonly validationUtility: IValidationUtility) {}

  /**
   * Method to create the email infrastructure instance
   */

  static factory({ validationUtility }: EmailDependencies) {
    if (!Email.instance) {
      Email.instance = new Email(validationUtility);
    }

    return Email.instance;
  }

  private createTransporter(sendingEmail: string) {
    const { email } = this.validationUtility.validateInput({
      schema: CommonSchema.pick({ email: true }),
      inputData: {
        email: sendingEmail,
        message:
          "Sending email is undefined or not valid for creating transporter",
      },
    });

    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: email,
        serviceClient: key.client_id,
        privateKey: key.private_key,
      },
    });
  }

  /**
   * Method to send the email
   */

  send: IEmail["send"] = async (data) => {
    data = this.validationUtility.validateInput({
      schema: emailTemplateSchema,
      inputData: data,
      message: "Invalid data format for sending email",
    });

    const senderEmail = data.from.email;
    const sender = env.environment
      ? `Skyned Consults Test Account <${senderEmail}>`
      : `${data.from.name || "Skyned Consults"} <${data.from.email}>`;

    const transporter = this.createTransporter(senderEmail);
    const isTransporterVerified = await transporter.verify();
    if (!isTransporterVerified) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unable to verify transporter",
      );
    }

    const { to, subject, html, attachments } = data;
    await transporter.sendMail({
      from: sender,
      to: SkynedUtils.isEnvironment(["dev", "test"])
        ? to.map((email) =>
            PROHIBITED_USER_EMAIL_DOMAINS.some((emailDomain) =>
              email.endsWith(emailDomain),
            )
              ? env.emails.account
              : email,
          )
        : to,
      subject,
      html,
      attachments: attachments?.length ? attachments : undefined,
    });
  };
}

/** Email infrastructure instance */
export const email = SkynedRegistry.getSingleton(RegistryKeysEnum.EMAIL, () =>
  Email.factory({
    validationUtility,
  }),
);
