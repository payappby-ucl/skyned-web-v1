/* eslint-disable operator-linebreak */
import { RegistryKeysEnum } from "../../enum";
import { IValidationUtility } from "../../interfaces";
import SkynedRegistry from "../../registry";
import { SkynedUtils } from "../helpers";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
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

  /** Validates an input */

  validateInput: IValidationUtility["validateInput"] = ({
    schema,
    inputData,
    message,
    errorType,
  }) => {
    const { success, data, error: zodError } = schema.safeParse(inputData);

    if (!success) {
      const statusCode =
        !errorType || errorType === "server"
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.BAD_REQUEST;

      const error = {
        statusCode,
        message:
          !errorType || errorType === "server"
            ? message || JSON.stringify(zodError.flatten())
            : message || getReasonPhrase(statusCode),
      };

      throw SkynedUtils.createException(error.statusCode, error.message);
    }

    return data;
  };
}

/** validation utility instance */
export const validationUtility = SkynedRegistry.getSingleton(
  RegistryKeysEnum.VALIDATION_UTILITY,
  ValidationUtility.factory,
);
