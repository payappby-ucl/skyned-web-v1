import { StatusCodes } from "http-status-codes";
import { email, IEmail } from "../../../infrastructure";
import { SkynedUtils } from "../../../utils";
import { IEmailService } from "./interface";
import { render } from "@react-email/components";
import VerifyEmail from "./templates/verify-email";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";

export * from "./interface";

interface Dependencies {
  emailServer: IEmail;
}
export class EmailService implements IEmailService {
  private static instance: IEmailService | null = null;
  private constructor(private emailServer: IEmail) {}
  static factory({ emailServer }: Dependencies) {
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
      default:
        throw SkynedUtils.createException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Please pass in a type for email template",
        );
    }
  }

  send: IEmailService["send"] = async (data) => {
    const { template, ...rest } = data;
    const html = await this.getTemplate(template);
    await this.emailServer.send({
      ...rest,
      html,
    });
  };
}

export const emailService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.EMAIL_SERVICE,
  () =>
    EmailService.factory({
      emailServer: email,
    }),
);
