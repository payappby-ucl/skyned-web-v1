"use client";

import HasPermission from "@/src/components/has-permission";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@workspace/ui/components/dropdown-menu";
import { ChevronDown, NotebookText, LayoutGrid, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";

const BlogLinks: React.FC = () => {
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
              resourceName="blogs"
              action="create"
              args={[{} as any]}
            >
              <DropdownMenuItem>
                <Link
                  href="/blog/new"
                  className="flex items-center gap-1 text-sm"
                >
                  <NotebookText size={10} /> Create
                </Link>
              </DropdownMenuItem>
            </HasPermission>

            <HasPermission resourceName="categories" action="list" args={[]}>
              <DropdownMenuItem>
                <Link
                  href="/blog/categories"
                  className="flex items-center gap-1 text-sm"
                >
                  <LayoutGrid size={10} /> Browse Categories
                </Link>
              </DropdownMenuItem>
            </HasPermission>

            <HasPermission resourceName="categories" action="list" args={[]}>
              <DropdownMenuItem>
                <Link
                  href="/blog/tags"
                  className="flex items-center gap-1 text-sm"
                >
                  <Tag size={10} /> Browse Tags
                </Link>
              </DropdownMenuItem>
            </HasPermission>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden items-center gap-2 lg:flex">
        <HasPermission resourceName="blogs" action="create" args={[{} as any]}>
          <Button asChild variant={"outline"} className="text-sm">
            <Link href="/blog/new">
              <NotebookText size={10} /> Create
            </Link>
          </Button>
        </HasPermission>

        <HasPermission resourceName="categories" action="list" args={[]}>
          <Button asChild variant={"outline"} className="text-sm">
            <Link href="/blog/categories">
              <LayoutGrid size={10} /> Browse Categories
            </Link>
          </Button>
        </HasPermission>

        <HasPermission resourceName="categories" action="list" args={[]}>
          <Button asChild variant={"outline"} className="text-sm">
            <Link href="/blog/tags">
              <Tag size={10} /> Browse Tags
            </Link>
          </Button>
        </HasPermission>
      </div>
    </>
  );
};
export default BlogLinks;
