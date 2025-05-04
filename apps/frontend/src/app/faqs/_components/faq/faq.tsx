"use client";

import { IFaq } from "@workspace/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { ChevronDownIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  faq: Pick<IFaq, "question" | "answer">;
}

const FAQ: React.FC<Props> = ({ faq: { question, answer } }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [height, setHeight] = useState("33.1406px");

  useEffect(() => {
    if (contentRef.current && buttonRef.current) {
      setHeight(
        open
          ? `${contentRef.current.scrollHeight}px`
          : `${buttonRef.current.scrollHeight + 16}px`,
      );
    }
  }, [open]);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={`overflow-hidden rounded-md p-2 shadow-sm transition-all ease-in-out ${open ? "border-l-brand border-l-2" : ""}`}
      style={{
        height,
      }}
      ref={contentRef}
    >
      <CollapsibleTrigger
        className="flex w-full items-center justify-between gap-2 px-2"
        ref={buttonRef}
      >
        <p className="text-md flex-1 text-left font-semibold">{question}</p>
        {
          <ChevronDownIcon
            size={15}
            className={`transition-all ${open ? "-rotate-90" : ""}`}
          />
        }
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          className="wysiwyg-view mt-5 px-4"
          dangerouslySetInnerHTML={{
            __html: answer,
          }}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FAQ;
