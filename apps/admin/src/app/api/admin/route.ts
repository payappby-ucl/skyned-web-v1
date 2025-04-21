import {
  brandServerApi,
  getErrorResponse,
  setXForwardedForHeader,
} from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IAdmin } from "@workspace/shared";

export async function GET(request: Request) {
  try {
    const response = await brandServerApi.httpClient.request<IAdmin>(
      "/admin/me",
      "GET",
      {
        headers: {
          ...setXForwardedForHeader(request),
        },
        next: {
          tags: [serverCacheTags.auth],
        },
      },
    );

    return Response.json(response);
  } catch (error: any) {
    return getErrorResponse(error);
  }
}
