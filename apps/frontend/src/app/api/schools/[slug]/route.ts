import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { IProgram, ISchool, ISuccessResponse } from "@workspace/shared";
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
    const { slug } = await params;

    const response = await brandServerApi.httpClient.request<
      ISuccessResponse<ISchool>
    >(`/schools/${slug}`, "GET", {
      next: {
        revalidate: 86400,
      },
    });

    return Response.json(response);
  } catch (error: any) {
    return getErrorResponse(error);
  }
}
