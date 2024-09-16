import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";

import { findMany } from "@/actions/album";
import { AlbumArtwork } from "@/components/album-artwork";
import { DashboardPrintablesDialog } from "@/components/dashboard-printables-diaolog";
import { Button } from "@/components/ui/button";
import { albumCover } from "@/lib/supabase/constants";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function DashboardPrintables() {
  const supabase = createClient();
  const albums = await findMany();
  return (
    <div className="grid justify-items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <AlbumArtwork
        album={{ name: "", artist: "", cover: "" }}
        albumCoverSrc="data:,"
        className="w-64 [&_img]:opacity-0"
        aspectRatio="square"
        width={16 * 16}
        height={16 * 16}
        overlayContent={
          <DashboardPrintablesDialog
            action="create"
            className="group absolute inset-0 flex items-center justify-center rounded-md border border-dashed text-sm hover:border-2"
            triggerContent={
              <PlusIcon className="size-8 text-muted group-hover:text-muted-foreground" />
            }
          />
        }
      />
      {albums.map((album) => {
        const res = supabase.storage.from(albumCover).getPublicUrl(album.cover);
        const albumCoverSrc = res.data.publicUrl;
        return (
          <AlbumArtwork
            key={album.name}
            album={album}
            albumCoverSrc={albumCoverSrc}
            className="w-64"
            aspectRatio="square"
            width={16 * 16}
            height={16 * 16}
            overlayContent={
              <div className="absolute right-1 top-1 flex flex-col space-y-1 opacity-0 group-hover:opacity-100">
                <DashboardPrintablesDialog
                  action="update"
                  album={album}
                  asChild
                  triggerContent={
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="size-5"
                    >
                      <PencilIcon className="size-3" />
                    </Button>
                  }
                />
                <DashboardPrintablesDialog
                  action="delete"
                  album={album}
                  asChild
                  triggerContent={
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      className="size-5"
                    >
                      <TrashIcon className="size-3" />
                    </Button>
                  }
                />
              </div>
            }
          />
        );
      })}
    </div>
  );
}
