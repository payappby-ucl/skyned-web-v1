import { Auth as FirebaseAuth } from "firebase/auth";
import { IBrandClientApi } from "./interface";
import { Auth, IAuth } from "./auth";
import { IUtils, ToastType, Utils } from "./utils";
import { IHTTPClient } from "../http";
import { ClientHttp } from "./http";

export * from "./interface";
interface Dependencies {
  auth: FirebaseAuth;
  toast: ToastType;
  environment?: string;
}
export class BrandClientApi implements IBrandClientApi {
  private static instance: IBrandClientApi | null = null;
  auth: IAuth;
  utils: IUtils;
  httpClient: IHTTPClient;

  private constructor(
    auth: FirebaseAuth,
    toast: ToastType,
    environment?: string,
  ) {
    this.auth = new Auth(auth);
    this.utils = new Utils(toast);
    this.httpClient = new ClientHttp(this.auth, environment);
  }

  static factory({ auth, toast, environment }: Dependencies) {
    if (!BrandClientApi.instance) {
      BrandClientApi.instance = new BrandClientApi(auth, toast, environment);
    }

    return BrandClientApi.instance;
  }
}
