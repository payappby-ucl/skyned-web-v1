import { IHTTPClient } from "../http";
import { IAuth } from "./auth";
import { IUtils } from "./utils";
export interface IBrandClientApi {
    auth: IAuth;
    utils: IUtils;
    httpClient: IHTTPClient;
}
