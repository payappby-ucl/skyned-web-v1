"use server";

import { brandServerApi } from "@/src/lib/server";
import { ContactUsSchema, IMessageResponse } from "@workspace/shared";

export async function sendContactUsMessage(data: ContactUsSchema) {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        "/contact",
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
