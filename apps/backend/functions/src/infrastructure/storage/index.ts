import { getStorage, getDownloadURL } from "firebase-admin/storage";
import { SkynedUtils } from "../../utils";
import { IStorage } from "./interface";

export * from "./interface";
SkynedUtils.initializeFirebaseApp();
class Storage implements IStorage {
  private static instance: IStorage | null = null;
  private bucket = getStorage().bucket();

  private constructor() {
    // * Private
  }

  static factory() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }
}
