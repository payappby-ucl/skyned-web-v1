"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const http_1 = require("../http");
class HttpClient extends http_1.HTTPClient {
    cookies;
    constructor(cookies, serverBaseUrl) {
        super(`${serverBaseUrl}/api/v1`);
        this.cookies = cookies;
    }
    setAuthHeader = async (headers) => {
        const cookieStore = await this.cookies();
        if (cookieStore.has("token")) {
            const tokenCookie = cookieStore.get("token");
            if (tokenCookie) {
                headers.append("authorization", tokenCookie.value);
            }
        }
    };
}
exports.HttpClient = HttpClient;
