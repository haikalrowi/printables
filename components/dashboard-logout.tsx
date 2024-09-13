"use client";

import { signOut } from "next-auth/react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function DashboardLogout() {
  return (
    <DropdownMenuItem
      onSelect={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      Logout
    </DropdownMenuItem>
  );
}
