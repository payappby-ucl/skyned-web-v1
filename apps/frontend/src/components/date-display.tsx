"use client";

import React from "react";
import { brandClientApi } from "../lib/client";

interface Props {
  date: Date;
  format?: string;
  className?: string;
}

const DateDisplay: React.FC<Props> = ({
  date,
  format = "DD MMMM YYYY",
  className = "",
}) => {
  return (
    <time
      dateTime={brandClientApi.date.formatDate(date, "YYYY-MM-DD")}
      className={`font-regular text-xs ${className}`}
    >
      {brandClientApi.date.formatDate(date, format)}
    </time>
  );
};

export default DateDisplay;
