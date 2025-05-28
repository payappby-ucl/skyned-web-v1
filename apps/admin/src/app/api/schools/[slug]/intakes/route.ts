import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IFaq, IPaginatedResponse } from "@workspace/shared";
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
          prefix: `${serverCacheTags.intakes}-${slug}-page`,
          value: page,
        },
        limit: {
          prefix: `${serverCacheTags.intakes}-${slug}-limit`,
          value: limit,
        },
      },
      [`${serverCacheTags.intakes}-${slug}`],
    );

    const urlConstruct = `/schools/${slug}/intakes?${urlQuery.toString()}`;

    const response = await brandServerApi.httpClient.request<
      IPaginatedResponse<IFaq>
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
