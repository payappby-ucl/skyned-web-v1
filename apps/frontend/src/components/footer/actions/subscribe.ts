"use server";

import { brandServerApi } from "@/src/lib/server";
import { IMessageResponse } from "@workspace/shared";

export async function subscribeToNewsletter(data: { email: string }) {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        "/newsletter/subscribe",
        "POST",
        {
          body: JSON.stringify(data),
        },
      );

    return responseData;
  } catch (error: any) {
    throw brandServerApi.utils.createServerActionError(error);
  }
}
