/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import { getStorage, getDownloadURL } from "firebase-admin/storage";
import mime from "mime";
import { RegistryKeysEnum } from "../../enum";
import SkynedRegistry from "../../registry";
import { SkynedUtils } from "../../utils";
import { IStorage } from "../../interfaces";
import { StatusCodes } from "http-status-codes";

SkynedUtils.initializeFirebaseApp();

/**
 * Concrete implementation for storage using GCP cloud storage
 *
 * @class
 */

class Storage implements IStorage {
  private static instance: IStorage | null = null;
  private readonly storage = getStorage();
  private bucket = this.storage.bucket();

  private constructor() {
    // * Private
  }

  /** Creates the storage instance */

  static factory() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }

  private isValidMimeType(mimeType: string) {
    return !!mime.getExtension(mimeType);
  }

  private async getDownloadUrl(path: string) {
    if (!path) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Please provide a valid path",
      );
    }

    const url = await getDownloadURL(this.bucket.file(path));
    return url;
  }

  private async doesFileExist(path: string) {
    if (!path) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Please provide a valid path",
      );
    }

    const file = this.bucket.file(path);
    const [exists] = await file.exists();
    return exists;
  }

  /**
   * Creates or stores the object in cloud storage
   */
  put: IStorage["put"] = async ({ buffer, path, mimeType, metadata = {} }) => {
    if (!buffer) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Please provide a valid base64",
      );
    }

    if (!path) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Please provide a valid path",
      );
    }

    if (!mimeType || !this.isValidMimeType(mimeType)) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Please provide a valid mime type",
      );
    }

    const file = this.bucket.file(path);
    await file.save(buffer, {
      resumable: false,
      metadata: {
        ...metadata,
        contentType: mimeType,
        // TODO: Figure out adding cacheControl
        // cacheControl: "public, max-age=31536000",
        // public: Allows shared caching by CDNs.
        // private: Only the user's browser should cache it.
        // max-age=31536000: Sets the cache duration (in seconds). Here, 31536000 seconds = 1 year.
        // no-cache: Forces the browser to validate with the server before using a cached version.
        // no-store: Prevents any caching (useful for sensitive data like personal documents).
      },
    });

    const url = await this.getDownloadUrl(path);
    return {
      url,
      path,
      mimeType,
    };
  };

  /** Deletes the object from cloud storage */

  delete: IStorage["delete"] = async (path) => {
    if (!path) {
      throw SkynedUtils.createException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Please provide a valid path",
      );
    }

    const fileExist = await this.doesFileExist(path);
    if (fileExist) {
      await this.bucket.file(path).delete();
    }
  };
}

/** Storage instance */
export const storage = SkynedRegistry.getSingleton(
  RegistryKeysEnum.STORAGE,
  Storage.factory,
);
