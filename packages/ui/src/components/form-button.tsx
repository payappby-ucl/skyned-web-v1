"use client";

import React from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

type Props = Parameters<typeof Button>["0"] & {
  isLoading?: boolean;
};

const FormButton: React.FC<Props> = ({
  isLoading,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      className={`flex items-center gap-2 ${className}`}
      {...props}
      disabled={isLoading || disabled}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : null}
      {children}
    </Button>
  );
};

export { FormButton };
