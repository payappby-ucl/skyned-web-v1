"use client";
import DataFetchingHandler from "@/src/components/data-fetching-handler";
import HasPermission from "@/src/components/has-permission";
import useGet from "@/src/hooks/use-get";
import usePaginationQuery from "@/src/hooks/use-pagination-query";
import { brandClientApi } from "@/src/lib/client";
import { IPaginatedResponse, IProgram } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import { DataTable } from "@workspace/ui/components/table/data-table";
import { FileClock, Plus } from "lucide-react";
import React from "react";
import Link from "next/link";
import { columns } from "../../_data/program-columns";

interface Props {
  slug: string;
}

const ProgramList: React.FC<Props> = ({ slug }) => {
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<IProgram>
  >({
    queryKey: [
      `programs-${slug}`,
      `programs-${slug}-page-${pagination.pageIndex}`,
      `programs-${slug}-limit-${pagination.pageSize}`,
    ],

    url: `/schools/${slug}/programs?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
  });

  console.log(data);

  return (
    <>
      {data ? (
        <DataTable
          columns={columns}
          data={data.data}
          rowCount={data.total}
          pagination={{
            hidePagination: false,
            pagination,
            setPagination,
            rowCount: data.total,
          }}
        >
          <div className="space-x-2">
            <HasPermission
              resourceName="programs"
              action="create"
              args={[{} as any]}
            >
              <Button asChild variant="outline">
                <Link
                  href={`/schools/${slug}/programs/new`}
                  aria-label="Link to create new school profile"
                  className="!text-sm"
                >
                  <Plus />
                  Create Program
                </Link>
              </Button>
            </HasPermission>

            <Button
              asChild
              variant="outline"
              onClick={() =>
                brandClientApi.utils.toast.info("Under Construction")
              }
            >
              <Link
                href="#"
                aria-label="Link to create new FAQ"
                className="!text-sm"
              >
                <FileClock />
                Logs
              </Link>
            </Button>
          </div>
        </DataTable>
      ) : null}

      <DataFetchingHandler
        isError={isError}
        isPending={isPending}
        error={error}
      />
    </>
  );
};

export default ProgramList;
