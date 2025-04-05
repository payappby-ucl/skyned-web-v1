"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerHttpClient = void 0;
const http_1 = require("../http");
class ServerHttpClient extends http_1.HTTPClient {
    cookies;
    constructor(cookies, serverBaseUrl) {
        super(`${serverBaseUrl}/api/v1`);
        this.cookies = cookies;
    }
    setAuthHeader = async (headers) => {
        const cookieStore = await this.cookies();
        if (cookieStore.has(this.tokenCookieName)) {
            const tokenCookie = cookieStore.get(this.tokenCookieName);
            if (tokenCookie) {
                headers.append("authorization", `bearer ${tokenCookie.value}`);
            }
        }
    };
    clearTokenCookie = async () => {
        const cookieStore = await this.cookies();
        if (cookieStore.has(this.tokenCookieName)) {
            cookieStore.delete(this.tokenCookieName);
        }
    };
    setTokenCookie = async (token) => {
        const cookieStore = await this.cookies();
        cookieStore.set(this.tokenCookieName, token, {
            httpOnly: true,
            secure: true,
        });
    };
}
exports.ServerHttpClient = ServerHttpClient;
