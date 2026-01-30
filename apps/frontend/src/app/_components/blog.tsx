export const dynamic = "force-dynamic";

import Link from "next/link";
import React from "react";

import { brandServerApi } from "@/src/lib/server";
import { IPaginatedResponse, IBlogPost } from "@workspace/shared";
import BlogPost from "../blog/_components/post";
import Alert from "@/src/components/alert";

export default async function BlogPosts() {
  try {
    const urlQuery = brandServerApi.utils.constructQuery({
      limit: "3",
    });

    const urlConstruct = `/blogs?${urlQuery.toString()}`;

    const { data } = await brandServerApi.httpClient.request<
      IPaginatedResponse<IBlogPost>
    >(urlConstruct, "GET", {
      next: {
        revalidate: 86400,
      },
    });

    return data.data.length ? (
      <section className="bg-brand-50 space-y-2">
        <header className="flex items-center justify-between">
          <h2>Recent Blog Post</h2>
          <Link
            href="/blog"
            aria-label="View all blog posts"
            className="text-brand text-md font-bold"
          >
            view all
          </Link>
        </header>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.data.map((blogPost) => (
            <BlogPost post={blogPost} key={blogPost.slug} />
          ))}
        </div>
      </section>
    ) : null;
  } catch (error) {
    return <Alert message="Error" />;
  }
}
