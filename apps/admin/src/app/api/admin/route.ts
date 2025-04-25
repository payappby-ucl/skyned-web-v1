import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IAdmin } from "@workspace/shared";

export async function GET() {
  try {
    const response = await brandServerApi.httpClient.request<IAdmin>(
      "/admin/me",
      "GET",
      {
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
