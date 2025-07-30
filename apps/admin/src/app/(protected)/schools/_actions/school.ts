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

// Create a School
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

// Update a school
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

// Deactivate Or Activate
export async function takeActionOnSchool(
  slug: string,
  action: "activate" | "deactivate",
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/schools/${slug}/${action}`,
        "PATCH",
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
