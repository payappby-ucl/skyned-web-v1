"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { CreateFaqSchema, IFaq } from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createFaq(data: CreateFaqSchema) {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IFaq>("/faqs", "POST", {
        body: JSON.stringify(data),
      });

    revalidateTag(serverCacheTags.faq);
    return responseData;
  } catch (error: any) {
    throw brandServerApi.utils.createServerActionError(error);
  }
}
