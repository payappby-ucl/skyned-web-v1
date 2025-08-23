"use client";
import { Loader2Icon } from "lucide-react";
import React from "react";

interface Props {
  slim?: boolean;
}
const Loading: React.FC<Props> = ({ slim = false }) => {
  return (
    <section
      className={`flex ${!slim ? "h-screen" : "!py-2"} w-screen items-center justify-center`}
    >
      <Loader2Icon size={14} className="text-muted-foreground animate-spin" />
    </section>
  );
};

export default Loading;
