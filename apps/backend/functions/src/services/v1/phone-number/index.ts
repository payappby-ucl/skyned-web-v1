import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { IPhoneNumberService, IValidationUtility } from "../../../interfaces";
import { ContactUsSchema } from "@workspace/shared";
import { SkynedUtils, validationUtility } from "../../../utils";
import { StatusCodes } from "http-status-codes";
import SkynedRegistry from "../../../registry";
import { RegistryKeysEnum } from "../../../enum";

/**
 * Represents dependencies needed to instantiate
 * concrete implementation of {IPhoneNumberService}
 */
export interface PhoneNumberServiceDependencies {
  validationUtility: IValidationUtility;
}

/**
 * Concrete implementation of {IPhoneNumberService} using libphonenumber-js
 */

export class PhoneNumberService implements IPhoneNumberService {
  private static instance: IPhoneNumberService | null = null;

  private constructor(private readonly validationUtility: IValidationUtility) {
    // * Private
  }

  static factory({ validationUtility }: PhoneNumberServiceDependencies) {
    if (!PhoneNumberService.instance) {
      PhoneNumberService.instance = new PhoneNumberService(validationUtility);
    }

    return PhoneNumberService.instance;
  }

  isValidPhoneNumber: IPhoneNumberService["isValidPhoneNumber"] = (
    phoneNumber,
  ) => {
    this.validationUtility.validateInput({
      schema: ContactUsSchema.pick({
        phoneNumber: true,
      }),
      inputData: {
        phoneNumber,
      },
    });
    return isValidPhoneNumber(phoneNumber);
  };

  formatPhoneNumber: IPhoneNumberService["formatPhoneNumber"] = (
    phoneNumber,
  ) => {
    if (!this.isValidPhoneNumber(phoneNumber)) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Invalid phone number",
      );
    }
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);

    if (!parsedPhoneNumber) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Invalid phone number",
      );
    }

    const response: ReturnType<IPhoneNumberService["formatPhoneNumber"]> = {
      nationalNumber: parsedPhoneNumber.nationalNumber,
      number: parsedPhoneNumber.number,
      countryCallingCode: parsedPhoneNumber.countryCallingCode,
    };

    if (parsedPhoneNumber.country) {
      response.country = parsedPhoneNumber.country;
    }

    return response;
  };
}

export const phoneNumberService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.PHONE_NUMBER_SERVICE,
  () =>
    PhoneNumberService.factory({
      validationUtility: validationUtility,
    }),
);
