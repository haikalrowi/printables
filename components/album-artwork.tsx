import { Prisma } from "@prisma/client";
import Image from "next/image";

import { cn } from "@/lib/utils";

export interface AlbumArtworkProps
  extends React.HTMLAttributes<HTMLDivElement> {
  album: Pick<
    Prisma.AlbumCreateInput,
    "id" | "name" | "artist" | "cover" | "google_drive_uc_id"
  >;
  albumCoverSrc: string;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  overlayContent?: React.ReactNode;
}

export function AlbumArtwork({
  album,
  albumCoverSrc,
  aspectRatio = "portrait",
  width,
  height,
  overlayContent,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="group relative overflow-hidden rounded-md">
        <Image
          src={albumCoverSrc}
          alt={album.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-full object-cover transition-all group-hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
          )}
        />
        <div className="absolute inset-0">{overlayContent}</div>
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-muted-foreground">{album.artist}</p>
      </div>
    </div>
  );
}
