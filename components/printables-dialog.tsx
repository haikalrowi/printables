import { DialogTriggerProps } from "@radix-ui/react-dialog";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { albumCover } from "@/lib/supabase/constants";
import { createClient } from "@/lib/supabase/server";

import { AlbumArtworkProps } from "./album-artwork";
import { PrintablesDownloadForm } from "./printables-download-form";

interface PrintablesDialogProps
  extends DialogTriggerProps,
    Partial<Pick<AlbumArtworkProps, "album">> {
  triggerContent: React.ReactNode;
}

export function PrintablesDialog({
  triggerContent,
  album,
  ...props
}: PrintablesDialogProps) {
  if (!album?.cover) {
    return null;
  }
  const supabase = createClient();
  const res = supabase.storage.from(albumCover).getPublicUrl(album.cover);
  const albumCoverSrc = res.data.publicUrl;
  return (
    <Dialog>
      <DialogTrigger {...props}>{triggerContent}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{album?.name}</DialogTitle>
          <DialogDescription>{album?.artist}</DialogDescription>
        </DialogHeader>
        <div className="flex space-x-5">
          <Image
            className="aspect-square w-1/2 rounded-md object-cover"
            src={albumCoverSrc}
            alt="Album cover"
            width={16 * 12}
            height={16 * 12}
          />
          <PrintablesDownloadForm className="flex aspect-square w-1/2 flex-col" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
