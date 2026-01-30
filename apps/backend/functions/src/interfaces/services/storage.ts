import { IStorage } from "../infrastructure";

/** Storage service interface */
export interface IStorageService {
  /**
   * Transforms the datauri to a format accepted by the storage infracture
   */
  transformDataUriToAcceptedFormatForStorage(dataUri: string): {
    mimeType: string;
    body: Buffer;
  } | null;

  /**
   * Saves data to storage
   */
  saveObject(
    dataUri: string,
    path: string,
  ): Promise<Awaited<ReturnType<IStorage["put"]>>>;

  /**
   * Deletes data from storage
   */
  deleteObject(path: string): Promise<void>;

  /**
   * Gets the mime type of a file from it's extension
   */
  getMimeTypeFromExtension(fileExtension: string): string | null;

  /**
   * Gets a file extension from it's mimetype
   */
  getFileExtensionFromMimeType(mimeType: string): string | null;
}
