"use client";

import { ISchool } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { ChevronDown, House, NotebookPen, SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  school: ISchool;
}

const SchoolMenu: React.FC<Props> = ({ school }) => {
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SchoolMenu;
