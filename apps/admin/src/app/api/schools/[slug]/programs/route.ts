import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IPaginatedResponse, IProgram } from "@workspace/shared";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { slug } = await params;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const urlQuery = brandServerApi.utils.constructQuery({ page, limit });
    const tags: string[] = brandServerApi.utils.constructTags(
      {
        page: {
          prefix: `${serverCacheTags.programs}-${slug}-page`,
          value: page,
        },
        limit: {
          prefix: `${serverCacheTags.programs}-${slug}-limit`,
          value: limit,
        },
      },
      [`${serverCacheTags.programs}-${slug}`],
    );

    const urlConstruct = `/schools/${slug}/programs?${urlQuery.toString()}`;

    const response = await brandServerApi.httpClient.request<
      IPaginatedResponse<IProgram>
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
