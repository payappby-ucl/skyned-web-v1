"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IMessageResponse, ServerActionReturnType } from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function deleteInquiry(
  id: number,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/contacts/${id}`,
        "DELETE",
      );

    revalidateTag(serverCacheTags.inquiries);
    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
