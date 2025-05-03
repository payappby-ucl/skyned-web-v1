"use client";

import DataFetchingHandler from "@/src/components/data-fetching-handler";
import useGet from "@/src/hooks/use-get";
import { IFaq, IPaginatedResponse } from "@workspace/shared";
import { DataTable } from "@workspace/ui/components/table/data-table";
import React from "react";
import { columns } from "../_data/columns";
import usePaginationQuery from "@/src/hooks/use-pagination-query";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { FileClock, Plus } from "lucide-react";

const FaqList: React.FC = () => {
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<IPaginatedResponse<IFaq>>({
    queryKey: [
      "faq",
      `faq-page-${pagination.pageIndex}`,
      `faq-limit-${pagination.pageSize}`,
    ],
    url: `/faq?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
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
            <Button asChild variant="outline">
              <Link
                href="/faqs/new"
                aria-label="Link to create new FAQ"
                className="!text-sm"
              >
                <Plus />
                Create FAQ
              </Link>
            </Button>

            <Button asChild variant="outline">
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

export default FaqList;
