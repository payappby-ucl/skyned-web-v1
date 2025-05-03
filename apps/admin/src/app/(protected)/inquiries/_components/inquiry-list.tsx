"use client";

import DataFetchingHandler from "@/src/components/data-fetching-handler";
import useGet from "@/src/hooks/use-get";
import { IInquiry, IPaginatedResponse } from "@workspace/shared";
import { DataTable } from "@workspace/ui/components/table/data-table";
import React from "react";
import { columns } from "../_data/columns";
import usePaginationQuery from "@/src/hooks/use-pagination-query";

const InquiryList: React.FC = () => {
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<IInquiry>
  >({
    queryKey: [
      "inquiries",
      `inquiries-page-${pagination.pageIndex}`,
      `inquiries-limit-${pagination.pageSize}`,
    ],
    url: `/inquiries?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
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

export default InquiryList;
