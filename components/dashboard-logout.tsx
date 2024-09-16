"use client";

import { signOut } from "next-auth/react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function DashboardLogout() {
  const logout = () => {
    signOut({ callbackUrl: "/" });
  };
  return <DropdownMenuItem onSelect={logout}>Logout</DropdownMenuItem>;
}
