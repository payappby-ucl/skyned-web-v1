"use client";
import React from "react";
import { EditorToolbarProp } from "./index";
import { ArrowDownToLine } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";
import { Button } from "../../button";

const ToggleGroupTwo: React.FC<Pick<EditorToolbarProp, "editor">> = ({
  editor,
}) => {
  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={`!p-0 !size-8 rounded-lg group box-border`}
              onClick={() => editor.chain().focus().setHardBreak().run()}
            >
              <ArrowDownToLine
                className={`!w-3.5 !h-3.5 text-muted-foreground group-hover:text-foreground`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hard Break</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
export { ToggleGroupTwo };
