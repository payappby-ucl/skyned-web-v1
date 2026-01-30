"use client";
import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <Loader2Icon size={14} className="text-muted-foreground animate-spin" />
    </section>
  );
};

export default Loading;
