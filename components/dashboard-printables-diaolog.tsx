"use client";

import { DialogTriggerProps } from "@radix-ui/react-dialog";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AlbumArtworkProps } from "./album-artwork";
import { AlbumForm } from "./album-form";

export interface DashboardPrintablesDialogProps
  extends DialogTriggerProps,
    Partial<Pick<AlbumArtworkProps, "album">> {
  action: "create" | "update" | "delete";
  triggerContent: React.ReactNode;
}

export function DashboardPrintablesDialog({
  action,
  triggerContent,
  album,
  ...props
}: DashboardPrintablesDialogProps) {
  const [open, setOpen] = useState(false);
  const renderDialogContent = () => (
    <DialogContent>
      <DialogHeader>
        {action === "create" && <DialogTitle>Create a printable</DialogTitle>}
        {action === "update" && <DialogTitle>Edit a printable</DialogTitle>}
        <DialogDescription />
      </DialogHeader>
      <AlbumForm onOpenChange={setOpen} album={album} />
    </DialogContent>
  );
  const renderAlertDialogContent = () => (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete the printable?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
  if (action === "create" || action === "update") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger {...props}>{triggerContent}</DialogTrigger>
        {renderDialogContent()}
      </Dialog>
    );
  } else if (action === "delete") {
    return (
      <AlertDialog>
        <AlertDialogTrigger {...props}>{triggerContent}</AlertDialogTrigger>
        {renderAlertDialogContent()}
      </AlertDialog>
    );
  }
  return null;
}
