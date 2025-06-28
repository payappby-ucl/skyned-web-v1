"use client";
import DataFetchingHandler from "@/src/components/data-fetching-handler";
import HasPermission from "@/src/components/has-permission";
import useGet from "@/src/hooks/use-get";
import usePaginationQuery from "@/src/hooks/use-pagination-query";
import { brandClientApi } from "@/src/lib/client";
import { IIntake, IPaginatedResponse } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import { DataTable } from "@workspace/ui/components/table/data-table";
import { Plus, FileClock } from "lucide-react";
import React, { useState } from "react";
import { intakeColumns } from "../../_data/intake-columns";
import Link from "next/link";
import IntakeForm from "./intake-form";

interface Props {
  slug: string;
}

const IntakeList: React.FC<Props> = ({ slug }) => {
  const [editIntake, setEditIntake] = useState<IIntake | null>(null);
  const { pagination, setPagination } = usePaginationQuery();

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<IIntake>
  >({
    queryKey: [
      `intakes-${slug}`,
      `intakes-${slug}-page-${pagination.pageIndex}`,
      `intakes-${slug}-limit-${pagination.pageSize}`,
    ],

    url: `/schools/${slug}/intakes?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
  });

  return (
    <>
      {data ? (
        <DataTable
          columns={intakeColumns(setEditIntake)}
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
              resourceName="intakes"
              action="create"
              args={[{} as any]}
            >
              <IntakeForm slug={slug} />
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

      {editIntake ? (
        <IntakeForm
          intake={editIntake || undefined}
          slug={slug}
          setEditIntake={setEditIntake}
        />
      ) : null}
    </>
  );
};

export default IntakeList;
