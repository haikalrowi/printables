"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";

import { links } from "./dashboard-navigation";

export function DashboardPrintablesSearch() {
  const pathname = usePathname();
  if (links[1].href !== pathname) {
    return null;
  }
  return (
    <form>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search printables..."
          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
        />
      </div>
    </form>
  );
}
