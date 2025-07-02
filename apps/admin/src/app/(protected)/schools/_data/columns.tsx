import HasPermission from "@/src/components/has-permission";
import { brandClientApi } from "@/src/lib/client";
import { ColumnDef } from "@tanstack/react-table";
import { IAdmin, IFaq, ISchool } from "@workspace/shared";
import { DropdownMenuItem } from "@workspace/ui/components/dropdown-menu";
import { DataTableColumnHeader } from "@workspace/ui/components/table/data-table-column-header";
import { DataTableRowActions } from "@workspace/ui/components/table/data-table-row-actions";
import { Eye, SquarePen } from "lucide-react";
import Link from "next/link";
import Profile from "@/src/components/profile";
import SchoolProfile from "@/src/components/school-profile";
import StatusView from "@/src/components/status-view";

export const columns: ColumnDef<ISchool>[] = [
  {
    id: "actions",
    header: "Actions",
    accessorFn: (row) => row,
    cell: (info) => {
      const school = info.getValue<ISchool>();

      return (
        <DataTableRowActions>
          <HasPermission resourceName="schools" action="read" args={[school]}>
            <DropdownMenuItem asChild>
              <Link
                href={`/schools/${school.slug}`}
                aria-label={`Link to view school`}
              >
                <Eye />
                <span>View</span>
              </Link>
            </DropdownMenuItem>
          </HasPermission>

          <HasPermission
            resourceName="schools"
            action="update"
            args={[{} as any, school]}
          >
            <DropdownMenuItem asChild>
              <Link
                href={`/schools/${school.slug}/edit`}
                aria-label={`Link to edit school`}
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
    accessorFn: (row) => row,
    header: ({ column }) => (
      <DataTableColumnHeader title="Profile" column={column} />
    ),
    cell: (info) => {
      const school = info.getValue<ISchool>();
      return (
        <HasPermission
          resourceName="schools"
          action="read"
          args={[info.row.original]}
          secondaryComponent={<SchoolProfile school={school} />}
        >
          <SchoolProfile school={school} />
        </HasPermission>
      );
    },
  },

  {
    id: "address",
    accessorFn: (row) => row.address,
    header: ({ column }) => (
      <DataTableColumnHeader title="Address" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<ISchool["address"]>()}
      </p>
    ),
  },

  {
    id: "city",
    accessorFn: (row) => row.city,
    header: ({ column }) => (
      <DataTableColumnHeader title="City" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<ISchool["city"]>()}
      </p>
    ),
  },

  {
    id: "ownershipType",
    accessorFn: (row) => row.ownershipType,
    header: ({ column }) => (
      <DataTableColumnHeader title="Ownership Type" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<ISchool["ownershipType"]>()}
      </p>
    ),
  },

  {
    id: "institutionType",
    accessorFn: (row) => row.institutionType,
    header: ({ column }) => (
      <DataTableColumnHeader title="Institution Type" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<ISchool["institutionType"]>()}
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
    accessorFn: (row) => row.currency,
    header: ({ column }) => (
      <DataTableColumnHeader title="Currency" column={column} />
    ),
    cell: (info) => (
      <p className="font-semibold capitalize">
        {info.getValue<ISchool["currency"]>()}
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
