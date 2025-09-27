"use client";

import DataFetchingHandler from "@/src/components/data-fetching-handler";
import HasPermission from "@/src/components/has-permission";
import useGet from "@/src/hooks/use-get";
import usePaginationQuery from "@workspace/ui/hooks/use-pagination-query";
import { IPaginatedResponse, IScholarship } from "@workspace/shared";
import { BrandPagination } from "@workspace/ui/components/brand-pagination";
import { Award } from "lucide-react";
import React from "react";
import ScholarshipLinks from "./links";
import ScholarshipPost from "./scholarship-post";

const ScholarshipList: React.FC = () => {
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<IScholarship>
  >({
    queryKey: [
      "scholarships",
      `scholarships-page-${pagination.pageIndex}`,
      `scholarships-limit-${pagination.pageSize}`,
    ],
    url: `/scholarships?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
  });

  return (
    <section className="space-y-5 !p-0">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="!text-3xl">Scholarships & Awards</h1>
        <ScholarshipLinks />
      </header>
      {data?.data.length ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((scholarship) => (
              <HasPermission
                resourceName="scholarships"
                action="read"
                args={[scholarship]}
                key={scholarship.slug}
              >
                <ScholarshipPost scholarship={scholarship} />
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
        <div className="text-muted-foreground flex h-full flex-row items-center justify-center gap-2 py-4">
          <Award size={15} />
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

export default ScholarshipList;
