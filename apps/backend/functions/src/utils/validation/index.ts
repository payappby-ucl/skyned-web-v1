/* eslint-disable operator-linebreak */
import { RegisterSchema } from "@workspace/shared";
import { RegistryKeysEnum } from "../../enum";
import { IValidationUtility } from "../../interfaces";
import SkynedRegistry from "../../registry";
import { SkynedUtils } from "../helpers";
import { StatusCodes } from "http-status-codes";
/**
 * Concrete implementation for IValidation interface using zod
 */

export class ValidationUtility implements IValidationUtility {
  private static instance: IValidationUtility | null = null;
  private constructor() {
    // * Private
  }

  /** Creates the instance */

  static factory() {
    if (!ValidationUtility.instance) {
      ValidationUtility.instance = new ValidationUtility();
    }

    return ValidationUtility.instance;
  }

  validateEmail: IValidationUtility["validateEmail"] = ({
    email,
    errorType = "server",
    message,
  }) => {
    const schema = RegisterSchema.safeParse({ email });

    if (!schema.success) {
      const error = {
        statusCode:
          errorType === "server"
            ? StatusCodes.INTERNAL_SERVER_ERROR
            : StatusCodes.BAD_REQUEST,
        message: message
          ? message
          : errorType === "server"
            ? "Email is not defined or invalid"
            : "Invalid input",
      };

      throw SkynedUtils.createException(error.statusCode, error.message);
    }
  };

  validateTokenId: IValidationUtility["validateTokenId"] = (tokenId) => {
    if (!tokenId || tokenId === "" || typeof tokenId !== "string") {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "tokenId is undefined or not a string",
      );
    }
  };
}

/** validation utility instance */
export const validationUtility = SkynedRegistry.getSingleton(
  RegistryKeysEnum.VALIDATION_UTILITY,
  ValidationUtility.factory,
);
