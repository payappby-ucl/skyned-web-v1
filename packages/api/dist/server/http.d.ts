import { CookieType } from ".";
import { HTTPClient, IHTTPClient } from "../http";
export declare class ServerHttpClient extends HTTPClient implements IHTTPClient {
    private readonly cookies;
    constructor(cookies: CookieType, serverBaseUrl: string);
    setAuthHeader: IHTTPClient["setAuthHeader"];
    clearTokenCookie: IHTTPClient["clearTokenCookie"];
}
