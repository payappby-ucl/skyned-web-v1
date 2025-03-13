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
            js_cookie_1.default.set(this.tokenCookieName, token, {
                secure: this.environment === "development" ? false : true,
                httpOnly: true,
            });
            header.append("authorization", `bearer ${token}`);
        }
    };
    clearTokenCookie = async () => {
        if (js_cookie_1.default.get(this.tokenCookieName)) {
            js_cookie_1.default.remove(this.tokenCookieName);
        }
    };
}
exports.ClientHttp = ClientHttp;
