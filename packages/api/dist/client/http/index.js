"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientHttp = void 0;
const http_1 = require("../../http");
const js_cookie_1 = __importDefault(require("js-cookie"));
class ClientHttp extends http_1.HTTPClient {
    auth;
    environment;
    constructor(auth, environment) {
        super("/api");
        this.auth = auth;
        this.environment = environment;
    }
    setAuthHeader = async (header) => {
        const token = await this.auth.getIdToken();
        if (token) {
            await this.setTokenCookie(token);
            header.append("authorization", `bearer ${token}`);
        }
    };
    clearTokenCookie = async () => {
        if (js_cookie_1.default.get(this.tokenCookieName)) {
            js_cookie_1.default.remove(this.tokenCookieName);
        }
    };
    setTokenCookie = async (token) => {
        console.log("Setting cookies");
        js_cookie_1.default.set(this.tokenCookieName, token, {
            secure: true,
            // httpOnly: true,
            // expires: 7,
        });
        console.log(js_cookie_1.default.get(this.tokenCookieName));
    };
    getTokenCookie = async () => {
        const token = await this.auth.getIdToken();
        return token;
    };
}
exports.ClientHttp = ClientHttp;
