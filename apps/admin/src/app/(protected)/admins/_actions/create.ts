"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { CreateAdminSchema, IAdmin } from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createAdmin(data: CreateAdminSchema) {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IAdmin>("/admins", "POST", {
        body: JSON.stringify(data),
      });

    revalidateTag(serverCacheTags.admins);
    return responseData;
  } catch (error: any) {
    throw brandServerApi.utils.createServerActionError(error);
  }
}
