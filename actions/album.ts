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
}: Prisma.AlbumCreateInput) {
  await verifySession();
  await prisma.album.upsert({
    where: { id },
    update: { name, artist, cover },
    create: { name, artist, cover },
  });
  revalidatePath("/", "layout");
}

export async function findMany() {
  return prisma.album.findMany();
}

export async function del({ id }: Prisma.AlbumCreateInput) {
  await verifySession();
  await prisma.album.delete({ where: { id } });
  revalidatePath("/", "layout");
}
