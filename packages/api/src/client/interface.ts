import { IHTTPClient } from "../http";
import { IAuth } from "./auth";
import { IDateService } from "./date";
import { IFile } from "./file";
import { ILocation } from "./location";
import { IStorage } from "./storage";
import { IUtils } from "./utils";

export interface IBrandClientApi {
  auth: IAuth;
  storage: IStorage;
  utils: IUtils;
  httpClient: IHTTPClient;
  location: ILocation;
  date: IDateService;
  file: IFile;
}
