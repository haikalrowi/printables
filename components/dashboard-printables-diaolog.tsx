"use client";

import { DialogTriggerProps } from "@radix-ui/react-dialog";
import { useState } from "react";

import { del } from "@/actions/album";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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
  const [openDialog, setOpenDialog] = useState(false);
  const renderDialogContent = () => (
    <DialogContent>
      <DialogHeader>
        {action === "create" && <DialogTitle>Create a printable</DialogTitle>}
        {action === "update" && <DialogTitle>Edit a printable</DialogTitle>}
        <DialogDescription />
      </DialogHeader>
      <AlbumForm onOpenChange={setOpenDialog} album={album} />
    </DialogContent>
  );
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { toast } = useToast();
  const renderAlertDialogContent = () => {
    const deleteAlbum = async () => {
      setDeleteLoading(true);
      await del({ id: album?.id });
      setDeleteLoading(false);
      setOpenAlertDialog(false);
      toast({ title: "OK" });
    };
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete the printable?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            printable.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={deleteAlbum}
            disabled={deleteLoading}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  };
  if (action === "create" || action === "update") {
    return (
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger {...props}>{triggerContent}</DialogTrigger>
        {renderDialogContent()}
      </Dialog>
    );
  } else if (action === "delete") {
    return (
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogTrigger {...props}>{triggerContent}</AlertDialogTrigger>
        {renderAlertDialogContent()}
      </AlertDialog>
    );
  }
  return null;
}
