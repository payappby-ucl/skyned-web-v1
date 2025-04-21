"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
class LocalStorage {
    setItem = (name, value) => localStorage.setItem(name, value);
    getItem = (name) => localStorage.getItem(name);
    deleteItem = (name) => {
        if (this.getItem(name)) {
            localStorage.removeItem(name);
        }
    };
}
exports.LocalStorage = LocalStorage;
