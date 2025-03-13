"use client";

import { Button } from "@workspace/ui/components/button";
import React from "react";
import { brandClientApi } from "../lib/client";

const Test: React.FC = () => {
  return (
    <Button
      variant="brand"
      onClick={() => {
        brandClientApi.utils.toast.success("Skyned Public Page");
      }}
    >
      Click Me
    </Button>
  );
};
export default Test;
