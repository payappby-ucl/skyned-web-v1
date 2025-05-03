/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import * as admin from "firebase-admin";
import { Exception } from "../../lib";
import { env } from "../../config";
import { applicationDefault } from "firebase-admin/app";

/**
 * Utility Class
 *
 * @class
 */
export class SkynedUtils {
  private constructor() {
    // * Private
  }

  /**
   * Get the environment in which the code is runing
   */

  static isEnvironment(environmentNames: ("test" | "dev")[]) {
    if (environmentNames.includes(env.environment as any)) return true;
    return false;
  }

  /** Restructure to true */

  static select<T extends object, Key extends keyof T>(data: Key[]) {
    return data.reduce(
      (cum, curr) => {
        cum[curr] = true;
        return cum;
      },
      {} as Record<Key, true>,
    );
  }

  /**
   * Creates a custom exception/error type used across all parts of the app
   */

  static createException(statusCode: StatusCodes, message?: string) {
    if (!statusCode) {
      throw new Exception(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Status code is not defined.",
      );
    }
    return new Exception(statusCode, message);
  }

  /**
   * Filters an return object containing keys found in provided values array
   *
   * @template T
   * @param {T} data - The object to filter
   */

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

  /**
   * Filters an return object omitting keys found in provided values array
   *
   * @template T
   * @param {T} data - The object to filter
   */

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

  /**
   * Initializes the Firebase app on the admin
   */
  static initializeFirebaseApp() {
    if (!admin.apps.length) {
      if (env.environment === "test" || process.env.LOCAL === "local") {
        admin.initializeApp({
          credential: applicationDefault(),
          projectId: "skyned-test-31a2e",
          storageBucket: "skyned-test-31a2e.firebasestorage.app",
        });

        if (env.environment === "test") {
          process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
          process.env.FIREBASE_STORAGE_EMULATOR_HOST = "127.0.0.1:9199";
        }
      } else {
        admin.initializeApp();
      }
    }
  }
}
