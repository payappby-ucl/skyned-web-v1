import { COOKIE_EXPIRATION } from "lib";
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
        headers.append("authorization", `bearer ${tokenCookie.value}`);
      }
    }
  };

  clearTokenCookie: IHTTPClient["clearTokenCookie"] = async () => {
    const cookieStore = await this.cookies();
    if (cookieStore.has(this.tokenCookieName)) {
      cookieStore.delete(this.tokenCookieName);
    }
  };

  setTokenCookie: IHTTPClient["setTokenCookie"] = async (token) => {
    const cookieStore = await this.cookies();
    cookieStore.set(this.tokenCookieName, token, {
      // httpOnly: true,
      secure: true,
      expires: COOKIE_EXPIRATION,
    });
  };

  getTokenCookie: IHTTPClient["getTokenCookie"] = async () => {
    const cookieStore = await this.cookies();
    if (cookieStore.has(this.tokenCookieName)) {
      const tokenCookie = cookieStore.get(this.tokenCookieName);
      if (tokenCookie) {
        return tokenCookie.value;
      }
    }

    return null;
  };
}
