import HasPermission from "@/src/components/has-permission";
import { brandClientApi } from "@/src/lib/client";
import { ColumnDef } from "@tanstack/react-table";
import { educationLevels, IAdmin, IFaq, IProgram } from "@workspace/shared";
import { DropdownMenuItem } from "@workspace/ui/components/dropdown-menu";
import { DataTableColumnHeader } from "@workspace/ui/components/table/data-table-column-header";
import { DataTableRowActions } from "@workspace/ui/components/table/data-table-row-actions";
import { Eye, EyeIcon, EyeOff, SquarePen } from "lucide-react";
import Link from "next/link";
import Profile from "@/src/components/profile";
import StatusView from "@/src/components/status-view";
import { useProgram } from "../_hooks";

export const columns: ColumnDef<IProgram>[] = [
  {
    id: "actions",
    header: "Actions",
    accessorFn: (row) => row,
    cell: (info) => {
      const { actionOnProgramMutation } = useProgram();
      const program = info.getValue<IProgram>();

      return (
        <DataTableRowActions>
          <HasPermission resourceName="programs" action="read" args={[program]}>
            <DropdownMenuItem asChild>
              <Link
                href={`/schools/${program.school?.slug}/programs/${program.slug}`}
                aria-label={`Link to view ${program.name}'s details`}
              >
                <Eye />
                <span>View</span>
              </Link>
            </DropdownMenuItem>
          </HasPermission>

          <HasPermission
            resourceName="programs"
            action="update"
            args={[{} as any, program]}
          >
            <DropdownMenuItem asChild>
              <Link
                href={`/schools/${program.school?.slug}/programs/${program.slug}/edit`}
                aria-label={`Link to edit ${program.name}`}
              >
                <SquarePen />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
          </HasPermission>

          {program.active ? (
            <HasPermission
              resourceName="programs"
              action="deactivate"
              args={[program]}
            >
              <DropdownMenuItem
                className="text-destructive hover:!text-destructive"
                onClick={() => actionOnProgramMutation.mutate(program)}
              >
                <EyeOff className="text-destructive" />
                <span>Deactivate</span>
              </DropdownMenuItem>
            </HasPermission>
          ) : (
            <HasPermission
              resourceName="programs"
              action="activate"
              args={[program]}
            >
              <DropdownMenuItem
                className="text-green-600 hover:!text-green-600"
                onClick={() => actionOnProgramMutation.mutate(program)}
              >
                <EyeIcon className="text-green-600" />
                <span>Activate</span>
              </DropdownMenuItem>
            </HasPermission>
          )}
        </DataTableRowActions>
      );
    },
  },

  {
    id: "name",
    accessorFn: (row) => row.name,
    header: ({ column }) => (
      <DataTableColumnHeader title="Name" column={column} />
    ),
    cell: (info) => (
      <Link
        href={`/schools/${info.row.original.school?.slug}/programs/${info.row.original.slug}`}
        className="font-semibold capitalize"
      >
        {info.getValue<IProgram["name"]>()}
      </Link>
    ),
  },

  {
    id: "faculty",
    accessorFn: (row) => row.faculty,
    header: ({ column }) => (
      <DataTableColumnHeader title="Faculty" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<IProgram["faculty"]>()}
      </p>
    ),
  },

  {
    id: "degreeType",
    accessorFn: (row) => row.degreeType,
    header: ({ column }) => (
      <DataTableColumnHeader title="Degree" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<IProgram["degreeType"]>() as string}
      </p>
    ),
  },

  {
    id: "status",
    accessorFn: (row) => row.active,
    header: ({ column }) => (
      <DataTableColumnHeader title="Status" column={column} />
    ),
    cell: (info) => <StatusView status={info.getValue<boolean>()} />,
  },

  {
    id: "currency",
    accessorFn: (row) => row.school?.currency,
    header: ({ column }) => (
      <DataTableColumnHeader title="Currency" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<string>() || ""}
      </p>
    ),
  },

  {
    id: "applicationFee",
    accessorFn: (row) => ({
      fee: row.applicationFee,
      currency: row.school?.currency,
    }),
    header: ({ column }) => (
      <DataTableColumnHeader title="Application Fee" column={column} />
    ),
    cell: (info) => {
      const data = info.getValue<{
        fee: IProgram["applicationFee"];
        currency: string;
      }>();

      return (
        <p className="font-semibold capitalize">
          {brandClientApi.utils.formatCurrency({
            amount: data.fee,
            currency: data.currency,
          })}
        </p>
      );
    },
  },

  {
    id: "applicationFeeDiscount",
    accessorFn: (row) => row.applicationFeeDiscount,
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Application Fee Discount (%)"
        column={column}
      />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<IProgram["applicationFeeDiscount"]>()}
      </p>
    ),
  },

  {
    id: "tuitionFee",
    accessorFn: (row) => ({
      fee: row.tuitionFee,
      currency: row.school?.currency,
      unit: row.tuitionFeeType,
    }),
    header: ({ column }) => (
      <DataTableColumnHeader title="Tuition Fee" column={column} />
    ),
    cell: (info) => {
      const data = info.getValue<{
        fee: IProgram["tuitionFee"];
        currency: string;
        unit: IProgram["tuitionFeeType"];
      }>();
      return (
        <p className="font-semibold capitalize">
          {brandClientApi.utils.formatCurrency({
            amount: data.fee,
            currency: data.currency,
          })}{" "}
          ({(data.unit as string).split("_").join(" ")})
        </p>
      );
    },
  },

  {
    id: "minimumEducationLevel",
    accessorFn: (row) => row.minimumEducationLevel,
    header: ({ column }) => (
      <DataTableColumnHeader title="Minimum Education Level" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<IProgram["minimumEducationLevel"]>()}
      </p>
    ),
  },

  {
    id: "minimumEducationDegree",
    accessorFn: (row) => ({
      level: row.minimumEducationLevel,
      degree: row.minimumEducationDegree,
    }),
    header: ({ column }) => (
      <DataTableColumnHeader title="Minimum Education Degree" column={column} />
    ),
    cell: (info) => {
      const data = info.getValue<{
        level: IProgram["minimumEducationLevel"];
        degree: IProgram["minimumEducationDegree"];
      }>();

      const degree = educationLevels[data.level].find(
        (level) => level.levelValue === data.degree,
      );

      return <p className="font-semibold capitalize">{degree?.level}</p>;
    },
  },

  {
    id: "minimumEligibilityGpa",
    accessorFn: (row) => row.minimumEligibilityGpa,
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Minimum Education GPA (%)"
        column={column}
      />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<IProgram["minimumEligibilityGpa"]>()}
      </p>
    ),
  },

  {
    id: "intakes",
    accessorFn: (row) => row.intakes.length,
    header: ({ column }) => (
      <DataTableColumnHeader title="Intakes" column={column} />
    ),
    cell: (info) => {
      return (
        <p className="font-semibold capitalize">{info.getValue<number>()}</p>
      );
    },
  },

  {
    id: "duration",
    accessorFn: (row) => ({
      duration: row.duration,
      timeframe: row.timeframe,
    }),
    header: ({ column }) => (
      <DataTableColumnHeader title="Duration" column={column} />
    ),
    cell: (info) => {
      const data = info.getValue<{
        duration: number;
        timeframe: string;
      }>();
      return (
        <p className="font-semibold capitalize">
          {data.duration} {`${data.timeframe}${data.duration > 1 ? "s" : ""}`}
        </p>
      );
    },
  },

  {
    id: "proficiencies",
    accessorFn: (row) => row.proficiencies.length,
    header: ({ column }) => (
      <DataTableColumnHeader title="Proficiencies" column={column} />
    ),
    cell: (info) => {
      return (
        <p className="font-semibold capitalize">{info.getValue<number>()}</p>
      );
    },
  },

  {
    id: "pgwp",
    accessorFn: (row) => row.pgwp,
    header: ({ column }) => (
      <DataTableColumnHeader title="PGWP" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<IProgram["pgwp"]>() ? "Yes" : "No"}
      </p>
    ),
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
      const createdAt = info.getValue<IFaq["createdAt"]>();
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
      const updatedAt = info.getValue<IFaq["updatedAt"]>();
      return (
        <p className="font-semibold">
          {brandClientApi.date.formatDate(updatedAt)}
        </p>
      );
    },
  },
];
