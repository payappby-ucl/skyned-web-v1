"use client";

import { IProgram } from "@workspace/shared";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

interface Props {
  program: IProgram;
}
const TabWatcher: React.FC<Props> = ({ program }) => {
  const targetIds = useMemo(() => ["description", "requirements"], []);

  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0 },
    );

    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [targetIds]);

  return (
    <div className="bg-background sticky top-[137px] z-50 flex items-center gap-2 border-b md:top-[89.5px]">
      <Link
        href={"#description"}
        className={`${visibleSections["description"] ? "border-brand border-b-3 bg-brand-50 rounded-t-md" : ""} text-md w-fit px-4 py-2 font-semibold`}
      >
        Description
      </Link>

      {program.requirements ? (
        <Link
          href="#requirements"
          scroll
          className={`${visibleSections["requirements"] ? "border-brand border-b-3 bg-brand-50 rounded-t-md" : ""} text-md w-fit px-4 py-2 font-semibold`}
        >
          Requirements
        </Link>
      ) : null}
    </div>
  );
};

export default TabWatcher;
