import { ILocalStorage } from "./interface";

export class LocalStorage implements ILocalStorage {
  setItem: ILocalStorage["setItem"] = (name, value) =>
    localStorage.setItem(name, value);

  getItem: ILocalStorage["getItem"] = (name) => localStorage.getItem(name);

  deleteItem: ILocalStorage["deleteItem"] = (name) => {
    if (this.getItem(name)) {
      localStorage.removeItem(name);
    }
  };
}
