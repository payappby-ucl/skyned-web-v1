"use client";

import { EnglishProficiency, IProgram } from "@workspace/shared";
import { ArrowBigRight } from "lucide-react";
import React, { useMemo } from "react";

interface Props {
  proficiency: Exclude<IProgram["englishProficiency"], "open">;
  score: IProgram["minimumEnglishProficiencyScore"];
}
const EnglishProficiencyDetails: React.FC<Props> = ({ proficiency, score }) => {
  const cefr = useMemo(
    () => EnglishProficiency.getCefr(proficiency, score),
    [proficiency, score],
  );

  return (
    <span className="flex items-center gap-1">
      ({score} <ArrowBigRight className="size-4" /> {cefr.name})
    </span>
  );
};
export default EnglishProficiencyDetails;
