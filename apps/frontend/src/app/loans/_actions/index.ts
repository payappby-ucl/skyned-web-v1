"use server";

import { brandServerApi } from "@/src/lib/server";
import {
  FinancialAidSchema,
  IMessageResponse,
  ServerActionReturnType,
} from "@workspace/shared";

export async function submitFinancialAidApplication(
  data: FinancialAidSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: responseData } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        "/financial-aids",
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
