"use client";

import React, { DetailedHTMLProps, HTMLAttributes, useMemo } from "react";
import { brandClientApi } from "../lib/client";

interface Props {
  countryIsoCode: string;
  stateIsoCode: string;
  nameProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >;
}

const StateDisplay: React.FC<Props> = ({
  countryIsoCode,
  stateIsoCode,
  nameProps = {},
}) => {
  const state = useMemo(
    () => brandClientApi.location.getState(countryIsoCode, stateIsoCode),
    [countryIsoCode, stateIsoCode],
  );

  if (!state) return null;

  return <p {...nameProps}>{state.name}</p>;
};

export default StateDisplay;
