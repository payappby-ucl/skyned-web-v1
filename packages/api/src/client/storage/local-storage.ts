"use client";
import { ILocalStorage } from "./interface";

export class LocalStorage implements ILocalStorage {
  setItem: ILocalStorage["setItem"] = (name, value) => {
    // if (typeof window === "undefined") return;
    localStorage.setItem(name, value);
  };

  getItem: ILocalStorage["getItem"] = (name) => {
    // if (typeof window === "undefined") return null;
    return localStorage.getItem(name);
  };

  deleteItem: ILocalStorage["deleteItem"] = (name) => {
    // if (typeof window === "undefined") return;
    if (this.getItem(name)) {
      localStorage.removeItem(name);
    }
  };
}
