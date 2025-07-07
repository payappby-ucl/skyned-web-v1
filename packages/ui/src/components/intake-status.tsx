"use client";

import React, { useMemo } from "react";

interface Props {
  status: "open" | "closed" | "likely_open";
  classNames?: string;
}
const IntakeStatus: React.FC<Props> = ({ status, classNames: cNames }) => {
  const classNames = useMemo(() => {
    switch (status) {
      case "open":
        return "bg-green-600";
      case "closed":
        return "bg-destructive";
      case "likely_open":
        return "bg-orange-600";
      default:
        return "";
    }
  }, [status]);

  return (
    <p
      className={`${classNames} px-4 py-1 rounded-md w-fit font-bold uppercase text-white ${cNames}`}
    >
      {status.replaceAll("_", " ")}
    </p>
  );
};

export { IntakeStatus };
