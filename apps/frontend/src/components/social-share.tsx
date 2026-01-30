"use client";

import { Share } from "@workspace/ui/components/share";
import React from "react";
import { brandClientApi } from "../lib/client";

export const SocialShare: React.FC<
  Omit<Parameters<typeof Share>[0], "copyToClipboard">
> = (props) => {
  return (
    <Share {...props} copyToClipboard={brandClientApi.utils.copyToClipboard} />
  );
};
