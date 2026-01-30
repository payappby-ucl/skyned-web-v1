"use client";
import React, { useMemo } from "react";
import { EditorToolbarProp } from "./index";
import { Bold, Italic, Strikethrough, UnderlineIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";
import { Button } from "../../button";

const ToggleGroupOne: React.FC<Pick<EditorToolbarProp, "editor">> = ({
  editor,
}) => {
  const isActive = useMemo(
    () => ({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      strike: editor.isActive("strike"),
      underline: editor.isActive("underline"),
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
              className={`!p-0 !size-8 rounded-lg group box-border ${isActive.bold ? "bg-muted" : ""}`}
              disabled={!editor.can().setBold()}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold
                className={`!w-3.5 !h-3.5 text-muted-foreground group-hover:text-foreground ${isActive.bold ? "!text-brand-secondary" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bold</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={`!p-0 !size-8 rounded-lg group ${isActive.italic ? "bg-muted" : ""}`}
              disabled={!editor.can().setItalic()}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic
                className={`!w-3.5 !h-3.5 text-muted-foreground group-hover:text-foreground ${isActive.italic ? "!text-brand-secondary" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Italic</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={`!p-0 !size-8 rounded-lg group ${isActive.strike ? "bg-muted" : ""}`}
              disabled={!editor.can().setStrike()}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough
                className={`!w-3.5 !h-3.5 text-muted-foreground group-hover:text-foreground ${isActive.strike ? "!text-brand-secondary" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Strike</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={`!p-0 !size-8 rounded-lg group ${isActive.underline ? "bg-muted" : ""}`}
              disabled={!editor.can().unsetUnderline()}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon
                className={`!w-3.5 !h-3.5 text-muted-foreground group-hover:text-foreground ${isActive.underline ? "!text-brand-secondary" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Underline</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
export { ToggleGroupOne };
