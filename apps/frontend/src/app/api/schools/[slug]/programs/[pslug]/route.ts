import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { IProgram, ISuccessResponse } from "@workspace/shared";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ slug: string; pslug: string }>;
  },
) {
  try {
    const { slug, pslug } = await params;

    const response = await brandServerApi.httpClient.request<
      ISuccessResponse<IProgram>
    >(`/schools/${slug}/programs/${pslug}`, "GET", {
      next: {
        revalidate: 86400,
      },
    });

    return Response.json(response);
  } catch (error: any) {
    return getErrorResponse(error);
  }
}
