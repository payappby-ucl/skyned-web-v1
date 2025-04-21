import { HTTPClient, IHTTPClient } from "../../http";
import { IBrandClientApi } from "../interface";
export declare class ClientHttp extends HTTPClient implements IHTTPClient {
    private readonly auth;
    private readonly storage;
    private readonly environment?;
    constructor(auth: IBrandClientApi["auth"], storage: IBrandClientApi["storage"], environment?: string | undefined);
    setAuthHeader: IHTTPClient["setAuthHeader"];
    clearTokenCookie: IHTTPClient["clearTokenCookie"];
    setTokenCookie: IHTTPClient["setTokenCookie"];
    getTokenCookie: IHTTPClient["getTokenCookie"];
}
