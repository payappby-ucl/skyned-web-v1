import { toast } from "sonner";
import { IError } from "./error";
import { IHTTPClient } from "./http/interface";
import { IUtils } from "./utils";
export interface IBrandApi {
    httpClient: IHTTPClient;
    toast: typeof toast;
    error: IError;
    utils: IUtils;
}
