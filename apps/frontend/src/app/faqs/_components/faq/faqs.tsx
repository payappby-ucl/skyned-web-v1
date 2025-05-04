"use client";

import FAQ from "./faq";
import React from "react";
import { IFaq } from "@workspace/shared";

interface Props {
  faqs: Pick<IFaq, "answer" | "question">[];
}

const FAQs: React.FC<Props> = ({ faqs }) => {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <FAQ faq={faq} key={faq.question} />
      ))}
    </div>
  );
};

export default FAQs;
