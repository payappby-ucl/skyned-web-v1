"use client";

import Alert from "@/src/components/alert";
import Loading from "@/src/components/loading";
import ProgramCard from "@/src/components/program-card";
import useGet from "@/src/hooks/use-get";
import { brandClientApi } from "@/src/lib/client";
import { DEFAULT_PAGINATION_LIMIT } from "@/src/utils";
import { IPaginatedResponse, IProgram } from "@workspace/shared";
import { BrandPagination } from "@workspace/ui/components/brand-pagination";
import { BookText } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

export type ProgramListType = IProgram;
interface Props {
  searchParams: URLSearchParams;
  data: IPaginatedResponse<IProgram>;
}

const ProgramList: React.FC<Props> = ({
  searchParams,
  data: firstPageData,
}) => {
  const [initial, setInitial] = useState(true);
  const sParams = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const router = useRouter();
  const [filters, setFilters] = useState<Record<string, any>>({
    ...Object.entries(searchParams.entries),
    page: Number(sParams.get("page") || 0),
    limit: Number(sParams.get("limit") || DEFAULT_PAGINATION_LIMIT),
  });

  const searchParamsString = useMemo(() => {
    const queries = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queries.append(key, value);
      }
    });
    return queries.toString();
  }, [filters]);

  const { data, isPending, error } = useGet<
    IPaginatedResponse<ProgramListType>
  >({
    queryKey: ["programs", searchParamsString],
    url: `/search?${searchParamsString}`,
    enabled: !initial,
  });

  console.log(filters);

  return (
    <div className="space-y-10">
      {isPending && !initial ? <Loading slim /> : null}
      {(data || firstPageData)?.data?.length ? (
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {(data || firstPageData).data.map((program, index) => (
            <div
              key={`${program.slug}-${index}`}
              className="mb-4 break-inside-avoid-column"
            >
              <ProgramCard program={program} />
            </div>
          ))}
        </div>
      ) : null}

      {!isPending && !(data || firstPageData)?.data?.length ? (
        <Alert Icon={BookText} message="No Programs" />
      ) : null}

      {error ? (
        <Alert message={brandClientApi.utils.handleError(error)} />
      ) : null}

      {(data || firstPageData)?.data.length ? (
        <BrandPagination
          goToPage={(newPage) => {
            if (initial) {
              setInitial(false);
            }
            setFilters((prevState) => ({
              ...prevState,
              page: newPage,
            }));
            router.push("#programs-list");
          }}
          currentPage={(data || firstPageData).currentPage}
          totalCount={(data || firstPageData).total}
          perPage={(data || firstPageData).perPage}
        />
      ) : null}
    </div>
  );
};

export default ProgramList;
