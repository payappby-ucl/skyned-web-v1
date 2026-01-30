import React from "react";

interface Props {
  status: boolean;
}
const StatusView: React.FC<Props> = ({ status }) => {
  return (
    <p
      className={`w-fit rounded-sm px-4 py-1 text-sm font-bold uppercase text-white ${status ? "bg-green-600" : "bg-destructive"}`}
    >
      {status ? "Active" : "Inactive"}
    </p>
  );
};

export default StatusView;
