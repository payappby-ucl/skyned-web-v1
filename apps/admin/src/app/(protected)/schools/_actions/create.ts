"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  CreateSchoolSchema,
  IMessageResponse,
  ServerActionReturnType,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createSchool(
  data: CreateSchoolSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        "/schools",
        "POST",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(serverCacheTags.schools);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
