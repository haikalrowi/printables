"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AlbumForm } from "./album-form";

interface DashboardPrintablesDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardPrintablesDialog({
  className,
}: DashboardPrintablesDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a printable</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <AlbumForm action="create" onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
