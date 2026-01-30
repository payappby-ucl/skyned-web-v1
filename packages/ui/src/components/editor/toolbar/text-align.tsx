"use client";

import React, { useCallback, useMemo } from "react";
import { EditorToolbarProp } from "./index";
import { Button } from "../../button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  LucideIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";

interface Props {
  align: "left" | "center" | "right" | "justify";
}

function getIcon({ align }: { align: Props["align"] }): LucideIcon {
  switch (align) {
    case "left":
      return AlignLeft;
    case "center":
      return AlignCenter;
    case "right":
      return AlignRight;
    case "justify":
      return AlignJustify;
    default:
      throw new Error("Please provide an align property");
  }
}

const AlignItem: React.FC<Props & Pick<EditorToolbarProp, "editor">> = ({
  align,
  editor,
}) => {
  const Icon = useMemo(() => getIcon({ align }), [align]);
  const isActive = useMemo(
    () => editor.isActive({ textAlign: align }),
    [editor.state],
  );
  const disabled = useMemo(
    () => !editor.can().setTextAlign(align),
    [editor.state],
  );

  const toggleTextAlign = useCallback(() => {
    if (isActive) {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign(align).run();
    }
  }, [isActive, editor, align]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className={`!p-0 !size-8 rounded-lg group box-border ${isActive ? "bg-muted" : ""}`}
            disabled={disabled}
            onClick={toggleTextAlign}
          >
            <Icon
              size={4}
              className={`text-muted-foreground group-hover:text-foreground ${isActive ? "!text-brand-secondary" : ""}`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="capitalize">Align {align}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const TextAlign: React.FC<Pick<EditorToolbarProp, "editor">> = ({ editor }) => {
  const aligns: Props["align"][] = ["left", "center", "right", "justify"];

  return (
    <div className="flex items-center gap-1">
      {aligns.map((align) => (
        <AlignItem editor={editor} align={align} key={align} />
      ))}
    </div>
  );
};

export { TextAlign };
