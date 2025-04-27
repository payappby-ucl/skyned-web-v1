import HasPermission from "@/src/components/has-permission";
import useClipboard from "@/src/hooks/use-clipboard";
import { ColumnDef } from "@tanstack/react-table";
import { IInquiry } from "@workspace/shared";
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
import { Country } from "country-state-city";
import dayjs from "dayjs";
import { Clipboard, Contact, Mail, Phone, Trash2 } from "lucide-react";

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
      const country = Country.getCountryByCode(phoneNumber.country || "");
      return (
        <div className="flex items-center gap-2">
          {country ? <span>{country.flag}</span> : null}
          <p className="font-semibold">{phoneNumber.number}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader title="Subject" column={column} />
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
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
          {dayjs(createdAt).format("MMM DD YYYY@hh:mma")}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    accessorFn: (row) => row,
    cell: (info) => {
      const { copyToClipboard } = useClipboard();
      const inquiry = info.getValue<IInquiry>();

      return (
        <DataTableRowActions>
          <HasPermission
            resourceName="inquiries"
            action="delete"
            args={[inquiry]}
          >
            <DropdownMenuItem className="text-destructive hover:!text-destructive">
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
            <DropdownMenuItem onClick={() => copyToClipboard(inquiry.email)}>
              <Clipboard />
              <span>Copy Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                copyToClipboard(inquiry.phoneNumber.number, "Phone number")
              }
            >
              <Clipboard />
              <span>Copy Number</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => copyToClipboard(inquiry.message, "Message")}
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
