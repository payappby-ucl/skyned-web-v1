import { BrandServerApi } from "@workspace/api/server";
import { env } from "../config";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const brandServerApi = BrandServerApi.factory({
  serverBaseUrl: env.server.baseUrl,
  cookies: cookies,
});

export const getErrorResponse = (error: any) => {
  return new Response(JSON.stringify(error), {
    statusText: error.data.message,
    status: error.statusCode,
  });
};

export const setXForwardedForHeader = (request: Request | NextRequest) => ({
  "X-Forwarded-For":
    ((request.headers as any)["x-forwarded-for"] as string) || "unknown",
});
