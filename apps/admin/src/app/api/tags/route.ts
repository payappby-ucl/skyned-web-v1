import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { ICategory, IPaginatedResponse } from "@workspace/shared";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const urlQuery = brandServerApi.utils.constructQuery({ page, limit });
    const tags: string[] = brandServerApi.utils.constructTags(
      {
        page: {
          prefix: `${serverCacheTags.tags}-page`,
          value: page,
        },
        limit: {
          prefix: `${serverCacheTags.tags}-limit`,
          value: limit,
        },
      },
      [serverCacheTags.tags],
    );

    const urlConstruct = `/tags/list?${urlQuery.toString()}`;

    const response = await brandServerApi.httpClient.request<
      IPaginatedResponse<ICategory>
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
