"use client";

import Loading from "@/src/components/loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Loader2Icon } from "lucide-react";
import React from "react";

interface Props {
  open: boolean;
}
const LoadingTemplateModal: React.FC<Props> = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-2xl">Bulk Upload</DialogTitle>
          <DialogDescription>Loading Bulk programs</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Loader2Icon
            size={14}
            className="text-muted-foreground animate-spin"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingTemplateModal;
