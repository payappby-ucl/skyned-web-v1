"use client";
import React, { useMemo } from "react";
import { EditorToolbarProp } from "./index";
import { Button } from "../../button";
import { TextQuote } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";

const BlockQuote: React.FC<Pick<EditorToolbarProp, "editor">> = ({
  editor,
}) => {
  const isActive = useMemo(() => editor.isActive("blockquote"), [editor.state]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className={`!p-0 !size-8 rounded-lg group ${isActive ? "bg-muted" : ""}`}
            disabled={!editor.can().toggleBlockquote()}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <TextQuote
              className={`w-4 h-4 text-muted-foreground group-hover:text-foreground ${isActive ? "!text-brand-secondary" : ""}`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Blockquote</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { BlockQuote };
