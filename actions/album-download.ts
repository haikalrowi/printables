"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

export async function create({
  email,
  Album,
}: Prisma.AlbumDownloadCreateInput) {
  const {
    Album: { google_drive_uc_id },
  } = await prisma.albumDownload.create({
    data: { email, Album: { connect: { id: Album.connect?.id } } },
    include: { Album: {} },
  });
  revalidatePath("/", "layout");
  redirect(google_drive_uc_id);
}

export const { count } = prisma.albumDownload;
