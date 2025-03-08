import { brandApi } from "@/src/lib";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await brandApi.httpClient.axios.v1.get<{ name: string }>(
      "/test",
    );

    return NextResponse.json(
      {
        data,
      },
      { status: 200 },
    );
  } catch (error: any) {
    let { statusCode, message } = brandApi.error.handleError(error);
    if (statusCode === 500) {
      message = "Unexpected error occurred";
    }
    return new NextResponse(message, { status: statusCode });
  }
}
