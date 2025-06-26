"use client";

import DataFetchingHandler from "@/src/components/data-fetching-handler";
import useGet from "@/src/hooks/use-get";
import { IAdmin, IFaq, IPaginatedResponse } from "@workspace/shared";
import { DataTable } from "@workspace/ui/components/table/data-table";
import React from "react";
import { columns } from "../_data/columns";
import usePaginationQuery from "@/src/hooks/use-pagination-query";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { FileClock, Plus } from "lucide-react";
import { brandClientApi } from "@/src/lib/client";
import HasPermission from "@/src/components/has-permission";

export type AdminListType = IAdmin & {
  _count: {
    departments: number;
    teams: number;
  };
};

// console.log(
//   brandClientApi.date.humanizeDuration(
//     brandClientApi.date.createDuration(40, "months"),
//   ),
// );

const AdminList: React.FC = () => {
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<AdminListType>
  >({
    queryKey: [
      "admins",
      `admins-page-${pagination.pageIndex}`,
      `admins-limit-${pagination.pageSize}`,
    ],
    url: `/admins?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
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
              resourceName="admins"
              action="create"
              args={[{} as any]}
            >
              <Button asChild variant="outline">
                <Link
                  href="/admins/new"
                  aria-label="Link to create new account"
                  className="!text-sm"
                >
                  <Plus />
                  Create Account
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

export default AdminList;
