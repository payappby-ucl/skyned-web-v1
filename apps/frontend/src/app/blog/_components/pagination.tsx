"use client";

import { IPaginatedResponse, IBlogPost } from "@workspace/shared";
import { BrandPagination } from "@workspace/ui/components/brand-pagination";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props {
  data: IPaginatedResponse<IBlogPost>;
  searchParams: URLSearchParams;
}

const BlogPagination: React.FC<Props> = ({ data, searchParams }) => {
  const router = useRouter();

  const goToPage = useCallback(
    (newPage: number) => {
      const urlSearchParams = new URLSearchParams(searchParams);
      urlSearchParams.set("page", `${newPage}`);
      router.push(`/blog?${urlSearchParams.toString()}`);
    },
    [searchParams],
  );

  return (
    <BrandPagination
      goToPage={(newPage) => {
        goToPage(newPage);
      }}
      currentPage={data.currentPage}
      totalCount={data.total}
      perPage={data.perPage}
    />
  );
};
export default BlogPagination;
