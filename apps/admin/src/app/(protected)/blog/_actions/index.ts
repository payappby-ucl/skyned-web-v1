"use server";

import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import {
  BlogPostSchema,
  IMessageResponse,
  ServerActionReturnType,
  UpdateBlogPostSchema,
} from "@workspace/shared";
import { revalidateTag } from "next/cache";

export async function createBlogPost(
  data: BlogPostSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        "/blogs",
        "POST",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(serverCacheTags.blogs);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}

export async function updateBlogPost(
  slug: string,
  data: UpdateBlogPostSchema,
): Promise<ServerActionReturnType<IMessageResponse>> {
  try {
    const { data: res } =
      await brandServerApi.httpClient.request<IMessageResponse>(
        `/blogs/${slug}`,
        "PUT",
        {
          body: JSON.stringify(data),
        },
      );

    revalidateTag(serverCacheTags.blogs);
    revalidateTag(`${serverCacheTags.blogs}-slug-${slug}`);
    return {
      success: true,
      data: res,
    };
  } catch (error: any) {
    return brandServerApi.utils.createServerActionError(error);
  }
}
