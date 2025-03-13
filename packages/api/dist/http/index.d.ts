import { IHTTPClient, ISuccessResponse } from "./interface";
export * from "./interface";
declare abstract class HTTPClient implements IHTTPClient {
    private readonly baseUrl;
    constructor(baseUrl?: string);
    abstract setAuthHeader: IHTTPClient["setAuthHeader"];
    request<T>(url: string, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", options?: RequestInit): Promise<ISuccessResponse<T>>;
}
export { HTTPClient };
