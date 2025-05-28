"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  CreateAccommodationSchema,
  CreateIntakeSchema,
  IAccommodation,
  IIntake,
  IMessageResponse,
  ServerActionReturnType,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createSchoolIntake(
  slug: string,
  data: CreateIntakeSchema,
): Promise<ServerActionReturnType<IIntake>> {
  try {
    const { data: res } = await brandServerApi.httpClient.request<IIntake>(
      `/schools/${slug}/intakes`,
      "POST",
      {
        body: JSON.stringify(data),
      },
    );

    revalidateTag(serverCacheTags.intakes);
    revalidateTag(`${serverCacheTags.intakes}-${slug}`);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}

export async function updateSchoolIntake(
  id: number,
  slug: string,
  data: CreateIntakeSchema,
): Promise<ServerActionReturnType<IIntake>> {
  try {
    const { data: res } = await brandServerApi.httpClient.request<IIntake>(
      `/schools/${slug}/intakes/${id}`,
      "PUT",
      {
        body: JSON.stringify(data),
      },
    );

    revalidateTag(serverCacheTags.intakes);
    revalidateTag(`${serverCacheTags.intakes}-${slug}`);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
