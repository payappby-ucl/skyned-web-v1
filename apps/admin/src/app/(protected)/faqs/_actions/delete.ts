"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IMessageResponse } from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function deleteFaq(id: number) {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/faq/${id}`,
        "DELETE",
      );

    revalidateTag(serverCacheTags.faq);
    return responseData;
  } catch (error: any) {
    throw brandServerApi.utils.createServerActionError(error);
  }
}
