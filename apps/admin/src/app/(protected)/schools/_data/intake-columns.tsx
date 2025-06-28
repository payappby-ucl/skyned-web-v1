import HasPermission from "@/src/components/has-permission";
import { brandClientApi } from "@/src/lib/client";
import { ColumnDef } from "@tanstack/react-table";
import { IAdmin, IIntake } from "@workspace/shared";
import { DropdownMenuItem } from "@workspace/ui/components/dropdown-menu";
import { DataTableColumnHeader } from "@workspace/ui/components/table/data-table-column-header";
import { DataTableRowActions } from "@workspace/ui/components/table/data-table-row-actions";
import IntakeForm from "../[slug]/_components/intake-form";
import { Button } from "@workspace/ui/components/button";
import { SquarePen } from "lucide-react";
import Profile from "@/src/components/profile";

export const intakeColumns: (
  setEditIntake: React.Dispatch<React.SetStateAction<IIntake | null>>,
) => ColumnDef<IIntake>[] = (setEditIntake) => [
  {
    id: "actions",
    header: "Actions",
    accessorFn: (row) => row,
    cell: (info) => {
      const intake = info.getValue<IIntake>();

      return (
        <DataTableRowActions>
          <HasPermission
            resourceName="intakes"
            action="update"
            args={[{} as any, intake]}
          >
            <DropdownMenuItem asChild>
              <Button
                onClick={() => setEditIntake(intake)}
                variant="ghost"
                className="w-full justify-start focus:!ring-0"
              >
                <SquarePen />
                <span>Edit</span>
              </Button>
            </DropdownMenuItem>
          </HasPermission>
        </DataTableRowActions>
      );
    },
  },
  {
    id: "intake",
    accessorFn: (row) => row.intake,
    header: ({ column }) => (
      <DataTableColumnHeader title="Intake" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<IIntake["intake"]>()}
      </p>
    ),
  },

  {
    accessorFn: (row) => row.startDate,
    id: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader title="Start Date" column={column} />
    ),
    cell: (info) => {
      const startDate = info.getValue<IIntake["startDate"]>();
      return (
        <p className="font-semibold">
          {brandClientApi.date.formatDate(startDate)}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.deadline,
    id: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader title="Deadline" column={column} />
    ),
    cell: (info) => {
      const deadline = info.getValue<IIntake["deadline"]>();
      return (
        <p className="font-semibold">
          {brandClientApi.date.formatDate(deadline)}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row._count?.programs || 0,
    id: "programCount",
    header: ({ column }) => (
      <DataTableColumnHeader title="Programs" column={column} />
    ),
    cell: (info) => {
      return <p className="font-semibold">{info.getValue<number>()}</p>;
    },
  },

  {
    id: "createdBy",
    accessorFn: (row) => row.createdBy,
    header: ({ column }) => (
      <DataTableColumnHeader title="Created By" column={column} />
    ),
    cell: (info) => {
      const createdBy = info.getValue<IAdmin["createdBy"]>();

      if (!createdBy) return null;

      return <Profile {...createdBy} />;
    },
  },

  {
    accessorFn: (row) => row.createdAt,
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader title="Date Created" column={column} />
    ),
    cell: (info) => {
      const createdAt = info.getValue<IIntake["createdAt"]>();
      return (
        <p className="font-semibold">
          {brandClientApi.date.formatDate(createdAt)}
        </p>
      );
    },
  },
  {
    accessorFn: (row) => row.updatedAt,
    id: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader title="Last Updated" column={column} />
    ),
    cell: (info) => {
      const updatedAt = info.getValue<IIntake["updatedAt"]>();
      return (
        <p className="font-semibold">
          {brandClientApi.date.formatDate(updatedAt)}
        </p>
      );
    },
  },
];
