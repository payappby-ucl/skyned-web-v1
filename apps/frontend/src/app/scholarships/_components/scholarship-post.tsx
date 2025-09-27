"use client";

import { brandClientApi } from "@/src/lib/client";
import { IScholarship } from "@workspace/shared";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  scholarship: IScholarship;
}
const ScholarshipPost: React.FC<Props> = ({ scholarship }) => {
  return (
    <article className="space-y-4 overflow-hidden rounded-lg border p-4">
      <Image
        src={scholarship.banner.url}
        width={200}
        height={200}
        alt={scholarship.title}
        className="w-full rounded-2xl"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {scholarship.featured ? (
            <Badge variant="secondary" className="font-bold uppercase">
              Featured
            </Badge>
          ) : null}
        </div>

        <p className="font-regular text-xs">
          {brandClientApi.date.formatDate(
            scholarship.updatedAt,
            "DD MMMM YYYY",
          )}
        </p>
      </div>

      <div>
        <h2 className="!text-xl">{scholarship.title}</h2>
        <p className="text-muted-foreground line-clamp-1 text-xs">
          {scholarship.subtitle}
        </p>
        <Badge variant="outline" className="font-semibold capitalize">
          {scholarship.category}
        </Badge>
      </div>

      <p className="line-clamp-4 text-sm">{scholarship.overview}</p>

      <Button asChild className="w-full text-sm">
        <Link href={`/scholarships/${scholarship.slug}`}>
          Learn More <ArrowRight />
        </Link>
      </Button>
    </article>
  );
};

export default ScholarshipPost;
