import { findMany } from "@/actions/album";

import { AlbumArtwork } from "./album-artwork";

export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image.";

export async function Main() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid justify-items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {(await findMany()).map((album) => (
          <AlbumArtwork
            key={album.name}
            album={album}
            className="w-64"
            aspectRatio="portrait"
            width={16 * 16}
            height={16 * 20}
          />
        ))}
      </div>
    </main>
  );
}
