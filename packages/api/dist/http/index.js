"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPClient = void 0;
const lib_1 = require("../lib");
__exportStar(require("./interface"), exports);
class HTTPClient {
    baseUrl;
    tokenCookieName = lib_1.TOKEN_COOKIE_NAME;
    constructor(baseUrl = "") {
        this.baseUrl = baseUrl;
    }
    async request(url, method, options) {
        try {
            const headers = new Headers(options?.headers);
            await this.setAuthHeader(headers);
            if (!["GET", "DELETE"].includes(method)) {
                headers.append("Content-Type", "application/json");
            }
            const request = new Request(`${this.baseUrl}${url}`, {
                ...options,
                method,
                headers,
            });
            const res = await fetch(request);
            if (!res.ok) {
                if (res.status !== 429) {
                    const data = (await res.json());
                    throw data;
                }
                throw {
                    statusCode: 429,
                    success: false,
                    data: { message: res.statusText },
                };
            }
            return (await res.json());
        }
        catch (error) {
            if (error.statusCode && error.data.message) {
                throw error;
            }
            throw {
                statusCode: 408,
                success: false,
                data: {
                    message: "Something went wrong. Please check your network connection and try again.",
                },
            };
        }
    }
}
exports.HTTPClient = HTTPClient;
