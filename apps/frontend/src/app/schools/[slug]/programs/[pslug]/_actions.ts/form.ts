"use server";

import { brandServerApi } from "@/src/lib/server";
import {
  ApplyFormSchema,
  IMessageResponse,
  ServerActionReturnType,
} from "@workspace/shared";

export async function submitLead(
  data: ApplyFormSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        "/leads",
        "POST",
        {
          body: JSON.stringify(data),
        },
      );
    return {
      success: true,
      data: responseData,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
