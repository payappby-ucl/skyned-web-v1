"use client";

import { educationLevels, IProgram } from "@workspace/shared";
import React, { useMemo } from "react";

interface Props {
  level: IProgram["minimumEducationLevel"];
  degree: IProgram["minimumEducationDegree"];
}
const EducationLevel: React.FC<Props> = ({ level, degree }) => {
  const melDegree = useMemo(
    () => educationLevels[level].find((level) => level.levelValue === degree),
    [level, degree],
  );

  return <>{melDegree?.level}</>;
};
export default EducationLevel;
