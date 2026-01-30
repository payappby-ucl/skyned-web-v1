import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { IPaginatedResponse, IProgram } from "@workspace/shared";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const urlConstruct = `/programs?${searchParams.toString()}`;

    const response = await brandServerApi.httpClient.request<
      IPaginatedResponse<IProgram>
    >(urlConstruct, "GET", {
      next: {
        tags: [urlConstruct],
      },
    });

    return Response.json(response);
  } catch (error: any) {
    return getErrorResponse(error);
  }
}
