import { IStorage } from "../../../infrastructure";

export interface IStorageService {
  transformDataUriToAcceptedFormatForStorage(dataUri: string): {
    mimeType: string;
    body: Buffer;
  } | null;

  saveObject(
    dataUri: string,
    path: string,
  ): Promise<Awaited<ReturnType<IStorage["put"]>>>;

  deleteObject(path: string): Promise<void>;

  getMimeTypeFromExtension(fileExtension: string): string | null;

  getFileExtensionFromMimeType(mimeType: string): string | null;
}
