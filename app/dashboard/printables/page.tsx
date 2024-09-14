import { PlusIcon } from "lucide-react";

import { findMany } from "@/actions/album";
import { AlbumArtwork } from "@/components/album-artwork";
import { DashboardPrintablesDialog } from "@/components/dashboard-printables-diaolog";
import { cn } from "@/lib/utils";

export const revalidate = 0;

export default async function Printables() {
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
          <DashboardPrintablesDialog className="absolute inset-0" />
        </div>
      </div>
      {(await findMany()).map((album) => (
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
