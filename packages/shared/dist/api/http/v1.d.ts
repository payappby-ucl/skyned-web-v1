import axios from "axios";
import { IHTTPClient } from "./interface";
import { ISuccessResponse } from "../../interfaces";
export declare class HTTPClientV1 implements IHTTPClient {
    axios: {
        v1: axios.AxiosInstance;
    };
    private readonly handleFetchResponse;
    fetch: {
        v1: {
            get: <T>(url: Parameters<IHTTPClient["fetch"]["v1"]["get"]>["0"], options: Parameters<IHTTPClient["fetch"]["v1"]["get"]>["1"]) => Promise<ISuccessResponse<T>>;
            post: <T>(url: Parameters<IHTTPClient["fetch"]["v1"]["post"]>["0"], options: Parameters<IHTTPClient["fetch"]["v1"]["post"]>["1"]) => Promise<ISuccessResponse<T>>;
            put: <T>(url: Parameters<IHTTPClient["fetch"]["v1"]["put"]>["0"], options: Parameters<IHTTPClient["fetch"]["v1"]["put"]>["1"]) => Promise<ISuccessResponse<T>>;
            delete: <T>(url: Parameters<IHTTPClient["fetch"]["v1"]["delete"]>["0"], options: Parameters<IHTTPClient["fetch"]["v1"]["delete"]>["1"]) => Promise<ISuccessResponse<T>>;
        };
    };
}
