"use client";

import DataFetchingHandler from "@/src/components/data-fetching-handler";
import useGet from "@/src/hooks/use-get";
import { IFinancialAid, IPaginatedResponse } from "@workspace/shared";
import { DataTable } from "@workspace/ui/components/table/data-table";
import React from "react";
import { columns } from "../_data/columns";
import usePaginationQuery from "@workspace/ui/hooks/use-pagination-query";

const FinancialAidsList: React.FC = () => {
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<IFinancialAid>
  >({
    queryKey: [
      "financial-aids",
      `financial-aids-page-${pagination.pageIndex}`,
      `financial-aids-limit-${pagination.pageSize}`,
    ],
    url: `/financial-aids?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
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
        />
      ) : null}
      <DataFetchingHandler
        isError={isError}
        isPending={isPending}
        error={error}
      />
    </>
  );
};

export default FinancialAidsList;
