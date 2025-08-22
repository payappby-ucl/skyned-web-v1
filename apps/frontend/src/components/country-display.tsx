"use client";

import React, { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import { brandClientApi } from "../lib/client";

interface Props {
  isoCode: string;
  containerProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  hideName?: boolean;
  hideFlag?: boolean;
  nameProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >;
  flagProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >;
}

const CountryDisplay: React.FC<Props> = ({
  isoCode,
  hideFlag = false,
  hideName = false,
  nameProps = {},
  flagProps = {},
}) => {
  const country = useMemo(
    () => brandClientApi.location.getCountryByISOCode(isoCode),
    [isoCode],
  );

  if (!country) return null;

  return (
    <>
      {!hideName ? <p {...nameProps}>{country.name}</p> : null}
      {!hideFlag ? <p {...flagProps}>{country.flag}</p> : null}
    </>
  );
};

export default CountryDisplay;
