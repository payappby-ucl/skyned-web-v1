"use client";

import React from "react";
import HasPermission from "./has-permission";
import { ISchool } from "@workspace/shared";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { MapPin, University } from "lucide-react";
import { brandClientApi } from "../lib/client";

interface Props {
  school: ISchool;
}

const School: React.FC<Props> = ({ school }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback className="uppercase">{school.name[0]}</AvatarFallback>
        <AvatarImage src={school.logo.url} />
      </Avatar>
      <div className="space-y-[2px] font-semibold">
        <p>{school.name}</p>
        <div className="flex items-center gap-1 text-xs">
          <MapPin size={15} />
          <span className="capitalize">
            {
              brandClientApi.location.getState(school.country, school.state)
                ?.name
            }
            ,
          </span>
          <span className="capitalize">
            {brandClientApi.location.getCountryByISOCode(school.country)?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

const SchoolProfile: React.FC<Props> = ({ school }) => {
  return (
    <HasPermission
      resourceName="schools"
      action="read"
      args={[school]}
      secondaryComponent={<School school={school} />}
    >
      <Link href={`/schools/${school.slug}`}>
        <School school={school} />
      </Link>
    </HasPermission>
  );
};

export default SchoolProfile;
