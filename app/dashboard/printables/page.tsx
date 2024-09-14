import { PencilIcon, PlusIcon, Trash } from "lucide-react";

import { findMany } from "@/actions/album";
import { AlbumArtwork } from "@/components/album-artwork";
import { DashboardPrintablesDialog } from "@/components/dashboard-printables-diaolog";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function Printables() {
  return (
    <div className="grid justify-items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <AlbumArtwork
        album={{ name: "", artist: "", cover: "/" }}
        className="w-[250px]"
        aspectRatio="square"
        width={250}
        height={330}
        overlay={
          <div className="relative">
            <div className="flex aspect-square items-center justify-center rounded-md border border-dashed text-sm group-hover:border-2">
              <PlusIcon className="size-8 text-muted group-hover:text-muted-foreground" />
            </div>
            <DashboardPrintablesDialog className="absolute inset-0" />
          </div>
        }
      />
      {(await findMany()).map((album) => (
        <AlbumArtwork
          key={album.name}
          album={album}
          className="w-[250px]"
          aspectRatio="square"
          width={250}
          height={330}
          overlay={
            <div className="absolute right-1 top-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100">
              <div className="relative">
                <Button className="size-5" variant={"outline"} size={"icon"}>
                  <PencilIcon className="size-3" />
                </Button>
                <DashboardPrintablesDialog className="absolute inset-0" />
              </div>
              <div className="relative">
                <Button
                  className="relative size-5"
                  variant={"destructive"}
                  size={"icon"}
                >
                  <Trash className="size-3" />
                </Button>
                <DashboardPrintablesDialog className="absolute inset-0" />
              </div>
            </div>
          }
        />
      ))}
    </div>
  );
}
