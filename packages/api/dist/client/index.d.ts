import { Auth as FirebaseAuth } from "firebase/auth";
import { IBrandClientApi } from "./interface";
import { IAuth } from "./auth";
import { IUtils, ToastType } from "./utils";
import { IHTTPClient } from "../http";
import { Storage } from "./storage";
export * from "./interface";
interface Dependencies {
    auth: FirebaseAuth;
    toast: ToastType;
    environment?: string;
}
export declare class BrandClientApi implements IBrandClientApi {
    private static instance;
    storage: Storage;
    auth: IAuth;
    utils: IUtils;
    httpClient: IHTTPClient;
    private constructor();
    static factory({ auth, toast, environment }: Dependencies): IBrandClientApi;
}
