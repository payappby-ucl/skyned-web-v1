// export const dynamic = "force-dynamic";

import { brandServerApi } from "@/src/lib/server";
import { IBlogPost, ICategory, IPaginatedResponse } from "@workspace/shared";
import BlogPost from "../../_components/post";

interface Props {
  categories: ICategory[];
}
export default async function RelatedPosts({ categories }: Props) {
  const urlQuery = brandServerApi.utils.constructQuery({
    limit: "6",
    c: categories[0]?.name || null,
  });

  const urlConstruct = `/blogs?${urlQuery.toString()}`;

  const { data } = await brandServerApi.httpClient.request<
    IPaginatedResponse<IBlogPost>
  >(urlConstruct, "GET", {
    next: {
      revalidate: 3600,
    },
  });

  return data.data.length ? (
    <section className="mx-auto max-w-6xl space-y-10 !p-0">
      <header>
        <h2>Related Posts</h2>
      </header>
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.data.map((blogPost) => (
          <BlogPost post={blogPost} key={blogPost.slug} />
        ))}
      </div>
    </section>
  ) : null;
}
