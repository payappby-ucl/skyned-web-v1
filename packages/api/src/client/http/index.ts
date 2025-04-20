"use client";
import { HTTPClient, IHTTPClient } from "../../http";
import { IBrandClientApi } from "../interface";
import Cookies from "js-cookie";

export class ClientHttp extends HTTPClient implements IHTTPClient {
  constructor(
    private readonly auth: IBrandClientApi["auth"],
    private readonly environment?: string,
  ) {
    super("/api");
  }

  setAuthHeader: IHTTPClient["setAuthHeader"] = async (header) => {
    const token = await this.auth.getIdToken();
    if (token) {
      await this.setTokenCookie(token);
      header.append("authorization", `bearer ${token}`);
    }
  };

  clearTokenCookie: IHTTPClient["clearTokenCookie"] = async () => {
    if (Cookies.get(this.tokenCookieName)) {
      Cookies.remove(this.tokenCookieName);
    }
  };

  setTokenCookie: IHTTPClient["setTokenCookie"] = async (token) => {
    console.log("Setting cookies");
    Cookies.set(this.tokenCookieName, token, {
      secure: true,
      // httpOnly: true,
      // expires: 7,
    });

    console.log(Cookies.get(this.tokenCookieName));
  };

  getTokenCookie: IHTTPClient["getTokenCookie"] = async () => {
    const token = await this.auth.getIdToken();
    return token;
  };
}
