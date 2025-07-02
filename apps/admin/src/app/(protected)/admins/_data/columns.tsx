import HasPermission from "@/src/components/has-permission";
import { brandClientApi } from "@/src/lib/client";
import { ColumnDef } from "@tanstack/react-table";
import { IAdmin, IFaq } from "@workspace/shared";
import { DropdownMenuItem } from "@workspace/ui/components/dropdown-menu";
import { DataTableColumnHeader } from "@workspace/ui/components/table/data-table-column-header";
import { DataTableRowActions } from "@workspace/ui/components/table/data-table-row-actions";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import Profile from "@/src/components/profile";
import { AdminListType } from "../_components/admin-list";
import TextCopy from "@/src/components/text-copy";
import CountryDisplay from "@/src/components/country-display";
import StatusView from "@/src/components/status-view";

export const columns: ColumnDef<AdminListType>[] = [
  {
    id: "actions",
    header: "Actions",
    accessorFn: (row) => row,
    cell: (info) => {
      const admin = info.getValue<IAdmin>();

      return (
        <DataTableRowActions>
          <HasPermission
            resourceName="admins"
            action="update"
            args={[{} as any, admin]}
          >
            <DropdownMenuItem asChild>
              <Link
                href={`/admins/${admin.adminId}/edit`}
                aria-label={`Link to edit admin`}
              >
                <SquarePen />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
          </HasPermission>
        </DataTableRowActions>
      );
    },
  },
  {
    id: "profile",
    accessorFn: (row) => ({
      firstName: row.firstName,
      lastName: row.lastName,
      primaryImage: row.primaryImage,
      jobTitle: row.jobTitle,
      adminId: row.adminId,
    }),
    header: ({ column }) => (
      <DataTableColumnHeader title="Profile" column={column} />
    ),
    cell: (info) => {
      const adminInfo = info.getValue<IAdmin["createdBy"]>();

      if (!adminInfo) return null;

      return (
        <HasPermission
          resourceName="admins"
          action="read"
          args={[info.row.original]}
          secondaryComponent={<Profile {...adminInfo} />}
        >
          <Profile {...adminInfo} />
        </HasPermission>
      );
    },
  },
  {
    id: "email",
    accessorFn: (row) => row.email,
    header: ({ column }) => (
      <DataTableColumnHeader title="Email" column={column} />
    ),
    cell: (info) => {
      const email = info.getValue<string>();
      return (
        <TextCopy
          text={email}
          link={{
            prefix: "mailto",
            main: email,
          }}
        />
      );
    },
  },
  {
    id: "status",
    accessorFn: (row) => row.accountSuspended,
    header: ({ column }) => (
      <DataTableColumnHeader title="Account Status" column={column} />
    ),
    cell: (info) => <StatusView status={!info.getValue<boolean>()} />,
  },
  {
    id: "phoneNumber",
    accessorFn: (row) => row.phoneNumber,
    header: ({ column }) => (
      <DataTableColumnHeader title="Phone Number" column={column} />
    ),
    cell: (info) => {
      const phoneNumber = info.getValue<IAdmin["phoneNumber"]>();
      if (!phoneNumber) return null;
      return (
        <TextCopy
          text={phoneNumber.number}
          link={{
            prefix: "tel",
            main: phoneNumber.number,
          }}
        />
      );
    },
  },
  {
    id: "gender",
    accessorFn: (row) => row.gender,
    header: ({ column }) => (
      <DataTableColumnHeader title="Gender" column={column} />
    ),
    cell: (info) => info.getValue<IAdmin["gender"]>(),
  },
  {
    id: "nationality",
    accessorFn: (row) => row.nationality,
    header: ({ column }) => (
      <DataTableColumnHeader title="Nationality" column={column} />
    ),
    cell: (info) => {
      const isoCode = info.getValue<IAdmin["nationality"]>();
      return <CountryDisplay isoCode={isoCode} />;
    },
  },
  {
    id: "countryOfResidence",
    accessorFn: (row) => row.countryOfResidence,
    header: ({ column }) => (
      <DataTableColumnHeader title="Country of Residence" column={column} />
    ),
    cell: (info) => {
      const isoCode = info.getValue<IAdmin["countryOfResidence"]>();
      return <CountryDisplay isoCode={isoCode} />;
    },
  },
  {
    id: "departments",
    accessorFn: (row) => row._count.departments,
    header: ({ column }) => (
      <DataTableColumnHeader title="Departments" column={column} />
    ),
    cell: (info) => info.getValue<number>(),
  },
  {
    id: "teams",
    accessorFn: (row) => row._count.teams,
    header: ({ column }) => (
      <DataTableColumnHeader title="Teams" column={column} />
    ),
    cell: (info) => info.getValue<number>(),
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

      return (
        <HasPermission
          resourceName="admins"
          action="read"
          args={[info.row.original]}
        >
          <Profile {...createdBy} />
        </HasPermission>
      );
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
