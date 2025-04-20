import { IFailedResponse, IHTTPClient, ISuccessResponse } from "./interface";

export * from "./interface";
abstract class HTTPClient implements IHTTPClient {
  protected tokenCookieName = "_SKY_token";
  constructor(private readonly baseUrl: string = "") {}

  abstract setAuthHeader: IHTTPClient["setAuthHeader"];
  abstract clearTokenCookie: IHTTPClient["clearTokenCookie"];
  abstract setTokenCookie: IHTTPClient["setTokenCookie"];
  abstract getTokenCookie: IHTTPClient["getTokenCookie"];

  async request<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    options?: RequestInit,
  ): Promise<ISuccessResponse<T>> {
    try {
      const headers = new Headers(options?.headers);
      this.setAuthHeader(headers);
      if (!["GET", "DELETE"].includes(method)) {
        headers.append("Content-Type", "application/json");
      }
      const request = new Request(`${this.baseUrl}${url}`, {
        ...options,
        method,
        headers,
      });

      const res = await fetch(request);
      if (!res.ok) {
        if (res.status !== 429) {
          const data = (await res.json()) as IFailedResponse;
          throw data;
        }

        throw {
          statusCode: 429,
          success: false,
          data: { message: res.statusText },
        };
      }

      return (await res.json()) as ISuccessResponse<T>;
    } catch (error: any) {
      if (error.statusCode && error.data.message) {
        throw error;
      }

      throw {
        statusCode: 408,
        success: false,
        data: {
          message:
            "Something went wrong. Please check your network connection and try again.",
        },
      };
    }
  }
}

export { HTTPClient };
