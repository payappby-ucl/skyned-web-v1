import { IStorage } from "./interface";
import { LocalStorage } from "./local-storage";

export * from "./interface";

export class Storage implements IStorage {
  localStorage = new LocalStorage();
}
