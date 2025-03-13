import { CookieType } from "server";
import { HTTPClient, IHTTPClient } from "../http";

export class HttpClient extends HTTPClient implements IHTTPClient {
  constructor(
    private readonly cookies: CookieType,
    serverBaseUrl: string,
  ) {
    super(`${serverBaseUrl}/api/v1`);
  }

  setAuthHeader: IHTTPClient["setAuthHeader"] = async (headers) => {
    const cookieStore = await this.cookies();
    if (cookieStore.has("token")) {
      const tokenCookie = cookieStore.get("token");
      if (tokenCookie) {
        headers.append("authorization", tokenCookie.value);
      }
    }
  };
}
