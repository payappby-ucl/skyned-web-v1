/* eslint-disable max-len */
import { StatusCodes } from "http-status-codes";
import parseDataURL from "data-urls";
import mime from "mime";
import { RegistryKeysEnum } from "../../../enum";
import { IStorage, storage } from "../../../infrastructure";
import SkynedRegistry from "../../../registry";
import { SkynedUtils } from "../../../utils";
import { IStorageService } from "./interface";

export * from "./interface";

interface Dependencies {
  storage: IStorage;
}
export class StorageService implements IStorageService {
  private static instance: IStorageService | null = null;
  private constructor(private readonly storage: IStorage) {}
  static factory({ storage }: Dependencies) {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService(storage);
    }

    return StorageService.instance;
  }

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

export const storageService = SkynedRegistry.getSingleton(
  RegistryKeysEnum.STORAGE_SERVICE,
  () =>
    StorageService.factory({
      storage,
    }),
);
