"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  CreateFaqSchema,
  IFaq,
  ServerActionReturnType,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createFaq(
  data: CreateFaqSchema,
): Promise<ServerActionReturnType<IFaq>> {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IFaq>("/faqs", "POST", {
        body: JSON.stringify(data),
      });

    revalidateTag(serverCacheTags.faqs);
    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
