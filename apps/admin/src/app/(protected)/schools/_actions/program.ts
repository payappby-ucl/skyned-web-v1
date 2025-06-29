"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  CreateProgramSchema,
  IMessageResponse,
  ServerActionReturnType,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createProgram(
  schoolSlug: string,
  data: CreateProgramSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/schools/${schoolSlug}/programs`,
        "POST",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(`${serverCacheTags.programs}-${schoolSlug}`);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}

export async function updateProgram(
  schoolSlug: string,
  programSlug: string,
  data: CreateProgramSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/schools/${schoolSlug}/programs/${programSlug}`,
        "PUT",
        {
          body: JSON.stringify(data.data),
        },
      );

    revalidateTag(
      `${serverCacheTags.schools}-${schoolSlug}-programs-${programSlug}`,
    );
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
