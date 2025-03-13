import { IHTTPClient } from "http/interface";
import { IAuth } from "./auth";
import { IUtils } from "./utils";
export interface IBrandClientApi {
    auth: IAuth;
    utils: IUtils;
    httpClient: IHTTPClient;
}
