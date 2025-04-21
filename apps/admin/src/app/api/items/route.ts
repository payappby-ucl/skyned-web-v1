import {
  brandServerApi,
  getErrorResponse,
  setXForwardedForHeader,
} from "@/src/lib/server";

export async function GET(request: Request) {
  try {
    const response = await brandServerApi.httpClient.request<{ name: string }>(
      "/test",
      "GET",
      {
        headers: {
          ...setXForwardedForHeader(request),
        },
      },
    );

    return Response.json(response);
  } catch (error: any) {
    return getErrorResponse(error);
  }
}
