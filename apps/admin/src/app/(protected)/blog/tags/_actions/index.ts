"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { ServerActionReturnType, IMessageResponse } from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function deleteTag(
  id: number,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/tags/${id}`,
        "DELETE",
      );

    revalidateTag(serverCacheTags.tags);
    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
