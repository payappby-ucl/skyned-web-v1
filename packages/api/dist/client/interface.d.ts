import { IHTTPClient } from "../http";
import { IAuth } from "./auth";
import { IStorage } from "./storage";
import { IUtils } from "./utils";
export interface IBrandClientApi {
    auth: IAuth;
    storage: IStorage;
    utils: IUtils;
    httpClient: IHTTPClient;
}
