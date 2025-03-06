import { StatusCodes } from "http-status-codes";
import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import { SkynedUtils } from "../../utils";
import { IEmail } from "./interface";

export * from "./interface";
class Email implements IEmail {
  private static instance: IEmail | null = null;
  private constructor() {
    // * Private
  }
  static factory() {
    if (!Email.instance) {
      Email.instance = new Email();
    }

    return Email.instance;
  }

  send: IEmail["send"] = async (data) => {
    if (!data || !Object.keys(data).length) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Invalid data format for sending email",
      );
    }

    console.log("Email");
  };
}

export const email = SkynedRegistry.getSingleton(
  RegistryKeysEnum.EMAIL,
  Email.factory,
);
