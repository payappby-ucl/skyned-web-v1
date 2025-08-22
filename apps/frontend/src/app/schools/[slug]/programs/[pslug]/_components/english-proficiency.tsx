"use client";

import {
  EnglishProficiency,
  EnglishProficiencySchema,
} from "@workspace/shared";
import { ArrowBigRight } from "lucide-react";
import React, { useMemo } from "react";

const EnglishProficiencyDetails: React.FC<EnglishProficiencySchema> = ({
  test,
  score,
}) => {
  const cefr = useMemo(
    () => EnglishProficiency.getCefr(test, score),
    [test, score],
  );

  return (
    <span className="flex items-center gap-1">
      ({score} <ArrowBigRight className="size-4" /> {cefr.name})
    </span>
  );
};
export default EnglishProficiencyDetails;
