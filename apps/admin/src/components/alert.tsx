import { LucideIcon, TriangleAlert } from "lucide-react";
import React from "react";

interface Props {
  Icon?: LucideIcon;
  message?: string;
}

const Alert: React.FC<Props> = ({
  Icon = TriangleAlert,
  message = "Unauthorized",
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-muted-foreground flex items-center gap-3">
        <Icon />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
