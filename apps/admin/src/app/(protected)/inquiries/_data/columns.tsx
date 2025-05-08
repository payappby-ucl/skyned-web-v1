"use client";
import HasPermission from "@/src/components/has-permission";
import { brandClientApi } from "@/src/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { IInquiry } from "@workspace/shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@workspace/ui/components/dropdown-menu";

import { DataTableColumnHeader } from "@workspace/ui/components/table/data-table-column-header";
import { DataTableRowActions } from "@workspace/ui/components/table/data-table-row-actions";
import { Clipboard, Contact, Mail, Phone, Trash2 } from "lucide-react";
import { deleteInquiry } from "../_actions";

export const columns: ColumnDef<IInquiry>[] = [
  {
    accessorFn: (row) => row.name,
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader title="Name" column={column} />
    ),
    cell: (info) => info.getValue<IInquiry["name"]>(),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader title="Email" column={column} />
    ),
  },
  {
    accessorFn: (row) => row.phoneNumber,
    id: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader title="Phone Number" column={column} />
    ),
    cell: (info) => {
      const phoneNumber = info.getValue<IInquiry["phoneNumber"]>();
      const country = brandClientApi.location.getCountryByISOCode(
        phoneNumber.country || "",
      );
      return (
        <div className="flex items-center gap-2">
          {country ? <span>{country.flag}</span> : null}
          <p className="font-semibold">{phoneNumber.number}</p>
        </div>
      );
    },
  },
  {
    id: "subject",
    accessorFn: (row) => row.subject,
    header: ({ column }) => (
      <DataTableColumnHeader title="Subject" column={column} />
    ),
    cell: (info) => (
      <p className="max-w-sm truncate font-semibold">
        {info.getValue<string>()}
      </p>
    ),
  },
  {
    id: "message",
    accessorFn: (row) => ({ message: row.message, subject: row.subject }),
    header: "Message",
    cell: (info) => {
      const data = info.getValue<Pick<IInquiry, "message" | "subject">>();
      return (
        <Dialog>
          <DialogTrigger>
            <p className="max-w-sm truncate font-semibold">{data.message}</p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="!text-lg">{data.subject}</DialogTitle>
              <DialogDescription className="font-medium leading-5">
                {data.message}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
      const createdAt = info.getValue<IInquiry["createdAt"]>();
      return (
        <p className="font-semibold">
          {brandClientApi.date.formatDate(createdAt)}
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
      const inquiry = info.getValue<IInquiry>();
      const deleteInquiryMutation = useMutation({
        mutationFn: async () => {
          try {
            brandClientApi.utils.toast.promise(deleteInquiry(inquiry.id), {
              loading: "Deleting...",
              success(data) {
                queryClient.invalidateQueries({
                  queryKey: ["inquiries"],
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
          <HasPermission
            resourceName="inquiries"
            action="delete"
            args={[inquiry]}
          >
            <DropdownMenuItem
              className="text-destructive hover:!text-destructive"
              onClick={() => deleteInquiryMutation.mutate()}
            >
              <Trash2 className="text-destructive" />
              <span>Delete</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </HasPermission>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <Contact size={17} className="text-muted-foreground" />
                <span>Connect</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail />
                    <a href={`mailto:${inquiry.email}`}>Send Mail</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Phone />
                    <a href={`tel:${inquiry.phoneNumber.number}`}>Call</a>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() =>
                brandClientApi.utils.copyToClipboard(inquiry.email)
              }
            >
              <Clipboard />
              <span>Copy Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                brandClientApi.utils.copyToClipboard(
                  inquiry.phoneNumber.number,
                  "Phone number",
                )
              }
            >
              <Clipboard />
              <span>Copy Number</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                brandClientApi.utils.copyToClipboard(inquiry.message, "Message")
              }
            >
              <Clipboard />
              <span>Copy Message</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DataTableRowActions>
      );
    },
  },
];
