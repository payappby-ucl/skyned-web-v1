"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  CreateAccommodationSchema,
  IAccommodation,
  ServerActionReturnType,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createSchoolAccommodation(
  slug: string,
  data: CreateAccommodationSchema,
): Promise<ServerActionReturnType<IAccommodation>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IAccommodation>(
        `/schools/${slug}/accommodation`,
        "POST",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(serverCacheTags.accommodations);
    revalidateTag(`${serverCacheTags.schools}-slug-${slug}-accommodation`);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}

export async function updateSchoolAccommodation(
  slug: string,
  data: CreateAccommodationSchema,
): Promise<ServerActionReturnType<IAccommodation>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IAccommodation>(
        `/schools/${slug}/accommodation`,
        "PUT",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(serverCacheTags.accommodations);
    revalidateTag(`${serverCacheTags.schools}-slug-${slug}-accommodation`);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
