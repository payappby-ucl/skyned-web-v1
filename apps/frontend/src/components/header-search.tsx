"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { SearchIcon } from "lucide-react";
import HeroSearch from "../app/_components/search";

export function HeaderSearch() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="hover:bg-brand-50/10 transition-colors cursor-pointer">
          <SearchIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-transparent border-0 shadow-none p-0 !gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Programs and Countries</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#3477FE] to-[#002369] rounded-3xl shadow-2xl border border-white/20">
          <div className="mb-8 text-center">
            <h2 className="text-white text-3xl font-bold tracking-tight mb-2">Find Your Future</h2>
            <p className="text-brand-50/80 text-sm">Search through thousands of programs across the globe</p>
          </div>
          <div className="w-full max-w-2xl">
            <HeroSearch onSearch={() => setOpen(false)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
