"use client";

import React from "react";
import { brandClientApi } from "../lib/client";

interface Props {
  value: number;
}
const FormatNumber: React.FC<Props> = ({ value }) => (
  <>{brandClientApi.utils.formatNumber({ value })}</>
);
export default FormatNumber;
