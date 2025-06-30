"use client";

import HasPermission from "@/src/components/has-permission";
import { brandClientApi } from "@/src/lib/client";
import { IProgram } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { ChevronDown, Eye, EyeOff, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  program: IProgram;
}
const ProgramOptions: React.FC<Props> = ({ program }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-sm px-4 py-1 text-sm">
          More <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-1 md:ml-0 lg:mr-1">
        <HasPermission
          resourceName="programs"
          action="update"
          args={[{} as any, program]}
        >
          <DropdownMenuItem asChild>
            <Button
              className="justify-start hover:!outline-0 hover:!ring-0"
              variant="ghost"
              asChild
            >
              <Link
                href={`/schools/${program.school!.slug}/programs/${program.slug}/edit`}
                aria-label={`Link to edit ${program.name}`}
              >
                <SquarePen />
                <span>Edit</span>
              </Link>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            {program.active ? (
              <HasPermission
                resourceName="programs"
                action="deactivate"
                args={[program]}
              >
                <Button
                  variant="ghost"
                  className="text-destructive hover:!text-destructive !text-sm hover:!outline-0 hover:!ring-0"
                  aria-label={`Deactivate ${program.name}`}
                  onClick={() =>
                    brandClientApi.utils.toast.info("Under Construction")
                  }
                >
                  <EyeOff className="text-destructive" />
                  <span>Deactivate Program</span>
                </Button>
              </HasPermission>
            ) : (
              <HasPermission
                resourceName="programs"
                action="activate"
                args={[program]}
              >
                <Button
                  variant="ghost"
                  className="text-green-600 hover:!text-green-600 hover:!outline-0 hover:!ring-0"
                  aria-label={`Activate ${program.name}`}
                  onClick={() =>
                    brandClientApi.utils.toast.info("Under Construction")
                  }
                >
                  <Eye className="text-green-600" />
                  <span>Activate Program</span>
                </Button>
              </HasPermission>
            )}
          </DropdownMenuItem>
        </HasPermission>

        <HasPermission resourceName="programs" action="delete" args={[program]}>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="text-destructive hover:!text-destructive w-full justify-start hover:!outline-0 hover:!ring-0"
              aria-label={`Delete ${program.name}`}
              onClick={() =>
                brandClientApi.utils.toast.info("Under Construction")
              }
            >
              <Trash2 className="text-destructive" />
              <span>Delete Program</span>
            </Button>
          </DropdownMenuItem>
        </HasPermission>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProgramOptions;
