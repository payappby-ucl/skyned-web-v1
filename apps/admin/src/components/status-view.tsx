import React, { useMemo } from "react";

interface Props {
  status: "Active" | "Suspended";
}
const StatusView: React.FC<Props> = ({ status }) => {
  const classNames = useMemo(() => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 border-green-600 dark:bg-green-800/20 dark:border-green-800";
      case "Suspended":
        return "bg-destructive/20 border-destructive";
      default:
        return "";
    }
  }, []);

  return (
    <p
      className={`w-fit rounded-md border px-3 py-1 text-xs font-bold uppercase ${classNames}`}
    >
      {status}
    </p>
  );
};

export default StatusView;
