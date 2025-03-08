"use client";

import { brandApi } from "@/src/lib";
import { Button } from "@workspace/ui/components/button";
import React from "react";

const Test: React.FC = () => {
  return (
    <Button
      variant="brand"
      onClick={() => {
        brandApi.toast.success("Skyned Public Page");
      }}
    >
      Click Me
    </Button>
  );
};
export default Test;
