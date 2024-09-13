import { PlusIcon } from "lucide-react";

import { AlbumArtwork } from "@/components/album-artwork";
import { listenNowAlbums } from "@/components/album-data";
import { AlbumForm } from "@/components/album-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function Printables() {
  return (
    <div className="grid justify-items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <div className={cn("space-y-3", "w-[250px]")}>
        <div className="group relative overflow-hidden rounded-md">
          <div
            className={cn(
              "flex items-center justify-center rounded-md border-2 border-dashed text-sm group-active:bg-muted",
              "aspect-square",
            )}
          >
            <PlusIcon className="size-8 text-muted group-hover:text-muted-foreground" />
          </div>
          <Dialog>
            <DialogTrigger className="absolute inset-0" />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a printable</DialogTitle>
                <DialogDescription />
              </DialogHeader>
              <AlbumForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {listenNowAlbums.map((album) => (
        <AlbumArtwork
          key={album.name}
          album={album}
          className="w-[250px]"
          aspectRatio="square"
          width={250}
          height={330}
        />
      ))}
    </div>
  );
}
