"use client";
import React, { useEffect, useMemo, useState } from "react";
import { EditorToolbarProp } from "./index";
import {
  ChevronDown,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";

type Levels = (1 | 2 | 3 | 4 | 5 | 6)[];
interface Props {
  level?: Levels[0];
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  editor: EditorToolbarProp["editor"];
}

function getIcon({ level }: { level?: Props["level"] }): LucideIcon {
  switch (level) {
    case 1:
      return Heading1;
    case 2:
      return Heading2;
    case 3:
      return Heading3;
    case 4:
      return Heading4;
    case 5:
      return Heading5;
    case 6:
      return Heading6;
    default:
      return Heading;
  }
}

const Item: React.FC<Props> = ({ level, setSelected, editor }) => {
  if (!level) return null;
  const Icon = useMemo(() => getIcon({ level }), []);
  const isActive = useMemo(() => editor.isActive("heading", { level }), []);

  return (
    <DropdownMenuItem
      onClick={() => {
        setSelected(`${level}`);
        editor.chain().toggleHeading({ level }).run();
      }}
      className={`${isActive ? "bg-muted" : ""}`}
    >
      <Icon className={`${isActive ? "text-brand-secondary" : ""}`} />
      <span>Heading {level}</span>
    </DropdownMenuItem>
  );
};

const Headings: React.FC<Pick<EditorToolbarProp, "editor">> = ({ editor }) => {
  const levels: Levels = useMemo(() => [1, 2, 3, 4, 5, 6], []);

  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (editor.isActive("heading", { level: 1 })) {
      setSelected("1");
    } else if (editor.isActive("heading", { level: 2 })) {
      setSelected("2");
    } else if (editor.isActive("heading", { level: 3 })) {
      setSelected("3");
    } else if (editor.isActive("heading", { level: 4 })) {
      setSelected("4");
    } else if (editor.isActive("heading", { level: 5 })) {
      setSelected("5");
    } else if (editor.isActive("heading", { level: 6 })) {
      setSelected("6");
    } else {
      setSelected(null);
    }
  }, [editor.state]);

  const Icon = useMemo(
    () =>
      getIcon({
        level: selected ? (parseInt(selected) as Levels[0]) : undefined,
      }),
    [selected],
  );

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button" asChild>
            <DropdownMenuTrigger
              className={`flex items-center justify-center hover:bg-muted rounded-lg !p-0 size-8 group disabled:opacity-50 ${editor.isActive("heading") ? "bg-muted" : ""}`}
              disabled={
                !editor.can().toggleNode("heading", "paragraph", {
                  levels,
                })
              }
            >
              <Icon
                className={`w-4 h-4 group-hover:text-foreground ${selected ? "!text-brand-secondary" : "text-muted-foreground"}`}
              />
              <ChevronDown className="w-2 h-2 text-muted-foreground group-hover:text-foreground" />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Headings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        {levels.map((level) => (
          <Item
            key={`heading-${level}`}
            level={level}
            setSelected={setSelected}
            editor={editor}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Headings };
