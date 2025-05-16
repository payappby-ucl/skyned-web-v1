"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  CreateFaqSchema,
  IFaq,
  ServerActionReturnType,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function updateFaq(
  id: number,
  data: CreateFaqSchema,
): Promise<ServerActionReturnType<IFaq>> {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IFaq>(`/faqs/${id}`, "PUT", {
        body: JSON.stringify(data),
      });

    revalidateTag(serverCacheTags.faqs);
    revalidateTag(`${serverCacheTags.faqs}-id-${id}`);
    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
