"use client";

import DataFetchingHandler from "@/src/components/data-fetching-handler";
import useGet from "@/src/hooks/use-get";
import { IAdmin, IFaq, IPaginatedResponse, ISchool } from "@workspace/shared";
import { DataTable } from "@workspace/ui/components/table/data-table";
import React from "react";
import usePaginationQuery from "@/src/hooks/use-pagination-query";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { FileClock, Plus } from "lucide-react";
import { brandClientApi } from "@/src/lib/client";
import HasPermission from "@/src/components/has-permission";
import { columns } from "../_data/columns";

const SchoolList: React.FC = () => {
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<ISchool>
  >({
    queryKey: [
      "schools",
      `schools-page-${pagination.pageIndex}`,
      `schools-limit-${pagination.pageSize}`,
    ],
    url: `/schools?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
  });

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
              resourceName="schools"
              action="create"
              args={[{} as any]}
            >
              <Button asChild variant="outline">
                <Link
                  href="/schools/new"
                  aria-label="Link to create new school profile"
                  className="!text-sm"
                >
                  <Plus />
                  Create School
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

export default SchoolList;
