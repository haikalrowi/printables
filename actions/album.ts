"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

import { verifySession } from "./session";

export async function upsert({
  id,
  name,
  artist,
  cover,
  google_drive_uc_id,
}: Prisma.AlbumCreateInput) {
  await verifySession();
  await prisma.album.upsert({
    where: { id },
    update: { name, artist, cover, google_drive_uc_id },
    create: { name, artist, cover, google_drive_uc_id },
  });
  revalidatePath("/", "layout");
}

export const { findMany } = prisma.album;

export async function del({ id }: Prisma.AlbumWhereUniqueInput) {
  await verifySession();
  await prisma.albumDownload.deleteMany({ where: { Album: { id } } });
  await prisma.album.delete({ where: { id } });
  revalidatePath("/", "layout");
}
