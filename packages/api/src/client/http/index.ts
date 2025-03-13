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
      Cookies.set("token", token, {
        secure: this.environment === "development" ? false : true,
        httpOnly: true,
      });
      header.append("authorization", `bearer ${token}`);
    }
  };
}
