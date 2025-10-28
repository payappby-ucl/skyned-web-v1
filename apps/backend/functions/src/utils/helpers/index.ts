/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import * as admin from "firebase-admin";
import { Exception } from "../../lib";
import { env } from "../../config";
import { applicationDefault } from "firebase-admin/app";
import { ResolveStoragePathType } from "../../types";
import { IObject, IPhoneNumber } from "@workspace/shared";
import { Decimal } from "../../infrastructure/repository/prisma-client/runtime/library";

const decimalKeys = [
  "applicationFee",
  "applicationFeeDiscount",
  "tuitionFee",
  "duration",
  "minimumEligibilityGpa",
  "score",
  "schoolGrowth",
  "programGrowth",
  "faqGrowth",
  "inquiryGrowth",
  "adminGrowth",
  "postGrowth",
  "gpa",
];

const skipKeys = [
  "previousState",
  "currentState",
  "financialAids",
  "eligibilityRequirements",
];

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
          process.env.PUBSUB_EMULATOR_HOST = "127.0.0.1:8085";
        }
      } else if (process.env.LOCAL === "remote") {
        admin.initializeApp({
          credential: applicationDefault(),
          projectId: "skyned-prod",
          storageBucket: "skyned-prod.firebasestorage.app",
        });
      } else {
        admin.initializeApp();
      }
    }
  }

  /** Get ProjectId */

  static getProjectId() {
    if (env.environment === "test" || process.env.LOCAL === "local") {
      return "skyned-test-31a2e";
    }

    return "";
  }

  /** Resolve path for storing objects */

  static resolveStoragePath({ type, data }: ResolveStoragePathType) {
    switch (type) {
      case "primaryImage":
      case "secondaryImage":
        return `users/${data.adminId}/profile/${type}`;
      case "logo":
      case "schoolImage":
        return `schools/${data.schoolId}/${type}`;
      case "coverImage":
        return `blogs/${data.blogPostId}`;
      case "banner":
        return `scholarships/${data.slug}/${type}`;
      case "financial-aid":
        return `financialAids/${data.financialAidId}/${data.key}`;
      default:
        throw SkynedUtils.createException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Please provide a valid type for resolving storage path",
        );
    }
  }

  /**
   * Casts Database json type of interface
   */

  static deserialize<T extends object, K>(data: T): K {
    const deserialized = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (
          [
            "primaryImage",
            "secondaryImage",
            "logo",
            "schoolImage",
            "coverImage",
            "banner",
            "transcript",
            "identification",
            "immigrationDocument",
            "resume",
            "bankStatement",
            "proofOfAddress",
            "offerLetter",
          ].includes(key)
        ) {
          return [key, value as unknown as IObject];
        }

        if (key === "phoneNumber") {
          return [key, value as unknown as IPhoneNumber];
        }

        if (skipKeys.includes(key)) {
          return [key, value as any];
        }

        if (decimalKeys.includes(key)) {
          return [key, (value as Decimal).toNumber()];
        }

        if (Array.isArray(value)) {
          return [key, value.map((v) => this.deserialize(v))];
        }

        return [key, value];
      }),
    );

    return deserialized as K;
  }

  /**
   * Format decimal values for DB
   */

  static formatDecimal<T extends object, K>(data: T): K {
    const formatted = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (decimalKeys.includes(key)) {
          return [key, `${value}`];
        }

        return [key, value];
      }),
    );

    return formatted as K;
  }
}
