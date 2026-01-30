"use client";

import HasPermission from "@/src/components/has-permission";
import { brandClientApi } from "@/src/lib/client";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@workspace/ui/components/dropdown-menu";
import { ChevronDown, FileClock, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const ScholarshipLinks: React.FC = () => {
  return (
    <>
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-sm px-4 py-1 text-sm">
              More <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="mr-2">
            <HasPermission
              resourceName="scholarships"
              action="create"
              args={[{} as any]}
            >
              <DropdownMenuItem>
                <Link
                  href="/scholarships/new"
                  className="flex items-center gap-1 text-sm"
                >
                  <Plus /> Create
                </Link>
              </DropdownMenuItem>
            </HasPermission>

            <DropdownMenuItem>
              <Link href="#" className="flex items-center gap-1 text-sm">
                <FileClock />
                Logs
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden items-center gap-2 lg:flex">
        <HasPermission
          resourceName="scholarships"
          action="create"
          args={[{} as any]}
        >
          <Button asChild variant={"outline"} className="text-sm">
            <Link href="/scholarships/new">
              <Plus /> Create
            </Link>
          </Button>
        </HasPermission>

        <Button
          asChild
          variant="outline"
          onClick={() => brandClientApi.utils.toast.info("Under Construction")}
        >
          <Link
            href="#"
            aria-label="Link to create new scholarship"
            className="!text-sm"
          >
            <FileClock />
            Logs
          </Link>
        </Button>
      </div>
    </>
  );
};
export default ScholarshipLinks;
