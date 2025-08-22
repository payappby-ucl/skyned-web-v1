"use client";

import Alert from "@/src/components/alert";
import Loading from "@/src/components/loading";
import useGet from "@/src/hooks/use-get";
import { brandClientApi } from "@/src/lib/client";
import { IPaginatedResponse, IProgram, ISchool } from "@workspace/shared";
import { BrandPagination } from "@workspace/ui/components/brand-pagination";
import usePaginationQuery from "@workspace/ui/hooks/use-pagination-query";
import React from "react";
import { BookText } from "lucide-react";
import ProgramCard from "@/src/components/program-card";
import { useRouter } from "next/navigation";

export type SchoolProgramListType = IProgram;
interface Props {
  school: ISchool;
}

const SchoolProgramsList: React.FC<Props> = ({ school }) => {
  const { pagination, setPagination } = usePaginationQuery();
  const router = useRouter();

  const { data, isPending, error } = useGet<
    IPaginatedResponse<SchoolProgramListType>
  >({
    queryKey: [
      "school-programs",
      `school-programs-page-${pagination.pageIndex}`,
      `school-programs-limit-${pagination.pageSize}`,
    ],
    url: `/schools/${school.slug}/programs?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize + 2}`,
  });

  return (
    <div className="space-y-5">
      {data?.data?.length ? (
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {data.data.map((program) => (
            <div key={program.slug} className="mb-4 break-inside-avoid-column">
              <ProgramCard program={program} />
            </div>
          ))}
        </div>
      ) : null}

      {!isPending && !data?.data?.length ? (
        <Alert Icon={BookText} message="No Programs" />
      ) : null}

      {error ? (
        <Alert message={brandClientApi.utils.handleError(error)} />
      ) : null}
      {isPending ? <Loading /> : null}
      {data?.data.length ? (
        <BrandPagination
          goToPage={(newPage) => {
            setPagination((prevState) => ({
              ...prevState,
              pageIndex: newPage - 1,
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
