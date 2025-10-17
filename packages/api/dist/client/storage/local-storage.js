"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
class LocalStorage {
    setItem = (name, value) => {
        // if (typeof window === "undefined") return;
        localStorage.setItem(name, value);
    };
    getItem = (name) => {
        // if (typeof window === "undefined") return null;
        return localStorage.getItem(name);
    };
    deleteItem = (name) => {
        // if (typeof window === "undefined") return;
        if (this.getItem(name)) {
            localStorage.removeItem(name);
        }
    };
}
exports.LocalStorage = LocalStorage;
