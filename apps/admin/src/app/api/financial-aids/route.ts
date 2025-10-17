import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IFinancialAid, IPaginatedResponse } from "@workspace/shared";
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
          prefix: `${serverCacheTags.financialAids}-page`,
          value: page,
        },
        limit: {
          prefix: `${serverCacheTags.financialAids}-limit`,
          value: limit,
        },
      },
      [serverCacheTags.financialAids],
    );

    const urlConstruct = `/financial-aids?${urlQuery.toString()}`;

    const response = await brandServerApi.httpClient.request<
      IPaginatedResponse<IFinancialAid>
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
