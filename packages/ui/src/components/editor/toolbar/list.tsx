"use client";
import React, { useEffect, useMemo, useState } from "react";
import { EditorToolbarProp } from "./index";
import { ChevronDown, List, ListOrdered, LucideIcon } from "lucide-react";
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

type Lists = ("bulletList" | "orderedList")[];
interface Props {
  list?: Lists[0];
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  editor: EditorToolbarProp["editor"];
}

function getIcon({ list }: { list?: Props["list"] }): LucideIcon {
  switch (list) {
    case "bulletList":
      return List;
    case "orderedList":
      return ListOrdered;
    default:
      return List;
  }
}

const Item: React.FC<Props> = ({ list, setSelected, editor }) => {
  if (!list) return null;
  const Icon = useMemo(() => getIcon({ list }), []);
  const isActive = useMemo(() => editor.isActive(list), []);

  return (
    <DropdownMenuItem
      onClick={() => {
        if (list === "bulletList") {
          editor.chain().focus().toggleBulletList().run();
        }

        if (list === "orderedList") {
          editor.chain().focus().toggleOrderedList().run();
        }

        setSelected(list);
      }}
      className={`${isActive ? "bg-muted" : ""}`}
    >
      <Icon className={`${isActive ? "text-brand-secondary" : ""}`} />
      <span>
        {list === "bulletList"
          ? "Bullet List"
          : list === "orderedList"
            ? "Ordered List"
            : "Task List"}
      </span>
    </DropdownMenuItem>
  );
};

const Lists: React.FC<Pick<EditorToolbarProp, "editor">> = ({ editor }) => {
  const lists: Lists = useMemo(() => ["bulletList", "orderedList"], []);

  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (editor.isActive("bulletList")) {
      setSelected("bulletList");
    } else if (editor.isActive("orderedList")) {
      setSelected("orderedList");
    } else {
      setSelected(null);
    }
  }, [editor.state]);

  const Icon = useMemo(
    () =>
      getIcon({
        list: selected ? (selected as Lists[0]) : undefined,
      }),
    [selected],
  );

  const isActive = useMemo(
    () => editor.isActive("bulletList") || editor.isActive("orderedList"),
    [editor.state],
  );

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button" asChild>
            <DropdownMenuTrigger
              className={`flex items-center hover:bg-muted rounded-lg !p-0 size-8 justify-center disabled:opacity-50 group ${isActive ? "bg-muted" : ""}`}
              disabled={
                selected
                  ? selected === "bulletList"
                    ? !editor.can().toggleBulletList()
                    : !editor.can().toggleOrderedList()
                  : false
              }
            >
              <Icon
                className={`w-4 h-4 group-hover:text-foreground ${selected ? "!text-brand-secondary" : "text-muted-foreground"}`}
              />
              <ChevronDown
                size={10}
                className="w-2 h-2 text-muted-foreground group-hover:text-foreground"
              />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>List</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        {lists.map((list) => (
          <Item
            key={`${list}`}
            list={list}
            setSelected={setSelected}
            editor={editor}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Lists };
