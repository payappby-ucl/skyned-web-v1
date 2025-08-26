"use client";

import { ISchool } from "@workspace/shared";
import Link from "next/link";
import Image from "next/image";
import React, { useMemo } from "react";
import { MapPinIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { brandClientApi } from "@/src/lib/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

interface Props {
  school: ISchool;
}
const SchoolCard: React.FC<Props> = ({ school }) => {
  const country = useMemo(
    () => brandClientApi.location.getCountryByISOCode(school.country),
    [school],
  );
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col space-y-4">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{school.name[0]?.toUpperCase()}</AvatarFallback>
            <AvatarImage
              src={school.logo.url}
              alt={school.name}
              width={40}
              height={40}
            />
          </Avatar>
          {/* <div className="relative h-10 w-10 shrink-0 rounded-full border p-2">
            <Image
              src={school.logo.url}
              alt={school.name}
              width={40}
              height={40}
              priority
              className="object-contain"
            />
          </div> */}

          <div className="flex-1 space-y-2 self-start">
            <h4>{school.name}</h4>
            <div className="flex items-center gap-4 text-gray-500">
              <div className="flex items-center gap-1 text-gray-500">
                <MapPinIcon className="h-4 w-4 shrink-0 text-blue-900" />
                <span className="text-xs">{school.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Rows */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Institution Type</span>
              <Badge variant="outline">
                {school.ownershipType.toLocaleUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Country</span>
              <Badge variant="secondary">
                {country?.flag} {country?.name}
              </Badge>
            </div>
          </div>

          <p className="text-md line-clamp-3">{school.overview}</p>
        </div>

        {/* Action Button */}
        <Button asChild variant="brand" className="mt-auto w-full">
          <Link
            href={`/schools/${school.slug}`}
            arial-label={`Link to ${school.name} page`}
          >
            View {school.name}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;
