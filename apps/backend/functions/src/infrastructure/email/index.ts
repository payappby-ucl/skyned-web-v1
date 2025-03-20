import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import * as key from "./key.json";
import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import { SkynedUtils } from "../../utils";
import { IEmail } from "../../interfaces";

/**
 * Infrastructure setup for sending email
 *
 * @class
 */

class Email implements IEmail {
  private static instance: IEmail | null = null;
  private constructor() {
    // * Private
  }

  /**
   * Matehod to create the email infrastructure instance
   */

  static factory() {
    if (!Email.instance) {
      Email.instance = new Email();
    }

    return Email.instance;
  }

  private createTransporter(sendingEmail: string) {
    if (!sendingEmail) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Sending email is undefined for creating transporter",
      );
    }

    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: sendingEmail,
        serviceClient: key.client_id,
        privateKey: key.private_key,
      },
    });
  }

  /**
   * Method to send the email
   */

  send: IEmail["send"] = async (data) => {
    if (!data || !Object.keys(data).length) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Invalid data format for sending email",
      );
    }

    const email = "admissions@skynedconsults.com";

    const transporter = this.createTransporter(email);
    const isTransporterVerified = await transporter.verify();
    if (!isTransporterVerified) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unable to verify transporter",
      );
    }

    const { to, subject, html, attachments } = data;
    await transporter.sendMail({
      from: `Skyned Consults <${email}>`,
      to,
      subject,
      html,
      attachments: attachments?.length ? attachments : undefined,
    });
  };
}

/** Email infrastructure instance */
export const email = SkynedRegistry.getSingleton(
  RegistryKeysEnum.EMAIL,
  Email.factory,
);
