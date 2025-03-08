"use client";

import { brandApi } from "@/src/lib";
import { Button } from "@workspace/ui/components/button";
import React from "react";

const Test: React.FC = () => {
  return (
    <Button
      onClick={() => {
        console.log("clicked");
        brandApi.toast.success("Skyned Public Page");
      }}
    >
      Click Me
    </Button>
  );
};
export default Test;
