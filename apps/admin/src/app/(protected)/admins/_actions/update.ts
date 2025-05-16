"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IMessageResponse, UpdateAdminSchema } from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function updateAdmin(adminId: string, data: UpdateAdminSchema) {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/admins/${adminId}`,
        "PUT",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(serverCacheTags.admins);
    revalidateTag(`${serverCacheTags.admins}-id-${adminId}`);
    return responseData;
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
