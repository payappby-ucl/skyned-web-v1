"use client";
import { AUTH_TIME_STORAGE_NAME, COOKIE_EXPIRATION } from "../../lib";
import { HTTPClient, IHTTPClient } from "../../http";
import { IBrandClientApi } from "../interface";
import Cookies from "js-cookie";

export class ClientHttp extends HTTPClient implements IHTTPClient {
  constructor(
    private readonly auth: IBrandClientApi["auth"],
    private readonly storage: IBrandClientApi["storage"],
    private readonly environment?: string,
  ) {
    super("/api");
  }

  setAuthHeader: IHTTPClient["setAuthHeader"] = async (header) => {
    const token = await this.auth.getIdToken();
    if (token) {
      await this.setTokenCookie(token);
      header.append("authorization", `bearer ${token}`);
      this.storage.localStorage.setItem(
        AUTH_TIME_STORAGE_NAME,
        new Date().toUTCString(),
      );
    }
  };

  clearTokenCookie: IHTTPClient["clearTokenCookie"] = async () => {
    if (Cookies.get(this.tokenCookieName)) {
      Cookies.remove(this.tokenCookieName);
    }
  };

  setTokenCookie: IHTTPClient["setTokenCookie"] = async (token) => {
    Cookies.set(this.tokenCookieName, token, {
      secure: true,
      expires: COOKIE_EXPIRATION,
      // httpOnly: true,
    });
  };

  getTokenCookie: IHTTPClient["getTokenCookie"] = async () => {
    const token = Cookies.get(this.tokenCookieName) || null;
    return token;
  };
}
