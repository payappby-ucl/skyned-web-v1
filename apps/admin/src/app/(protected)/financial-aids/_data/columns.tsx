"use client";
import HasPermission from "@/src/components/has-permission";
import SchoolProfile from "@/src/components/school-profile";
import { brandClientApi } from "@/src/lib/client";
import { ColumnDef } from "@tanstack/react-table";
import { IFinancialAid, ISchool } from "@workspace/shared";
import { FinancialAidPartner } from "@workspace/ui/components/financial-aid-partner";
import { DataTableColumnHeader } from "@workspace/ui/components/table/data-table-column-header";
import { Eye } from "lucide-react";
import Link from "next/link";

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
    accessorFn: (row) => row.citizenship,
    id: "citizenship",
    header: ({ column }) => (
      <DataTableColumnHeader title="Citizenship" column={column} />
    ),
    cell: (info) => {
      const value = info.getValue<IFinancialAid["citizenship"]>();
      const country = brandClientApi.location.getCountryByISOCode(value);
      return (
        <div className="flex items-center gap-2">
          <p className="font-semibold">{country?.name}</p>
          {country ? <span>{country.flag}</span> : null}
        </div>
      );
    },
  },

  {
    id: "school",
    accessorFn: (row) => row.program.school,
    header: ({ column }) => (
      <DataTableColumnHeader title="School" column={column} />
    ),
    cell: (info) => {
      const school = info.getValue<ISchool>();
      return (
        <HasPermission
          resourceName="schools"
          action="read"
          args={[info.row.original.program.school]}
          secondaryComponent={<SchoolProfile school={school} />}
        >
          <SchoolProfile school={school} />
        </HasPermission>
      );
    },
  },

  {
    id: "program",
    accessorFn: (row) => row.program.name,
    header: ({ column }) => (
      <DataTableColumnHeader title="Program" column={column} />
    ),
  },

  {
    accessorFn: (row) => row.canadianResident,
    id: "canadianResident",
    header: ({ column }) => (
      <DataTableColumnHeader title="Canadian Residency" column={column} />
    ),
    cell: (info) => {
      return (
        <p className="font-semibold capitalize">
          {info.getValue<IFinancialAid["canadianResident"]>()}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.studyLevel,
    id: "studyLevel",
    header: ({ column }) => (
      <DataTableColumnHeader title="Study Level" column={column} />
    ),
    cell: (info) => {
      return (
        <p className="font-semibold capitalize">
          {info.getValue<IFinancialAid["studyLevel"]>()}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.pgwp,
    id: "pgwp",
    header: ({ column }) => (
      <DataTableColumnHeader title="PGWP Eligible" column={column} />
    ),
    cell: (info) => {
      return (
        <p className="font-semibold capitalize">
          {info.getValue<IFinancialAid["pgwp"]>()}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.hasOfferLetter,
    id: "hasOfferLetter",
    header: ({ column }) => (
      <DataTableColumnHeader title="Has Offer Letter" column={column} />
    ),
    cell: (info) => {
      return (
        <p className="font-semibold capitalize">
          {info.getValue<IFinancialAid["hasOfferLetter"]>()}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.loanType,
    id: "loanType",
    header: ({ column }) => (
      <DataTableColumnHeader title="Loan Type" column={column} />
    ),
    cell: (info) => {
      return (
        <p className="font-semibold capitalize">
          {info.getValue<IFinancialAid["loanType"]>()}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.livingExpensesCoverage,
    id: "livingExpensesCoverage",
    header: ({ column }) => (
      <DataTableColumnHeader title="Living Expenses Coverage" column={column} />
    ),
    cell: (info) => {
      const loanType = info.row.original.loanType;
      return (
        <p className="font-semibold capitalize">
          {loanType === "tuition"
            ? info.getValue<IFinancialAid["livingExpensesCoverage"]>()
            : "-"}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.programStarted,
    id: "programStarted",
    header: ({ column }) => (
      <DataTableColumnHeader title="Program Started" column={column} />
    ),
    cell: (info) => {
      return (
        <p className="font-semibold capitalize">
          {info.getValue<IFinancialAid["programStarted"]>()}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.gpa,
    id: "gpa",
    header: ({ column }) => (
      <DataTableColumnHeader title="GPA" column={column} />
    ),
    cell: (info) => {
      const programStarted = info.row.original.programStarted;
      return (
        <p className="font-semibold capitalize">
          {programStarted === "yes"
            ? info.getValue<IFinancialAid["gpa"]>()
            : "-"}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.nextSchoolTerm,
    id: "nextSchoolTerm",
    header: ({ column }) => (
      <DataTableColumnHeader title="Next School Term" column={column} />
    ),
    cell: (info) => {
      const nextSchoolTerm = info.getValue<IFinancialAid["nextSchoolTerm"]>();
      return (
        <p className="font-semibold">
          {brandClientApi.date.formatDate(nextSchoolTerm, "MMM DD YYYY")}
        </p>
      );
    },
  },

  {
    accessorFn: (row) => row.partner,
    id: "partner",
    header: ({ column }) => (
      <DataTableColumnHeader title="Selected Partner" column={column} />
    ),
    cell: (info) => {
      const partner = info.getValue<IFinancialAid["partner"]>();
      return (
        <div className="rounded-md border px-4 py-2">
          <FinancialAidPartner name={partner} />
        </div>
      );
    },
  },

  {
    accessorFn: (row) => row.identification,
    id: "identification",
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Passport or government-issued ID"
        column={column}
      />
    ),
    cell: (info) => {
      const identification = info.getValue<IFinancialAid["identification"]>();
      return (
        <div className="flex items-center gap-5 rounded-lg border px-4 py-2">
          <p className="font-semibold">Passport or government-issued ID</p>
          <Link href={identification.url} target="_blank">
            <Eye size={15} />
          </Link>
        </div>
      );
    },
  },

  {
    accessorFn: (row) => row.proofOfAddress,
    id: "proofOfAddress",
    header: ({ column }) => (
      <DataTableColumnHeader title="Proof of Address" column={column} />
    ),
    cell: (info) => {
      const proofOfAddress = info.getValue<IFinancialAid["proofOfAddress"]>();
      return (
        <div className="flex items-center gap-5 rounded-lg border px-4 py-2">
          <p className="font-semibold">Proof of Address</p>
          <Link href={proofOfAddress.url} target="_blank">
            <Eye size={15} />
          </Link>
        </div>
      );
    },
  },

  {
    accessorFn: (row) => row.resume,
    id: "resume",
    header: ({ column }) => (
      <DataTableColumnHeader title="Resume / CV" column={column} />
    ),
    cell: (info) => {
      const resume = info.getValue<IFinancialAid["resume"]>();
      return (
        <div className="flex items-center gap-5 rounded-lg border px-4 py-2">
          <p className="font-semibold">Resume / CV</p>
          <Link href={resume.url} target="_blank">
            <Eye size={15} />
          </Link>
        </div>
      );
    },
  },

  {
    accessorFn: (row) => row.transcript,
    id: "transcript",
    header: ({ column }) => (
      <DataTableColumnHeader title="Transcript / GPA Report" column={column} />
    ),
    cell: (info) => {
      const transcript = info.getValue<IFinancialAid["transcript"]>();
      return (
        <div className="flex items-center gap-5 rounded-lg border px-4 py-2">
          <p className="font-semibold">Transcript / GPA Report</p>
          <Link href={transcript.url} target="_blank">
            <Eye size={15} />
          </Link>
        </div>
      );
    },
  },

  {
    accessorFn: (row) => row.bankStatement,
    id: "bankStatement",
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Bank Statement / Scholarship Letter"
        column={column}
      />
    ),
    cell: (info) => {
      const bankStatement = info.getValue<IFinancialAid["bankStatement"]>();
      const loanType = info.row.original.loanType;
      return (
        <>
          {loanType === "tuition" && bankStatement ? (
            <div className="flex items-center gap-5 rounded-lg border px-4 py-2">
              <p className="font-semibold">
                Bank Statement / Scholarship Letter
              </p>
              <Link href={bankStatement.url} target="_blank">
                <Eye size={15} />
              </Link>
            </div>
          ) : (
            <p> - </p>
          )}
        </>
      );
    },
  },

  {
    accessorFn: (row) => row.offerLetter,
    id: "offerLetter",
    header: ({ column }) => (
      <DataTableColumnHeader title="Offer Letter" column={column} />
    ),
    cell: (info) => {
      const offerLetter = info.getValue<IFinancialAid["offerLetter"]>();
      const hasOfferLetter = info.row.original.hasOfferLetter;
      return (
        <>
          {hasOfferLetter === "yes" && offerLetter ? (
            <div className="flex items-center gap-5 rounded-lg border px-4 py-2">
              <p className="font-semibold">Offer Letter</p>
              <Link href={offerLetter.url} target="_blank">
                <Eye size={15} />
              </Link>
            </div>
          ) : (
            <p> - </p>
          )}
        </>
      );
    },
  },

  {
    accessorFn: (row) => row.immigrationDocument,
    id: "immigrationDocument",
    header: ({ column }) => (
      <DataTableColumnHeader title="Immigration Document" column={column} />
    ),
    cell: (info) => {
      const immigrationDocument =
        info.getValue<IFinancialAid["immigrationDocument"]>();
      return (
        <div className="flex items-center gap-5 rounded-lg border px-4 py-2">
          <p className="font-semibold">Immigration Document</p>
          <Link href={immigrationDocument.url} target="_blank">
            <Eye size={15} />
          </Link>
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
