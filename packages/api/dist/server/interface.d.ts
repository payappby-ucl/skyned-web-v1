import { IHTTPClient } from "../http/interface";
import { IServerUtils } from "./utils";
export interface IBrandServerApi {
    httpClient: IHTTPClient;
    utils: IServerUtils;
}
