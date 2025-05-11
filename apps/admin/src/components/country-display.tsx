"use client";

import React, { useMemo } from "react";
import { brandClientApi } from "../lib/client";

interface Props {
  isoCode: string;
}

const CountryDisplay: React.FC<Props> = ({ isoCode }) => {
  const country = useMemo(
    () => brandClientApi.location.getCountryByISOCode(isoCode),
    [isoCode],
  );

  if (!country) return null;

  return (
    <div className="flex items-center gap-2 font-semibold">
      <p>{country.name}</p>
      <span>{country.flag}</span>
    </div>
  );
};

export default CountryDisplay;
