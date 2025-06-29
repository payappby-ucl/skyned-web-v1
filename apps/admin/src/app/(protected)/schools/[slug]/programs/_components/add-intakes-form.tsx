"use client";

import DataFetchingHandler from "@/src/components/data-fetching-handler";
import useGet from "@/src/hooks/use-get";
import { IPaginatedResponse, IIntake } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import { DataTable } from "@workspace/ui/components/table/data-table";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { selectIntakeColumns } from "../../../_data/intake-columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

interface Props {
  schoolSlug: string;
  selectedIntakes: IIntake[];
  onChange(isSelected: boolean, intake: IIntake): void;
}

const AddIntakesForm: React.FC<Props> = ({
  schoolSlug,
  selectedIntakes,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const { data, isError, isPending, error } = useGet<
    IPaginatedResponse<IIntake>
  >({
    queryKey: [
      `intakes-${schoolSlug}`,
      `intakes-${schoolSlug}-page-1`,
      `intakes-${schoolSlug}-limit-100`,
    ],

    url: `/schools/${schoolSlug}/intakes?status=active&page=1&limit=100`,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          role="button"
          className="!h-fit !p-1"
        >
          <Plus className="size-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[calc(100vw-100px)]">
        <DialogHeader>
          <DialogTitle className="!text-lg">Select Intakes</DialogTitle>
          <DialogDescription>Select intakes for program</DialogDescription>
        </DialogHeader>
        {data ? (
          <div className="overflow-auto">
            <DataTable
              columns={selectIntakeColumns(selectedIntakes, onChange)}
              data={data.data}
              rowCount={data.total}
              //   pagination={{
              //     hidePagination: false,
              //     pagination,
              //     setPagination,
              //     rowCount: data.total,
              //   }}
            />
          </div>
        ) : null}

        <DataFetchingHandler
          isError={isError}
          isPending={isPending}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddIntakesForm;
