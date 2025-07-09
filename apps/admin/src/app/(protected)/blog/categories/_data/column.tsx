import HasPermission from "@/src/components/has-permission";
import Profile from "@/src/components/profile";
import { brandClientApi } from "@/src/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ICategory } from "@workspace/shared";
import { DropdownMenuItem } from "@workspace/ui/components/dropdown-menu";
import { DataTableColumnHeader } from "@workspace/ui/components/table/data-table-column-header";
import { DataTableRowActions } from "@workspace/ui/components/table/data-table-row-actions";
import { Trash2 } from "lucide-react";
import { deleteCategory } from "../_actions";

export const columns: ColumnDef<ICategory>[] = [
  {
    id: "actions",
    header: "Actions",
    accessorFn: (row) => row,
    cell: (info) => {
      const queryClient = useQueryClient();
      const category = info.getValue<ICategory>();

      const deleteCategoryMutation = useMutation({
        mutationFn: async () => {
          try {
            brandClientApi.utils.toast.promise(
              async () => {
                const res = await deleteCategory(category.id);
                const resData =
                  brandClientApi.utils.handleServerActionResponse(res);
                return resData;
              },
              {
                loading: "Deleting...",
                success(data) {
                  queryClient.invalidateQueries({
                    queryKey: ["categories"],
                  });
                  return data.message;
                },
                error(error) {
                  brandClientApi.utils.alertError(error);
                  return error;
                },
              },
            );
          } catch (error) {
            brandClientApi.utils.alertError(error);
          }
        },
      });

      return (
        <DataTableRowActions>
          <HasPermission
            resourceName="categories"
            action="delete"
            args={[category]}
          >
            <DropdownMenuItem
              className="text-destructive hover:!text-destructive"
              onClick={() => deleteCategoryMutation.mutate()}
            >
              <Trash2 className="text-destructive" />
              <span>Delete</span>
            </DropdownMenuItem>
          </HasPermission>
        </DataTableRowActions>
      );
    },
  },

  {
    accessorFn: (row) => row.name,
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader title="Name" column={column} />
    ),
    cell: (info) => (
      <p className="truncate font-semibold capitalize">
        {info.getValue<string>()}
      </p>
    ),
  },

  {
    accessorFn: (row) => row._count?.posts || 0,
    id: "posts",
    header: ({ column }) => (
      <DataTableColumnHeader title="Posts" column={column} />
    ),
    cell: (info) => (
      <p className="truncate font-semibold capitalize">
        {info.getValue<number>()}
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
      const createdBy = info.getValue<ICategory["createdBy"]>();

      if (!createdBy) return null;

      return (
        <HasPermission
          resourceName="admins"
          action="read"
          args={[info.row.original.createdBy as any]}
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
      const createdAt = info.getValue<ICategory["createdAt"]>();
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
      const updatedAt = info.getValue<ICategory["updatedAt"]>();
      return (
        <p className="font-semibold">
          {brandClientApi.date.formatDate(updatedAt)}
        </p>
      );
    },
  },
];
