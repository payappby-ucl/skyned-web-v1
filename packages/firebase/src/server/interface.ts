import { AxiosInstance } from "axios";

export interface IFirebaseServer {
  httpClient: {
    v1: AxiosInstance;
  };
}
