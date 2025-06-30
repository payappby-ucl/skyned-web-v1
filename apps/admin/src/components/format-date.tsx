"use client";

import React from "react";
import { brandClientApi } from "../lib/client";

interface Props {
  date: Date;
  format?: string;
}
const FormatDate: React.FC<Props> = ({ date, format }) => (
  <>{brandClientApi.date.formatDate(date, format)}</>
);
export default FormatDate;
