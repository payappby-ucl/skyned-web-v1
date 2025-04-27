"use client";

import { useCallback } from "react";
import { brandClientApi } from "../lib/client";

const useClipboard = () => {
  const copyToClipboard = useCallback((text: string, alertMessage?: string) => {
    navigator.clipboard.writeText(text);
    brandClientApi.utils.toast.info(
      `${alertMessage || text} copied to clipboard.`,
    );
  }, []);

  return {
    copyToClipboard,
  };
};
export default useClipboard;
