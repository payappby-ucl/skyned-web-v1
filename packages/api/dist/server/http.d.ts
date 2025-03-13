import { CookieType } from "server";
import { HTTPClient, IHTTPClient } from "../http";
export declare class HttpClient extends HTTPClient implements IHTTPClient {
    private readonly cookies;
    constructor(cookies: CookieType, serverBaseUrl: string);
    setAuthHeader: IHTTPClient["setAuthHeader"];
}
