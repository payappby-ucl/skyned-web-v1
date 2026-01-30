"use client";

import React, { useMemo } from "react";
import { EditorToolbarProp } from "./index";
import { Button } from "../../button";
import { Subscript, Superscript } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";

const Scripts: React.FC<Pick<EditorToolbarProp, "editor">> = ({ editor }) => {
  const isActive = useMemo(
    () => ({
      superscript: editor.isActive("superscript"),
      subscript: editor.isActive("subscript"),
    }),
    [editor.state],
  );

  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={`!p-0 !size-8 rounded-lg group box-border ${isActive.superscript ? "bg-muted" : ""}`}
              disabled={!editor.can().setSuperscript()}
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
            >
              <Superscript
                size={4}
                className={`text-muted-foreground group-hover:text-foreground ${isActive.superscript ? "!text-brand-secondary" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Superscript</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={`!p-0 !size-8 rounded-lg group box-border ${isActive.subscript ? "bg-muted" : ""}`}
              disabled={!editor.can().setSubscript()}
              onClick={() => editor.chain().focus().toggleSubscript().run()}
            >
              <Subscript
                size={4}
                className={`text-muted-foreground group-hover:text-foreground ${isActive.subscript ? "!text-brand-secondary" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Subscript</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { Scripts };
