"use server";

import { brandServerApi } from "@/src/lib/server";
import { IMessageResponse, ServerActionReturnType } from "@workspace/shared";

export async function subscribeToNewsletter(data: {
  email: string;
}): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        "/newsletters/subscribe",
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
