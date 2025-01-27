import { firebaseServer } from "@/firebase/server";
import { ISuccessResponse } from "@skyned/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await firebaseServer.httpClient.v1.get<{ name: string }>(
      "/test",
    );

    console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error.config);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
