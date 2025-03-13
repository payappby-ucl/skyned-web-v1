import { brandServerApi, getErrorResponse } from "@/src/lib/server";

export async function GET() {
  try {
    const response = await brandServerApi.httpClient.request<{ name: string }>(
      "/test",
      "GET",
    );

    return Response.json(response);
  } catch (error: any) {
    return getErrorResponse(error);
  }
}
