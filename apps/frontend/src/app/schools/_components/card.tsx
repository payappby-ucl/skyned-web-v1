"use client";

import { brandClientApi } from "@/src/lib/client";
import { ISchool } from "@workspace/shared";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface Props {
  school: ISchool;
}
const SchoolCard: React.FC<Props> = ({ school }) => (
  <article className="space-y-4 overflow-hidden rounded-md border">
    <Image
      src={school.logo.url}
      width={200}
      height={200}
      alt={school.name}
      className="bg-muted h-48 w-full rounded-2xl object-cover"
    />
    <div className="space-y-2">
      <header className="space-y-2">
        <time
          dateTime={brandClientApi.date.formatDate(
            school.createdAt,
            "YYYY-MM-DD",
          )}
          className="font-regular text-xs"
        >
          {brandClientApi.date.formatDate(
            school.updatedAt || school.createdAt,
            "DD MMMM YYYY",
          )}
        </time>

        <h3 className="!text-xl">{school.name}</h3>
      </header>

      <p className="text-sm">{school.overview}</p>

      <Button asChild>
        <Link
          href={`/schools/${school.slug}`}
          arial-label={`Link to ${school.name} page`}
        >
            View School Page
            <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  </article>
);

export default SchoolCard;
