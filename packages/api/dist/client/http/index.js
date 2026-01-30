"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientHttp = void 0;
const lib_1 = require("../../lib");
const http_1 = require("../../http");
const js_cookie_1 = __importDefault(require("js-cookie"));
class ClientHttp extends http_1.HTTPClient {
    auth;
    storage;
    environment;
    constructor(auth, storage, environment) {
        super("/api");
        this.auth = auth;
        this.storage = storage;
        this.environment = environment;
    }
    setAuthHeader = async (header) => {
        const token = await this.auth.getIdToken();
        if (token) {
            await this.setTokenCookie(token);
            header.append("authorization", `bearer ${token}`);
            this.storage.localStorage.setItem(lib_1.AUTH_TIME_STORAGE_NAME, new Date().toUTCString());
        }
    };
    clearTokenCookie = async () => {
        if (js_cookie_1.default.get(this.tokenCookieName)) {
            js_cookie_1.default.remove(this.tokenCookieName);
        }
    };
    setTokenCookie = async (token) => {
        js_cookie_1.default.set(this.tokenCookieName, token, {
            secure: true,
            expires: lib_1.COOKIE_EXPIRATION,
            // httpOnly: true,
        });
    };
    getTokenCookie = async () => {
        const token = js_cookie_1.default.get(this.tokenCookieName) || null;
        return token;
    };
}
exports.ClientHttp = ClientHttp;
