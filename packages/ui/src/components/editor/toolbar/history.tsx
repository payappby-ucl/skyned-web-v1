"use client";
import React from "react";
import { EditorToolbarProp } from "./index";
import { Button } from "../../button";
import { Redo2, Undo2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";

const HistoryToolbar: React.FC<Pick<EditorToolbarProp, "editor">> = ({
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
              className="!p-0 !size-8 flex items-center justify-center rounded-lg group"
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="!p-0 !size-8 flex items-center justify-center rounded-lg group"
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { HistoryToolbar };
