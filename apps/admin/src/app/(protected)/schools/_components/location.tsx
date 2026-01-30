"use client";

import { brandClientApi } from "@/src/lib/client";
import { ISchool } from "@workspace/shared";
import { MapPin } from "lucide-react";
import React, { useMemo } from "react";

interface Props {
  school: ISchool;
}

const SchoolLocation: React.FC<Props> = ({ school }) => {
  const country = useMemo(
    () => brandClientApi.location.getCountryByISOCode(school.country),
    [school],
  );

  const state = useMemo(
    () => brandClientApi.location.getState(school.country, school.state),
    [school],
  );
  return (
    <div className="text-muted-foreground flex items-center gap-1 !text-sm">
      <MapPin size={15} />
      <p>
        <span className="hidden md:inline">
          {school.address} {school.city}
          {school.city ? ", " : null}
        </span>
        {state?.name}, {country?.name} {country?.flag}
      </p>
    </div>
  );
};

export default SchoolLocation;
