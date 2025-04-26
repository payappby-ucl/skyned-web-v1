import { ServerHttpClient } from "./http";
import { IBrandServerApi } from "./interface";
import { cookies, headers } from "next/headers";
import { ServerUtils } from "./utils";

export * from "./interface";

export type CookieType = typeof cookies;
export type HeaderType = typeof headers;

interface Dependencies {
  serverBaseUrl: string;
  cookies: CookieType;
  headers: HeaderType;
}
export class BrandServerApi implements IBrandServerApi {
  private static instance: IBrandServerApi | null = null;
  httpClient: IBrandServerApi["httpClient"];
  utils: IBrandServerApi["utils"] = new ServerUtils();

  private constructor(
    private readonly serverBaseUrl: string,
    private readonly cookies: CookieType,
    private readonly headers: HeaderType,
  ) {
    this.httpClient = new ServerHttpClient(
      this.cookies,
      this.headers,
      this.serverBaseUrl,
    );
  }

  static factory({ serverBaseUrl, cookies, headers }: Dependencies) {
    if (!BrandServerApi.instance) {
      BrandServerApi.instance = new BrandServerApi(
        serverBaseUrl,
        cookies,
        headers,
      );
    }

    return BrandServerApi.instance;
  }
}
