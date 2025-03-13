import { IBrandServerApi } from "./interface";
import { cookies } from "next/headers";
export * from "./interface";
export type CookieType = typeof cookies;
interface Dependencies {
    serverBaseUrl: string;
    cookies: CookieType;
}
export declare class BrandServerApi implements IBrandServerApi {
    private readonly serverBaseUrl;
    private readonly cookies;
    private static instance;
    private constructor();
    static factory({ serverBaseUrl, cookies }: Dependencies): IBrandServerApi;
    httpClient: IBrandServerApi["httpClient"];
}
