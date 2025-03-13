export interface IMessageResponse {
  message: string;
}
interface IResponse {
  statusCode: number;
}

export interface ISuccessResponse<T> extends IResponse {
  success: true;
  data: T;
}

export interface IFailedResponse extends IResponse {
  success: false;
  data: IMessageResponse;
}

export interface IHTTPClient {
  setAuthHeader(headers: Headers): Promise<void>;
  request<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    options?: RequestInit,
  ): Promise<ISuccessResponse<T>>;
}
