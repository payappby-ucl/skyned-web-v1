"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerHttpClient = void 0;
const lib_1 = require("../lib");
const http_1 = require("../http");
class ServerHttpClient extends http_1.HTTPClient {
    cookies;
    headers;
    constructor(cookies, headers, serverBaseUrl) {
        super(`${serverBaseUrl}/api/v1`);
        this.cookies = cookies;
        this.headers = headers;
    }
    setAuthHeader = async (reqHeaders) => {
        const cookieStore = await this.cookies();
        if (cookieStore.has(this.tokenCookieName)) {
            const tokenCookie = cookieStore.get(this.tokenCookieName);
            if (tokenCookie) {
                reqHeaders.append("authorization", `bearer ${tokenCookie.value}`);
            }
        }
        // * Set x-forward header
        const ip = (await this.headers()).get("x-forwarded-for");
        if (ip) {
            reqHeaders.append("x-forwarded-for", ip);
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
            // httpOnly: true,
            secure: true,
            expires: lib_1.COOKIE_EXPIRATION,
        });
    };
    getTokenCookie = async () => {
        const cookieStore = await this.cookies();
        if (cookieStore.has(this.tokenCookieName)) {
            const tokenCookie = cookieStore.get(this.tokenCookieName);
            if (tokenCookie) {
                return tokenCookie.value;
            }
        }
        return null;
    };
}
exports.ServerHttpClient = ServerHttpClient;
