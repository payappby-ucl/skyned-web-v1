"use client";

import DataFetchingHandler from "@/src/components/data-fetching-handler";
import useGet from "@/src/hooks/use-get";
import usePaginationQuery from "@/src/hooks/use-pagination-query";
import { ICategory, IPaginatedResponse } from "@workspace/shared";
import { DataTable } from "@workspace/ui/components/table/data-table";
import React from "react";
import { columns } from "../_data/column";

const CategoryList: React.FC = () => {
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<ICategory>
  >({
    queryKey: [
      "categories",
      `categories-page-${pagination.pageIndex}`,
      `categories-limit-${pagination.pageSize}`,
    ],
    url: `/categories?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
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
export default CategoryList;
