"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  CreateAdminSchema,
  IAdmin,
  ServerActionReturnType,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createAdmin(
  data: CreateAdminSchema,
): Promise<ServerActionReturnType<IAdmin>> {
  try {
    const { data: admin } = await brandServerApi.httpClient.request<IAdmin>(
      "/admins",
      "POST",
      {
        body: JSON.stringify(data),
      },
    );

    revalidateTag(serverCacheTags.admins);
    return {
      success: true,
      data: admin,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
