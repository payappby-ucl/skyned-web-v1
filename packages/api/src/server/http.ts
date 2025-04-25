import { COOKIE_EXPIRATION } from "../lib";
import { CookieType, HeaderType } from ".";
import { HTTPClient, IHTTPClient } from "../http";

export class ServerHttpClient extends HTTPClient implements IHTTPClient {
  constructor(
    private readonly cookies: CookieType,
    private readonly headers: HeaderType,
    serverBaseUrl: string,
  ) {
    super(`${serverBaseUrl}/api/v1`);
  }

  setAuthHeader: IHTTPClient["setAuthHeader"] = async (reqHeaders) => {
    const cookieStore = await this.cookies();
    if (cookieStore.has(this.tokenCookieName)) {
      const tokenCookie = cookieStore.get(this.tokenCookieName);
      if (tokenCookie) {
        reqHeaders.append("authorization", `bearer ${tokenCookie.value}`);
      }
    }

    // * Set x-forward header
    const ip = (await this.headers()).get("x-forwarded-for");
    console.log(ip, "IP Address");
    if (ip) {
      reqHeaders.append("x-forwarded-for", ip);
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
