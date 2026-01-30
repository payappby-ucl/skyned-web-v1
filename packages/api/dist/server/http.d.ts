import { CookieType, HeaderType } from ".";
import { HTTPClient, IHTTPClient } from "../http";
export declare class ServerHttpClient extends HTTPClient implements IHTTPClient {
    private readonly cookies;
    private readonly headers;
    constructor(cookies: CookieType, headers: HeaderType, serverBaseUrl: string);
    setAuthHeader: IHTTPClient["setAuthHeader"];
    clearTokenCookie: IHTTPClient["clearTokenCookie"];
    setTokenCookie: IHTTPClient["setTokenCookie"];
    getTokenCookie: IHTTPClient["getTokenCookie"];
}
