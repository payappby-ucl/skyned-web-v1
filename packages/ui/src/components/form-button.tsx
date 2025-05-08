"use client";

import React from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

type Props = Parameters<typeof Button>["0"] & {
  isLoading?: boolean;
};

const FormButton: React.FC<Props> = ({ isLoading, children, ...props }) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? <Loader2 className="animate-spin" /> : null}
      {children}
    </Button>
  );
};

export { FormButton };
