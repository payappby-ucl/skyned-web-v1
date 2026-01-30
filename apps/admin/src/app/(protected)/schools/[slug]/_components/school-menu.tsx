"use client";

import HasPermission from "@/src/components/has-permission";
import { ISchool } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  ChevronDown,
  Eye,
  EyeOff,
  House,
  NotebookPen,
  SquarePen,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSchool } from "../../_hooks";

interface Props {
  school: ISchool;
}

const SchoolMenu: React.FC<Props> = ({ school }) => {
  const { actionOnSchoolMutation } = useSchool();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-sm px-4 py-1 text-sm">
          More <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="md:mr-2">
        <DropdownMenuItem>
          <Link
            href={`/schools/${school.slug}/edit`}
            aria-label={`Link to edit school`}
            className="flex w-full items-center gap-2"
          >
            <SquarePen />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/schools/${school.slug}/intakes`}
            aria-label={`Link to school intake list`}
            className="flex w-full items-center gap-2"
          >
            <NotebookPen />
            <span>Intakes</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/schools/${school.slug}/accommodation`}
            aria-label={`Link to school accommodation`}
            className="flex w-full items-center gap-2"
          >
            <House />
            <span>Accommodation</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          {school.active ? (
            <HasPermission
              resourceName="schools"
              action="deactivate"
              args={[school]}
            >
              <Button
                variant="ghost"
                className="text-destructive hover:!text-destructive w-full justify-start rounded-sm !text-sm hover:!outline-0 hover:!ring-0"
                aria-label={`Deactivate ${school.name}`}
                onClick={() => actionOnSchoolMutation.mutate(school)}
              >
                <EyeOff className="text-destructive" />
                <span>Deactivate</span>
              </Button>
            </HasPermission>
          ) : (
            <HasPermission
              resourceName="schools"
              action="activate"
              args={[school]}
            >
              <Button
                variant="ghost"
                className="w-full justify-start rounded-sm !text-sm text-green-600 hover:!text-green-600 hover:!outline-0 hover:!ring-0"
                aria-label={`Activate ${school.name}`}
                onClick={() => actionOnSchoolMutation.mutate(school)}
              >
                <Eye className="text-green-600" />
                <span>Activate</span>
              </Button>
            </HasPermission>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SchoolMenu;
