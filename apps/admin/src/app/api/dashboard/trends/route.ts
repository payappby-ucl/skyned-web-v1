import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IPaginatedResponse, ITrends } from "@workspace/shared";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const urlQuery = brandServerApi.utils.constructQuery({ from, to });
    const tags: string[] = brandServerApi.utils.constructTags(
      {
        from: {
          prefix: `${serverCacheTags.trends}-from`,
          value: from,
        },
        to: {
          prefix: `${serverCacheTags.trends}-to`,
          value: to,
        },
      },
      [serverCacheTags.trends],
    );

    const urlConstruct = `/admins/dashboard/trends?${urlQuery.toString()}`;

    const response = await brandServerApi.httpClient.request<
      IPaginatedResponse<ITrends[]>
    >(urlConstruct, "GET", {
      next: {
        tags,
      },
    });

    return Response.json(response);
  } catch (error: any) {
    return getErrorResponse(error);
  }
}
