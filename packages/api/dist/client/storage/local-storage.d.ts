import { ILocalStorage } from "./interface";
export declare class LocalStorage implements ILocalStorage {
    setItem: ILocalStorage["setItem"];
    getItem: ILocalStorage["getItem"];
    deleteItem: ILocalStorage["deleteItem"];
}
