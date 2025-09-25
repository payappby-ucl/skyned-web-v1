"use client";

import { financialAids, ProgramSchema } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { FinancialAidPartner } from "@workspace/ui/components/financial-aid-partner";
import { Switch } from "@workspace/ui/components/switch";
import { Plus } from "lucide-react";
import React, { useState } from "react";

interface Props {
  onChange(values: ProgramSchema["financialAids"]): void;
  /** Already added aids */
  aids: ProgramSchema["financialAids"];
}

const FinancialAidsForm: React.FC<Props> = ({ aids, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Plus className="size-5.5 rounded-md border p-1" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-xl">Add Financial Aids</DialogTitle>
          {/* <DialogDescription>Add a Financial Aid</DialogDescription> */}
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2">
          {financialAids.map((aid) => (
            <div
              className="flex items-center justify-between gap-2 rounded-md border px-3 py-2"
              key={aid}
            >
              <FinancialAidPartner name={aid} />

              <Switch
                checked={aids.includes(aid)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange([...aids, aid]);
                  } else {
                    onChange(aids.filter((a) => a !== aid));
                  }
                }}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialAidsForm;
