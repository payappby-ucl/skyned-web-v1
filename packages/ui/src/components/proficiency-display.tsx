"use client";

import { ArrowBigRight } from "lucide-react";
import React, { useMemo } from "react";

interface Props {
  name: string;
  tags: any;
  test: string;
  score: number;
  slim?: boolean;
}
const ProficiencyDisplay: React.FC<Props> = ({
  slim,
  name,
  test,
  score,
  tags,
}) => {
  const style = useMemo(() => {
    const sty = {
      bg: "",
      text: "",
      fbg: "",
    };

    switch (name) {
      case "A1":
        {
          sty.bg = "bg-pink-100";
          sty.text = "text-black";
          sty.fbg = "bg-pink-400";
        }
        break;
      case "A2":
        {
          sty.bg = "bg-teal-100";
          sty.text = "text-black";
          sty.fbg = "bg-teal-400";
        }
        break;
      case "B1":
        {
          sty.bg = "bg-amber-100";
          sty.text = "text-black";
          sty.fbg = "bg-amber-400";
        }
        break;
      case "B2":
        {
          sty.bg = "bg-purple-100";
          sty.text = "text-black";
          sty.fbg = "bg-purple-400";
        }
        break;
      case "C1":
        {
          sty.bg = "bg-blue-100";
          sty.text = "text-black";
          sty.fbg = "bg-blue-400";
        }
        break;
      case "C2": {
        sty.bg = "bg-yellow-100";
        sty.text = "text-black";
        sty.fbg = "bg-yellow-400";
      }
      default:
        break;
    }

    return sty;
  }, [name]);

  return (
    <div className={`${style.bg} ${style.text} rounded-sm overflow-hidden`}>
      <div className="py-2 px-4">
        {!slim ? (
          <p className="text-xs uppercase font-bold">{tags[0]}</p>
        ) : null}

        <div
          className={`flex gap-2 items-center justify-between uppercase font-semibold ${slim ? "text-sm" : "text-lg"}`}
        >
          <p>{test}</p>
          <p className="flex items-center gap-1">
            {score} <ArrowBigRight className="size-4" /> {name}
          </p>
        </div>
      </div>
      {!slim ? (
        <p className={`text-center text-sm p-1 font-semibold ${style.fbg}`}>
          {tags[1]}
        </p>
      ) : null}
    </div>
  );
};

export { ProficiencyDisplay };
