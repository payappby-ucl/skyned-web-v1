import { IBrandServerApi } from "./interface";
import { cookies } from "next/headers";
import { HttpClient } from "./http";

export * from "./interface";

export type CookieType = typeof cookies;

interface Dependencies {
  serverBaseUrl: string;
  cookies: CookieType;
}
export class BrandServerApi implements IBrandServerApi {
  private static instance: IBrandServerApi | null = null;

  private constructor(
    private readonly serverBaseUrl: string,
    private readonly cookies: CookieType,
  ) {
    this.httpClient = new HttpClient(this.cookies, this.serverBaseUrl);
  }

  static factory({ serverBaseUrl, cookies }: Dependencies) {
    if (!BrandServerApi.instance) {
      BrandServerApi.instance = new BrandServerApi(serverBaseUrl, cookies);
    }

    return BrandServerApi.instance;
  }

  httpClient: IBrandServerApi["httpClient"];
}
