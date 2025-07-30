"use client";

import React, { useEffect, useRef, useState } from "react";
import { IFaq } from "@workspace/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface Props {
  faqs: Pick<IFaq, "answer" | "question">[];
}


const FAQs: React.FC<Props> = ({ faqs }) => (
  <div className="space-y-3">
    {faqs.map((faq) => (
      <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
    ))}
  </div>
);

export default FAQs;

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [height, setHeight] = useState<string>("33.1406px");

  useEffect(() => {
    if (contentRef.current && buttonRef.current) {
      setHeight(
        open
          ? `${contentRef.current.scrollHeight}px`
          : `${buttonRef.current.scrollHeight + 16}px`
      );
    }
  }, [open]);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={`overflow-hidden rounded-md p-2 shadow-sm transition-all ease-in-out ${open ? "border-l-brand border-l-2" : ""}`}
      style={{ height }}
      ref={contentRef as React.RefObject<HTMLDivElement>}
    >
      <CollapsibleTrigger
        className="flex w-full items-center justify-between gap-2 px-2"
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
      >
        <h6 className="flex-1 text-left !font-medium !leading-relaxed">{question}</h6>
        <ChevronDownIcon
          size={15}
          className={cn("transition-all", { "-rotate-90": open })}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          className="wysiwyg-view mt-5 px-2"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};
