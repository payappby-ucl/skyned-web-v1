"use client";

import { IPaginatedResponse, ISchool } from "@workspace/shared";
import { BrandPagination } from "@workspace/ui/components/brand-pagination";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props {
  data: IPaginatedResponse<ISchool>;
  searchParams: URLSearchParams;
}

const SchoolPagination: React.FC<Props> = ({ data, searchParams }) => {
  const router = useRouter();

  const goToPage = useCallback(
    (newPage: number) => {
      const urlSearchParams = new URLSearchParams(searchParams);
      urlSearchParams.set("page", `${newPage}`);
      router.push(`/schools?${urlSearchParams.toString()}`);
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
export default SchoolPagination;
