import { CookieType } from ".";
import { HTTPClient, IHTTPClient } from "../http";

export class ServerHttpClient extends HTTPClient implements IHTTPClient {
  constructor(
    private readonly cookies: CookieType,
    serverBaseUrl: string,
  ) {
    super(`${serverBaseUrl}/api/v1`);
  }

  setAuthHeader: IHTTPClient["setAuthHeader"] = async (headers) => {
    const cookieStore = await this.cookies();
    if (cookieStore.has(this.tokenCookieName)) {
      const tokenCookie = cookieStore.get(this.tokenCookieName);
      if (tokenCookie) {
        headers.append("authorization", tokenCookie.value);
      }
    }
  };

  clearTokenCookie: IHTTPClient["clearTokenCookie"] = async () => {
    const cookieStore = await this.cookies();
    if (cookieStore.has(this.tokenCookieName)) {
      cookieStore.delete(this.tokenCookieName);
    }
  };
}
