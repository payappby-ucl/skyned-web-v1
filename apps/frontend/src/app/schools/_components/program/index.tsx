"use client";

import Alert from "@/src/components/alert";
import Loading from "@/src/components/loading";
import useGet from "@/src/hooks/use-get";
import { brandClientApi } from "@/src/lib/client";
import { IPaginatedResponse, IProgram, ISchool } from "@workspace/shared";
import { BrandPagination } from "@workspace/ui/components/brand-pagination";
import usePaginationQuery from "@workspace/ui/hooks/use-pagination-query";
import React, { useMemo, useState } from "react";
import { BookText, GraduationCap } from "lucide-react";
import ProgramCard from "@/src/components/program-card";
import { useRouter } from "next/navigation";
import { SearchFilters } from "@/src/components/search-filters";

export type SchoolProgramListType = IProgram;
interface Props {
  school: ISchool;
}

const SchoolProgramsList: React.FC<Props> = ({ school }) => {
  const { pagination } = usePaginationQuery();
  const router = useRouter();

  const [filters, setFilters] = useState<Record<string, any>>({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize + 2,
  });

  const searchParamsString = useMemo(() => {
    return brandClientApi.utils.getSearchParamsString({
      ...filters,
    });
  }, [filters]);

  const { data, isFetching, error } = useGet<
    IPaginatedResponse<SchoolProgramListType>
  >({
    queryKey: [`school-programs-${searchParamsString}`],
    url: `/schools/${school.slug}/programs?${searchParamsString}`,
    // enabled: false,
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="font-semibold" />
          <p className="font-semibold">{data?.total} Programs</p>
        </div>

        <SearchFilters
          filters={filters}
          setFilters={setFilters}
          schoolLevel
          scrollTo="#school-programs-list"
        />
      </div>

      {!isFetching && !data?.data?.length ? (
        <Alert Icon={BookText} message="No Programs" />
      ) : null}

      {data?.data?.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.data.map((program) => (
            <div key={program.slug}>
              <ProgramCard program={program} />
            </div>
          ))}
        </div>
      ) : null}

      {error ? (
        <Alert message={brandClientApi.utils.handleError(error)} />
      ) : null}
      {isFetching ? <Loading slim /> : null}
      {data?.data.length ? (
        <BrandPagination
          goToPage={(newPage) => {
            setFilters((prevState) => ({
              ...prevState,
              page: newPage,
            }));

            router.push("#school-programs-list");
          }}
          currentPage={data.currentPage}
          totalCount={data.total}
          perPage={data.perPage}
        />
      ) : null}
    </div>
  );
};

export default SchoolProgramsList;
