import { customAlphabet, nanoid } from "nanoid";
import { RegistryKeysEnum } from "../../../enum";
import { IIDGeneratorService } from "../../../interfaces";
import SkynedRegistry from "../../../registry";
import { SkynedUtils } from "../../../utils";
import { StatusCodes } from "http-status-codes";

/**
 * Concrete implementation of ID generator interface using nanoid
 *
 * @class
 */
export class IdGeneratorService implements IIDGeneratorService {
  private static instance: IIDGeneratorService | null = null;
  /** Uppercase Alphabets */
  public readonly uppercaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  /** Lowercase Alphabets */
  public readonly lowercaseAlphabets = "abcdefghijklmnopqrstuvwxyz";
  /** numbers */
  public readonly numbers = "0123456789";

  private constructor() {
    // * Private
  }

  /** Creates an instance of IdGenerator service */

  static factory() {
    if (!IdGeneratorService.instance) {
      IdGeneratorService.instance = new IdGeneratorService();
    }

    return IdGeneratorService.instance;
  }

  /**
   * Generates using only alphabets
   */

  alphabets: IIDGeneratorService["alphabets"] = (size) => {
    const id = customAlphabet(
      `${this.uppercaseAlphabets}${this.lowercaseAlphabets}`,
      size,
    )();
    return id;
  };

  /** Generates using only alphabets uppercase */

  alphabetsUpper: IIDGeneratorService["alphabetsUpper"] = (size) => {
    const id = customAlphabet(this.uppercaseAlphabets, size)();
    return id;
  };

  /** Generates using only alphabets lowercase */

  alphabetsLower: IIDGeneratorService["alphabetsLower"] = (size) => {
    const id = customAlphabet(this.lowercaseAlphabets, size)();
    return id;
  };

  /** Generate using only numbers */

  numeric: IIDGeneratorService["numeric"] = (size) => {
    const id = customAlphabet(this.numbers, size)();
    return id;
  };

  /** Generate using only numbers and alphabets */

  alphanumeric: IIDGeneratorService["alphanumeric"] = (size) => {
    const id = customAlphabet(
      `${this.uppercaseAlphabets}${this.lowercaseAlphabets}${this.numbers}`,
      size,
    )();
    return id;
  };

  /** Generate using custom string provided by you */

  custom: IIDGeneratorService["custom"] = (customString, size) => {
    customString = customString.trim();
    if (!customString) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "customString is not defined",
      );
    }
    const id = customAlphabet(customString.normalize(), size)();
    return id;
  };

  /** Generates using random characters */

  id: IIDGeneratorService["id"] = (size) => {
    const id = nanoid(size);
    return id;
  };
}

/** Instance of IdGeneratorService */
export const idGeneratorService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.ID_GENERATOR_SERVICE,
  IdGeneratorService.factory,
);
