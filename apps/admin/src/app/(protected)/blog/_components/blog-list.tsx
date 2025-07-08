"use client";

import DataFetchingHandler from "@/src/components/data-fetching-handler";
import HasPermission from "@/src/components/has-permission";
import useGet from "@/src/hooks/use-get";
import usePaginationQuery from "@/src/hooks/use-pagination-query";
import { IBlogPost, IPaginatedResponse } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import { BrandPagination } from "@workspace/ui/components/brand-pagination";
import { NotebookText } from "lucide-react";
import Link from "next/link";
import React from "react";
import BlogPost from "./blog-post";

const BlogList: React.FC = () => {
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<IBlogPost>
  >({
    queryKey: [
      "blogs",
      `blogs-page-${pagination.pageIndex}`,
      `blogs-limit-${pagination.pageSize}`,
    ],
    url: `/blogs?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
  });

  return (
    <section className="space-y-5 !p-0">
      <header className="flex items-center justify-between">
        <h1 className="!text-3xl">Blog Posts</h1>
        <HasPermission resourceName="blogs" action="create" args={[{} as any]}>
          <Button asChild variant={"outline"}>
            <Link href="/blog/new">
              {" "}
              <NotebookText /> Create
            </Link>
          </Button>
        </HasPermission>
      </header>
      {data?.data.length ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((blogPost) => (
              <HasPermission
                resourceName="blogs"
                action="read"
                args={[blogPost]}
                key={blogPost.slug}
              >
                <BlogPost post={blogPost} />
              </HasPermission>
            ))}
          </div>

          <BrandPagination
            goToPage={(newPage) =>
              setPagination((prevState) => ({
                ...prevState,
                pageIndex: newPage - 1,
              }))
            }
            currentPage={data.currentPage}
            totalCount={data.total}
            perPage={data.perPage}
          />
        </div>
      ) : null}
      {!data?.total && !isPending ? (
        <div className="text-muted-foreground flex h-full flex-row items-center justify-center gap-2 rounded-md border py-4">
          <NotebookText size={15} />
          <p className="text-sm">No Data</p>
        </div>
      ) : null}
      <DataFetchingHandler
        isError={isError}
        isPending={isPending}
        error={error}
      />
    </section>
  );
};

export default BlogList;
