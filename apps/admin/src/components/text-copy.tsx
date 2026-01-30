"use client";

import { Button } from "@workspace/ui/components/button";
import { ClipboardCopy } from "lucide-react";
import Link from "next/link";
import React from "react";
import { brandClientApi } from "../lib/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

interface Props {
  text: string;
  link?: {
    prefix: string;
    main: string;
  };
}
const TextCopy: React.FC<Props> = ({ text, link }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      {link ? (
        <Link
          href={`${link.prefix}:${link.main}`}
          target="_blank"
          className="font-semibold hover:underline"
        >
          {text}
        </Link>
      ) : (
        <p className="font-semibold">{text}</p>
      )}

      <Tooltip>
        <TooltipProvider>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="!size-7"
              onClick={() => {
                brandClientApi.utils.copyToClipboard(
                  text,
                  `"${text}" copied to clipboard`,
                );
              }}
            >
              <ClipboardCopy className="text-muted-foreground size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </TooltipProvider>
      </Tooltip>
    </div>
  );
};

export default TextCopy;
