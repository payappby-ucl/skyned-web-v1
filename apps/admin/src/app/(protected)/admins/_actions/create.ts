"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { CreateAdminSchema, IAdmin } from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createAdmin(data: CreateAdminSchema) {
  try {
    const { data: admin } = await brandServerApi.httpClient.request<IAdmin>(
      "/admins",
      "POST",
      {
        body: JSON.stringify(data),
      },
    );

    revalidateTag(serverCacheTags.admins);
    return admin;
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
