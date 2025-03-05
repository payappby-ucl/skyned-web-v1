import { AxiosInstance } from "axios";
import { ISuccessResponse } from "../../interfaces";

export interface IHTTPClient {
  axios: {
    v1: AxiosInstance;
  };

  fetch: {
    v1: {
      get<T>(
        url: string,
        options?: Omit<RequestInit, "method" | "body">,
      ): Promise<ISuccessResponse<T>>;
      post<T>(
        url: string,
        options: Omit<RequestInit, "method" | "body"> &
          Required<Pick<RequestInit, "body">>,
      ): Promise<ISuccessResponse<T>>;
      put<T>(
        url: string,
        options: Omit<RequestInit, "method" | "body"> &
          Required<Pick<RequestInit, "body">>,
      ): Promise<ISuccessResponse<T>>;
      delete<T>(
        url: string,
        options?: Omit<RequestInit, "method" | "body">,
      ): Promise<ISuccessResponse<T>>;
    };
  };
}
