"use client";

import { educationLevels } from "@workspace/shared";
import React, { PropsWithChildren, useMemo } from "react";

const UploadGuideline: React.FC<PropsWithChildren> = ({ children }) => {
  const mgpaMappings = useMemo(() => {
    const entries = Object.entries(educationLevels);
    const options = entries.flatMap(([_, levels]) =>
      levels.map((level) => level),
    );

    const values = options.map((op) => op.levelValue);

    const max = Math.max(...values);
    const min = Math.min(...values);

    return {
      min,
      max,
      options: options.map((opt) => `${opt.levelValue} - ${opt.level}`),
    };
  }, []);

  return (
    <div className="space-y-2 rounded-md border border-dashed border-blue-500 bg-blue-500/5 p-4">
      <h2 className="!text-xl">Upload Guidelines</h2>
      <div className="text-sm">
        <p>For proper upload, please follow the guidelines below.</p>
      </div>
      <ul className="ml-2 list-disc text-sm">
        <li>Ensure there are not programs with exact same names</li>
        <li>
          <p>
            Minimum GPA expects a number between {mgpaMappings.min} and{" "}
            {mgpaMappings.max} which are mapped as follows:{" "}
          </p>
          <ul>
            {mgpaMappings.options.map((mapping) => (
              <li key={mapping}>{mapping}</li>
            ))}
          </ul>
        </li>
        <li>Ensure that minimum GPA matches education level</li>
        <li>
          Intakes a display in the format{" "}
          <span className="font-semibold">"1 - JUN 2026, 2 - MAR 2026"</span>.
          Do not rearrange or add to what's displayed. However, you can remove
          an intake but each items should be comma separated.
        </li>
        <li>PGWP is represented by 0(False) and 1(True)</li>
        <li>
          <h2 className="!text-sm">English Proficiencies</h2>
          <ul className="list-inside list-disc">
            <li>Allowed test scores are IELTS, PTE, DUOLINGO, TOEFL</li>
            <li>An example format has be populated onn the fields</li>
            <li>Each items should be separated by a comma</li>
            <li>
              You can leave the cell blank if you do not want a test proficiency
              for a program
            </li>
            <li>
              Ensure test scores are within the correct range based on the test
              type
            </li>
          </ul>
        </li>
        <li>Make sure all empty rows are deleted before uploading</li>
      </ul>
      {children}
    </div>
  );
};
export default UploadGuideline;
