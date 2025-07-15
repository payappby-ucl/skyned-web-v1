"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";
import { Button } from "./button.js";

interface Props {
  title: string;
  description: string;
  actionText: string;
  action(): void;
  Icon?: React.ReactNode;
  triggerText?: string;
}

const ActionAlert: React.FC<Props> = ({
  title,
  description,
  actionText,
  action,
  Icon,
  triggerText,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" role="button" variant="ghost" size="icon">
          {Icon || null} {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-3xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="!flex-col">
          <DialogClose asChild>
            <Button type="button" role="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            role="button"
            variant="destructive"
            onClick={() => {
              action();
              setOpen(false);
            }}
          >
            {actionText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export { ActionAlert };
