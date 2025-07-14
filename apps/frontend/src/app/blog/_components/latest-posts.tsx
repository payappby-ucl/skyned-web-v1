import { IBlogPost, IPaginatedResponse } from "@workspace/shared";
import BlogPost from "./post";
import BlogPagination from "./pagination";
import BrowseByCategories from "./categories";
import { NotebookText } from "lucide-react";

interface Props {
  data: IPaginatedResponse<IBlogPost>;
  searchParams: URLSearchParams;
}
export function LatestPosts({ data, searchParams }: Props) {
  return (
    <section className="grid grid-cols-1 gap-5 !p-0 md:grid-cols-5">
      <BrowseByCategories searchParams={searchParams} />
      <div className="space-y-10 md:col-span-4">
        <header>
          <h2>Latest Posts</h2>
        </header>
        <div className="hide-scrollbar grid h-screen grid-cols-1 items-start gap-8 overflow-x-hidden overflow-y-scroll md:grid-cols-2 lg:grid-cols-3">
          {data.data.map((blogPost) => (
            <BlogPost post={blogPost} key={blogPost.slug} />
          ))}
        </div>
        <BlogPagination data={data} searchParams={searchParams} />
        {!data?.total || !data.data.length ? (
          <div className="text-muted-foreground flex flex-row items-center justify-center gap-2 rounded-md border py-4">
            <NotebookText size={15} />
            <p className="text-sm">No Data</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
