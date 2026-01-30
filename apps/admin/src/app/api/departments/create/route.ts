import { brandServerApi, getErrorResponse } from "@/src/lib/server";
import { IDepartment } from "@workspace/shared";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await brandServerApi.httpClient.request<
      Pick<IDepartment, "id" | "name">[]
    >("/departments/create", "GET", {
      next: {
        revalidate: 3600,
      },
    });

    return Response.json(response);
  } catch (error: any) {
    return getErrorResponse(error);
  }
}
