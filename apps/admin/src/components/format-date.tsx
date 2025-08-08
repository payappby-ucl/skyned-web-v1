"use client";

import React from "react";
import { brandClientApi } from "../lib/client";

interface Props {
  date: Date;
  format?: string;
  fromNow?: boolean;
}
const FormatDate: React.FC<Props> = ({ date, format, fromNow }) => (
  <>
    {fromNow
      ? brandClientApi.date.fromNow(date)
      : brandClientApi.date.formatDate(date, format)}
  </>
);
export default FormatDate;
