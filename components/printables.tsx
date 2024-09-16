import { Download } from "lucide-react";

import { findMany } from "@/actions/album";
import { albumCover } from "@/lib/supabase/constants";
import { createClient } from "@/lib/supabase/server";

import { AlbumArtwork } from "./album-artwork";
import { PrintablesDialog } from "./printables-dialog";

export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image.";

export async function Printables() {
  const supabase = createClient();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid justify-items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {(await findMany()).map((album) => {
          const res = supabase.storage
            .from(albumCover)
            .getPublicUrl(album.cover);
          const albumCoverSrc = res.data.publicUrl;
          return (
            <AlbumArtwork
              key={album.name}
              album={album}
              albumCoverSrc={albumCoverSrc}
              className="w-64"
              aspectRatio="portrait"
              width={16 * 16}
              height={16 * 20}
              overlayContent={
                <PrintablesDialog
                  album={album}
                  className="absolute inset-0 inline-flex items-center justify-center opacity-0 transition-colors hover:bg-accent hover:opacity-90"
                  triggerContent={
                    <>
                      <Download className="mr-2 size-4" />
                      Download
                    </>
                  }
                />
              }
            />
          );
        })}
      </div>
    </main>
  );
}
