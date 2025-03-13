import { HTTPClient, IHTTPClient } from "../../http";
import { IBrandClientApi } from "../interface";
export declare class ClientHttp extends HTTPClient implements IHTTPClient {
    private readonly auth;
    private readonly environment?;
    constructor(auth: IBrandClientApi["auth"], environment?: string);
    setAuthHeader: IHTTPClient["setAuthHeader"];
}
