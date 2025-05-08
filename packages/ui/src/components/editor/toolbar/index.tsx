"use client";

import { Editor } from "@tiptap/react";
import React, { useState } from "react";
import { HistoryToolbar } from "./history";
import { Headings } from "./headings";
import { Lists } from "./list";
import { BlockQuote } from "./block-quote";
import { ToggleGroupOne } from "./toggle-group-1";
import { Scripts } from "./scripts";
import { TextAlign } from "./text-align";
import { Separator } from "../../separator";
import { Links } from "./link";
import { MobileLink } from "./mobile-link";
import { ToggleGroupTwo } from "./toogle-group-2";

export interface EditorToolbarProp {
  editor: Editor;
  className?: string;
}
const EditorToolbar: React.FC<EditorToolbarProp> = ({ editor, className }) => {
  const [isMobileLink, setIsMobileLink] = useState(false);

  return isMobileLink ? (
    <MobileLink editor={editor} setOpen={setIsMobileLink} />
  ) : (
    <div
      className={`px-2 py-[3px] flex items-center justify-center-safe gap-1 md:justify-center-safe w-full ${className || ""}`}
    >
      <HistoryToolbar editor={editor} />
      <Separator orientation="vertical" className="!h-[20px]" />
      <Headings editor={editor} />
      <Lists editor={editor} />
      <BlockQuote editor={editor} />
      <Separator orientation="vertical" className="!h-[20px]" />
      <ToggleGroupOne editor={editor} />
      <Links editor={editor} setIsMobileLink={setIsMobileLink} />
      <Separator orientation="vertical" className="!h-[20px]" />
      <ToggleGroupTwo editor={editor} />
      <Separator orientation="vertical" className="!h-[20px]" />
      <Scripts editor={editor} />
      <Separator orientation="vertical" className="!h-[20px]" />
      <TextAlign editor={editor} />
    </div>
  );
};

export { EditorToolbar };
