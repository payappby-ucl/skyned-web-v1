"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  CreateSchoolSchema,
  IMessageResponse,
  ServerActionReturnType,
  UpdateSchoolSchema,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function updateSchool(
  slug: string,
  data: UpdateSchoolSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/schools/${slug}`,
        "PUT",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(serverCacheTags.schools);
    revalidateTag(`${serverCacheTags.schools}-slug-${slug}`);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
