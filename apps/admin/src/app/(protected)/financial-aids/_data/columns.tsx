"use client";
import { brandClientApi } from "@/src/lib/client";
import { ColumnDef } from "@tanstack/react-table";
import { IFinancialAid } from "@workspace/shared";
import { DataTableColumnHeader } from "@workspace/ui/components/table/data-table-column-header";

export const columns: ColumnDef<IFinancialAid>[] = [
  //  {
  //   id: "actions",
  //   header: "Actions",
  //   accessorFn: (row) => row,
  //   cell: (info) => {
  //     const queryClient = useQueryClient();
  //     const inquiry = info.getValue<IFinancialAid>();
  //     const deleteInquiryMutation = useMutation({
  //       mutationFn: async () => {
  //         try {
  //           brandClientApi.utils.toast.promise(
  //             async () => {
  //               const res = await deleteInquiry(inquiry.id);
  //               const resData =
  //                 brandClientApi.utils.handleServerActionResponse(res);
  //               return resData;
  //             },
  //             {
  //               loading: "Deleting...",
  //               success(data) {
  //                 queryClient.invalidateQueries({
  //                   queryKey: ["inquiries"],
  //                 });
  //                 return data.message;
  //               },
  //               error(error) {
  //                 brandClientApi.utils.alertError(error);
  //                 return error;
  //               },
  //             },
  //           );
  //         } catch (error) {
  //           brandClientApi.utils.alertError(error);
  //         }
  //       },
  //     });

  //     return (
  //       <DataTableRowActions>
  //         <HasPermission
  //           resourceName="inquiries"
  //           action="delete"
  //           args={[inquiry]}
  //         >
  //           <DropdownMenuItem
  //             className="text-destructive hover:!text-destructive"
  //             onClick={() => deleteInquiryMutation.mutate()}
  //           >
  //             <Trash2 className="text-destructive" />
  //             <span>Delete</span>
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //         </HasPermission>
  //         <DropdownMenuGroup>
  //           <DropdownMenuSub>
  //             <DropdownMenuSubTrigger className="gap-2">
  //               <Contact size={17} className="text-muted-foreground" />
  //               <span>Connect</span>
  //             </DropdownMenuSubTrigger>
  //             <DropdownMenuPortal>
  //               <DropdownMenuSubContent>
  //                 <DropdownMenuItem>
  //                   <Mail />
  //                   <a href={`mailto:${inquiry.email}`}>Send Mail</a>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem>
  //                   <Phone />
  //                   <a href={`tel:${inquiry.phoneNumber.number}`}>Call</a>
  //                 </DropdownMenuItem>
  //               </DropdownMenuSubContent>
  //             </DropdownMenuPortal>
  //           </DropdownMenuSub>
  //           <DropdownMenuItem
  //             onClick={() =>
  //               brandClientApi.utils.copyToClipboard(inquiry.email)
  //             }
  //           >
  //             <Clipboard />
  //             <span>Copy Email</span>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem
  //             onClick={() =>
  //               brandClientApi.utils.copyToClipboard(
  //                 inquiry.phoneNumber.number,
  //                 "Phone number",
  //               )
  //             }
  //           >
  //             <Clipboard />
  //             <span>Copy Number</span>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem
  //             onClick={() =>
  //               brandClientApi.utils.copyToClipboard(inquiry.message, "Message")
  //             }
  //           >
  //             <Clipboard />
  //             <span>Copy Message</span>
  //           </DropdownMenuItem>
  //         </DropdownMenuGroup>
  //       </DataTableRowActions>
  //     );
  //   },
  // },
  {
    accessorFn: (row) => row.firstName,
    id: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader title="First Name" column={column} />
    ),
    cell: (info) => info.getValue<IFinancialAid["firstName"]>(),
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader title="Last Name" column={column} />
    ),
    cell: (info) => info.getValue<IFinancialAid["lastName"]>(),
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
      const phoneNumber = info.getValue<IFinancialAid["phoneNumber"]>();
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
    accessorFn: (row) => row.createdAt,
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader title="Date Created" column={column} />
    ),
    cell: (info) => {
      const createdAt = info.getValue<IFinancialAid["createdAt"]>();
      return (
        <p className="font-semibold">
          {brandClientApi.date.formatDate(createdAt)}
        </p>
      );
    },
  },
];
