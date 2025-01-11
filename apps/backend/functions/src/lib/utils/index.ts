import { StatusCodes } from "http-status-codes";
import { Exception } from "..";

export class SkynedUtils {
  private constructor() {
    // * Private
  }

  static createException(statusCode: StatusCodes, message?: string) {
    if (!statusCode) {
      throw new Exception(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Status code is not defined.",
      );
    }
    return new Exception(statusCode, message);
  }

  static pick<T extends object, Key extends keyof T>(data: T, values: Key[]) {
    if (!data || !values) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Cannot receive undefined as parameters.",
      );
    }

    if (!values.length) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Filter array cannot be empty.",
      );
    }

    const entries = Object.entries(data) as [Key, T[Key]][];
    if (!entries.length) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Data must have at least one field",
      );
    }

    const filteredEntries = entries.filter(([key]) => values.includes(key));

    return Object.fromEntries(filteredEntries) as Pick<T, Key>;
  }

  static exclude<T extends object, Key extends keyof T>(
    data: T,
    values: Key[],
  ) {
    if (!data || !values) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Cannot receive undefined as parameters.",
      );
    }

    if (!values.length) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Filter array cannot be empty.",
      );
    }

    const entries = Object.entries(data) as [Key, T[Key]][];
    if (!entries.length) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Data must have at least one field",
      );
    }

    const filteredEntries = entries.filter(([key]) => !values.includes(key));

    return Object.fromEntries(filteredEntries) as unknown as Omit<T, Key>;
  }
}
