"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IMessageResponse } from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function deleteInquiry(id: number) {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/contact/${id}`,
        "DELETE",
      );

    revalidateTag(serverCacheTags.inquiries);
    return responseData;
  } catch (error: any) {
    throw brandServerApi.utils.createServerActionError(error);
  }
}
