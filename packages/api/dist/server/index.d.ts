import { IBrandServerApi } from "./interface";
import { cookies, headers } from "next/headers";
export * from "./interface";
export type CookieType = typeof cookies;
export type HeaderType = typeof headers;
interface Dependencies {
    serverBaseUrl: string;
    cookies: CookieType;
    headers: HeaderType;
}
export declare class BrandServerApi implements IBrandServerApi {
    private readonly serverBaseUrl;
    private readonly cookies;
    private readonly headers;
    private static instance;
    httpClient: IBrandServerApi["httpClient"];
    private constructor();
    static factory({ serverBaseUrl, cookies, headers }: Dependencies): IBrandServerApi;
}
