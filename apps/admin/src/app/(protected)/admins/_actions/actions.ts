"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { ServerActionReturnType, IMessageResponse } from "@workspace/shared";
import { revalidateTag } from "next/cache";

// Deactivate Or Activate
export async function takeActionOnAdmin(
  adminId: string,
  action: "activate" | "deactivate",
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/admins/${adminId}/${action}`,
        "PATCH",
      );

    revalidateTag(serverCacheTags.admins);
    revalidateTag(`${serverCacheTags.admins}-${adminId}`);
    revalidateTag(serverCacheTags.kpi);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
