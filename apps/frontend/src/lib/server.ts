import { BrandServerApi } from "@workspace/api/server";
import { env } from "../config";
import { cookies } from "next/headers";

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
