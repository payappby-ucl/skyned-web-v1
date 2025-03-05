import { HTTPClientV1 } from "./http";
import { IBrandApi } from "./interface";
import { BrandError } from "./error";
import { Utils } from "./utils";
export declare class BrandApi implements IBrandApi {
    private static instance;
    private constructor();
    static factory(): IBrandApi;
    httpClient: HTTPClientV1;
    toast: IBrandApi["toast"];
    error: BrandError;
    utils: Utils;
}
