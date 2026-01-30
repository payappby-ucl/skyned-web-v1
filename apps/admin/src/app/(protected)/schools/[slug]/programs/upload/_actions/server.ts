"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  IIntake,
  IPaginatedResponse,
  ServerActionReturnType,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function getActiveIntakes(
  schoolSlug: string,
): Promise<ServerActionReturnType<IPaginatedResponse<IIntake>>> {
  try {
    revalidateTag(`${serverCacheTags.intakes}-${schoolSlug}-active`);
    const { data: res } = await brandServerApi.httpClient.request<
      IPaginatedResponse<IIntake>
    >(`/schools/${schoolSlug}/intakes?status=active&limit=100`, "GET", {
      next: {
        tags: [`${serverCacheTags.intakes}-${schoolSlug}-active`],
      },
    });

    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
