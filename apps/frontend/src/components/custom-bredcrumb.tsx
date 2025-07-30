"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
}
const CustomBreadCrumb: React.FC<Props> = ({ className = "" }) => {
  const pathname = usePathname();
  const links = pathname.split("/").map((v) => `/${v}`);
  const [first, second, ...others] = links;
  const [last, ...middle] = others.reverse();

  return (
    <Breadcrumb className={`mx-auto px-6 py-4 lg:px-20 ${className}`}>
      <BreadcrumbList className="w-full">
        <BreadcrumbItem>
          <BreadcrumbLink href={first || "/"} className="capitalize">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {(middle || []).length ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {middle?.map((link, i) => {
                    const linkTitle = link.replace("/", "").replace("-", " ");

                    return (
                      <DropdownMenuItem key={link} asChild>
                        <Link
                          href={
                            pathname.slice(0, pathname.indexOf(link || "")) +
                            link
                          }
                          className="capitalize"
                        >
                          {linkTitle}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        ) : null}

        {second && last ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={
                  pathname.slice(0, pathname.indexOf(second || "")) + second
                }
                className="capitalize"
              >
                {second?.replace("/", "").replace("-", " ")}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : null}

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {(last || second)?.replace("/", "").replace("-", " ")}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadCrumb;
