"use server";

import { getServerSession } from "next-auth/next";

import authOptions from "@/app/api/auth/auth-options";

export async function verifySession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw "Unverified session";
  }
}
