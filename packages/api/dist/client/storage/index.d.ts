import { IStorage } from "./interface";
import { LocalStorage } from "./local-storage";
export * from "./interface";
export declare class Storage implements IStorage {
    localStorage: LocalStorage;
}
