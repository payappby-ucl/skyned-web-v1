/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import parseDataURL from "data-urls";
import mime from "mime";
import { RegistryKeysEnum } from "../../../enum";
import { storage } from "../../../infrastructure";
import SkynedRegistry from "../../../registry";
import { SkynedUtils } from "../../../utils";
import { IStorage, IStorageService } from "../../../interfaces";

/** Required dependencies for the instantiation of storage service class */
export interface StorageServiceDependencies {
  /** Storage infrastructure responsible for storing the object */
  storage: IStorage;
}

/**
 * Represents the storage service
 *
 * @class
 */
export class StorageService implements IStorageService {
  private static instance: IStorageService | null = null;
  private constructor(private readonly storage: IStorage) {}

  /**
   * For creating storage service instance
   */

  static factory({ storage }: StorageServiceDependencies) {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService(storage);
    }

    return StorageService.instance;
  }

  /**
   * Gets a file extension from the file mime type
   *
   * @example
   * The return value will be jpeg
   * ```ts
   * getFileExtensionFromMimeType("image/jpeg");
   * ```
   */

  getFileExtensionFromMimeType: IStorageService["getFileExtensionFromMimeType"] =
    (mimeType) => {
      if (!mimeType) {
        throw SkynedUtils.createException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "mimeType is not defined",
        );
      }
      return mime.getExtension(mimeType);
    };

  /**
   * Gets a mime type from the file extension
   *
   * @example
   * The return value will be image/jpeg
   * ```ts
   * getMimeTypeFromExtension("jpeg");
   * ```
   */

  getMimeTypeFromExtension: IStorageService["getMimeTypeFromExtension"] = (
    fileExtension,
  ) => {
    if (!fileExtension) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "fileExtension is not defined",
      );
    }

    return mime.getType(fileExtension);
  };

  /**
   * Transforms a data uri to the acceptable format for the storage infrastructure
   */

  transformDataUriToAcceptedFormatForStorage: IStorageService["transformDataUriToAcceptedFormatForStorage"] =
    (dataUri) => {
      if (!dataUri) {
        throw SkynedUtils.createException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "dataUri is undefined",
        );
      }

      const parsedData = parseDataURL(dataUri);
      if (!parsedData) {
        return null;
      }

      return {
        mimeType: parsedData.mimeType.toString(),
        body: Buffer.from(parsedData.body.buffer),
      };
    };

  /**
   * Performs checks, validate inputs and format necessary data before calling the storage infrastructure
   */

  saveObject: IStorageService["saveObject"] = async (dataUri, path) => {
    if (!path) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "path is undefined",
      );
    }

    if (!dataUri) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "dataUri is undefined",
      );
    }

    const transformedData =
      this.transformDataUriToAcceptedFormatForStorage(dataUri);

    if (!transformedData) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "dataUri is not valid",
      );
    }

    const { body, mimeType } = transformedData;

    const savedObjectResponse = await this.storage.put({
      buffer: body,
      mimeType,
      path,
    });

    return savedObjectResponse;
  };

  /** Communicates with the storage infrastructure for deletion of an object */

  deleteObject: IStorageService["deleteObject"] = async (path) => {
    if (!path) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "path is undefined",
      );
    }

    await this.storage.delete(path);
  };
}

/** Storage service instance */
export const storageService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.STORAGE_SERVICE,
  () =>
    StorageService.factory({
      storage,
    }),
);
