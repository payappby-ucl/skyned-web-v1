import { brandServerApi } from "@/src/lib/server";
import { IPaginatedResponse, IBlogPost } from "@workspace/shared";
import { redirect } from "next/navigation";
import BlogPost from "./post";

export async function FeaturedBlogPosts() {
  const urlQuery = brandServerApi.utils.constructQuery({
    limit: "3",
    f: "true",
  });

  const urlConstruct = `/blogs?${urlQuery.toString()}`;

  const { data } = await brandServerApi.httpClient.request<
    IPaginatedResponse<IBlogPost>
  >(urlConstruct, "GET", {
    next: {
      revalidate: 3600,
    },
  });

  const [first, ...rest] = data.data;

  return data.data.length ? (
    <section className="space-y-10 !p-0 lg:mx-auto lg:max-w-5xl">
      <header>
        <h2>Featured Posts</h2>
      </header>
      <div className="mx-auto grid gap-8 lg:grid-cols-2">
        {first ? <BlogPost post={first} /> : null}
        {rest.length ? (
          <div className="grid grid-cols-1 gap-8 self-center">
            {rest.map((blogPost) => (
              <BlogPost post={blogPost} key={blogPost.slug} col />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  ) : null;
}
