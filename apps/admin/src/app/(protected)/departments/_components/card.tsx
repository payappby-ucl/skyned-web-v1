"use client";

import Profile from "@/src/components/profile";
import { IDepartment } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { EllipsisVertical, Eye } from "lucide-react";
import Link from "next/link";

interface Props {
  department: IDepartment;
}
const DepartmentCard: React.FC<Props> = ({ department }) => {
  return (
    <Card
      key={department.name}
      className="shadow-xs gap-2 divide-y rounded-md border py-2"
    >
      <CardHeader className="p-2">
        <div className="flex items-center justify-between">
          <CardTitle className="rounded-sm border px-4 py-1 text-xs font-semibold uppercase">
            {department.name.replaceAll("_", " ")}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto !size-7 rounded-sm text-sm font-medium"
              >
                <EllipsisVertical className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/departments/${department.name.replaceAll("_", "-").toLowerCase()}`}
                  aria-label={`Link to view department`}
                  className="text-xs"
                >
                  <Eye />
                  <span>View</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="space-y-2">
          {department.lead ? (
            <Profile {...department.lead} disabled />
          ) : (
            <div className="w-fit rounded-sm bg-blue-500/10 px-4 py-1">
              <p className="text-xs font-bold uppercase text-blue-500">
                No Lead Assigned
              </p>
            </div>
          )}
          <p className="text-muted-foreground w-fit rounded-sm border px-2 py-1 text-xs">
            Department Lead
          </p>
        </div>
      </CardContent>
      <CardFooter className="m-0 flex-col gap-1 px-4">
        <div className="flex w-full items-center justify-between text-sm">
          <p className="text-muted-foreground">Members</p>
          <p>{department._count?.members || 0}</p>
        </div>
        <div className="flex w-full items-center justify-between text-sm">
          <p className="text-muted-foreground">Teams</p>
          <p>{department._count?.teams || 0}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
export default DepartmentCard;
