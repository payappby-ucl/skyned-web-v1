import { brandServerApi, getErrorResponse } from "@/src/lib/server";
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

    const urlQuery = brandServerApi.utils.constructQuery({
      ...Object.fromEntries(searchParams),
    });
    const urlConstruct = `/schools/${slug}/programs?${urlQuery.toString()}`;

    const response = await brandServerApi.httpClient.request<
      IPaginatedResponse<IProgram>
    >(urlConstruct, "GET", {
      next: {
        tags: [`${urlConstruct}`],
      },
    });

    return Response.json(response);
  } catch (error: any) {
    return getErrorResponse(error);
  }
}
