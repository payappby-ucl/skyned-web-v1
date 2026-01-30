"use server";

import { brandServerApi } from "@/src/lib/server";
import {
  ContactUsSchema,
  IMessageResponse,
  ServerActionReturnType,
} from "@workspace/shared";

export async function sendContactUsMessage(
  data: ContactUsSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        "/contacts",
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
