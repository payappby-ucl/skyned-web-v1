"use client";
import { Auth as FirebaseAuth } from "firebase/auth";
import { IBrandClientApi } from "./interface";
import { Auth, IAuth } from "./auth";
import { IUtils, ToastType, Utils } from "./utils";
import { IHTTPClient } from "../http";
import { ClientHttp } from "./http";
import { Storage } from "./storage";
import { Location } from "./location";
import { DateService } from "./date";
import { FileService } from "./file";

export * from "./interface";
interface Dependencies {
  auth: FirebaseAuth;
  toast: ToastType;
  environment?: string;
}
export class BrandClientApi implements IBrandClientApi {
  private static instance: IBrandClientApi | null = null;
  storage = new Storage();
  auth: IAuth;
  utils: IUtils;
  httpClient: IHTTPClient;
  location = new Location();
  date = new DateService();
  file = new FileService();

  private constructor(
    auth: FirebaseAuth,
    toast: ToastType,
    environment?: string,
  ) {
    this.auth = new Auth(auth);
    this.utils = new Utils(toast);
    this.httpClient = new ClientHttp(this.auth, this.storage, environment);
  }

  static factory({ auth, toast, environment }: Dependencies) {
    if (!BrandClientApi.instance) {
      BrandClientApi.instance = new BrandClientApi(auth, toast, environment);
    }

    return BrandClientApi.instance;
  }
}
