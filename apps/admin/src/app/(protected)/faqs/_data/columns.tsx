import HasPermission from "@/src/components/has-permission";
import { brandClientApi } from "@/src/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { IFaq } from "@workspace/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { DropdownMenuItem } from "@workspace/ui/components/dropdown-menu";

import { DataTableColumnHeader } from "@workspace/ui/components/table/data-table-column-header";
import { DataTableRowActions } from "@workspace/ui/components/table/data-table-row-actions";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteFaq } from "../_actions";

export const columns: ColumnDef<IFaq>[] = [
  {
    accessorFn: (row) => row.question,
    id: "question",
    header: ({ column }) => (
      <DataTableColumnHeader title="Question" column={column} />
    ),
    cell: (info) => (
      <p className="truncate font-semibold">
        {info.getValue<IFaq["question"]>()}
      </p>
    ),
  },
  {
    id: "answer",
    accessorFn: (row) => ({ question: row.question, answer: row.answer }),
    header: ({ column }) => (
      <DataTableColumnHeader title="Answer" column={column} />
    ),
    cell: (info) => {
      const { question, answer } =
        info.getValue<Pick<IFaq, "question" | "answer">>();

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-sm">
              <Eye />
              View
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="!text-base">{question}</DialogTitle>
            </DialogHeader>
            <div
              dangerouslySetInnerHTML={{ __html: answer }}
              className="wysiwyg-view"
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "createdBy",
    accessorFn: (row) => row.createdBy,
    header: ({ column }) => (
      <DataTableColumnHeader title="Created By" column={column} />
    ),
    cell: (info) => {
      const createdBy = info.getValue<IFaq["createdBy"]>();

      if (!createdBy) return null;

      return (
        <HasPermission
          resourceName="admins"
          action="read"
          // TODO: Refactor after discussion on who can view admin info
          // TODO: This will also affect details coming from the backend end
          args={[createdBy as any]}
        >
          <Link
            href={`/admins/${createdBy.adminId}`}
            className="flex items-center gap-2"
          >
            <Avatar>
              <AvatarImage
                src={createdBy.primaryImage.url}
                alt={`${createdBy.firstName} ${createdBy.lastName}'s Profile image`}
                className="object-cover"
              />
              <AvatarFallback className="uppercase">
                {createdBy.firstName[0]}
                {createdBy.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="font-semibold">
              <p>
                {createdBy.firstName} {createdBy.lastName}
              </p>
              <p className="text-xs">{createdBy.jobTitle}</p>
            </div>
          </Link>
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
  {
    id: "actions",
    header: "Actions",
    accessorFn: (row) => row,
    cell: (info) => {
      const queryClient = useQueryClient();
      const faq = info.getValue<IFaq>();
      const deleteFaqMutation = useMutation({
        mutationFn: async () => {
          try {
            brandClientApi.utils.toast.promise(deleteFaq(faq.id), {
              loading: "Deleting...",
              success(data) {
                queryClient.invalidateQueries({
                  queryKey: ["faq"],
                });
                return data.message;
              },
              error(error) {
                brandClientApi.utils.alertError(error);
                return error;
              },
            });
          } catch (error) {
            brandClientApi.utils.alertError(error);
          }
        },
      });

      return (
        <DataTableRowActions>
          <HasPermission resourceName="faqs" action="update" args={[faq]}>
            <DropdownMenuItem asChild>
              <Link
                href={`/faqs/${faq.id}`}
                aria-label={`Link to edit faq with id of ${faq.id}`}
              >
                <SquarePen />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
          </HasPermission>
          <HasPermission resourceName="faqs" action="delete" args={[faq]}>
            <DropdownMenuItem
              className="text-destructive hover:!text-destructive"
              onClick={() => deleteFaqMutation.mutate()}
            >
              <Trash2 className="text-destructive" />
              <span>Delete</span>
            </DropdownMenuItem>
          </HasPermission>
        </DataTableRowActions>
      );
    },
  },
];
