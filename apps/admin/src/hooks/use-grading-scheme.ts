"use client";

import { schemes, educationLevels } from "@workspace/shared";
import { useMemo, useState } from "react";

interface Props {
  melDegree: number;
  mel: keyof typeof educationLevels;
}

const useGradingScheme = ({ mel, melDegree }: Props) => {
  const gradingSchemes = useMemo(() => {
    let gSchemes: (keyof typeof schemes | "others")[] = ["others"];

    if (melDegree && mel) {
      const melObject = educationLevels[mel].find(
        ({ levelValue }) => Number(levelValue) === Number(melDegree),
      );

      if (melObject?.schemes?.length) {
        gSchemes = [...melObject.schemes.map((s) => s.key), "others"];
      }
    }

    return gSchemes;
  }, [melDegree, mel]);

  const [selectedGradingScheme, setSelectedGradingScheme] = useState<
    (keyof typeof schemes | "others") | ""
  >("");

  const [gradingScale, setGradingScale] = useState<{
    min: number;
    max: number;
    step: number;
  } | null>(null);

  return {
    gradingScale,
    setGradingScale,
    selectedGradingScheme,
    setSelectedGradingScheme,
    gradingSchemes,
  };
};
export default useGradingScheme;
