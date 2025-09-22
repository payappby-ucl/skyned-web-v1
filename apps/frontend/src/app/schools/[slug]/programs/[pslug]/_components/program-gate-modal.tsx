"use client";

import { IProgram } from "@workspace/shared";
import React, { useEffect, useState } from "react";
import { ApplyForm } from "./apply-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { brandClientApi } from "@/src/lib/client";

interface Props {
  program: IProgram;
}

export const ProgramGateModal: React.FC<Props> = ({ program }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const pGate = brandClientApi.storage.localStorage.getItem("gate");
    if (!pGate) setOpen(true);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[97vh] min-w-[97vw] space-y-10 overflow-y-auto">
        <DialogHeader className="mx-auto max-w-2xl">
          <DialogTitle className="!text-lg">
            Get Full Program Details
          </DialogTitle>
          <DialogDescription>
            We provide complete information about program curriculum, career
            prospects, and scholarship opportunities. Please share your contact
            so we can send you updates and admission guidance.
          </DialogDescription>
        </DialogHeader>

        <ApplyForm program={program} />
      </DialogContent>
    </Dialog>
  );
};
