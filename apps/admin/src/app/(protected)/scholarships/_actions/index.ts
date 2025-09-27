"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  CreateScholarshipSchema,
  IMessageResponse,
  ServerActionReturnType,
  UpdateScholarshipSchema,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createScholarship(
  data: CreateScholarshipSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        "/scholarships",
        "POST",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(serverCacheTags.scholarships);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}

export async function updateScholarship(
  slug: string,
  data: UpdateScholarshipSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/scholarships/${slug}`,
        "PUT",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(serverCacheTags.scholarships);
    revalidateTag(`${serverCacheTags.scholarships}-slug-${slug}`);

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}

export async function deleteScholarship(
  slug: string,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/scholarships/${slug}`,
        "DELETE",
      );

    revalidateTag(serverCacheTags.scholarships);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
