"use client";

import { Book, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Navigation {
  href: string;
  icon: JSX.Element;
  text: string;
  badgeContent: number;
}

export const links = [
  {
    href: "/dashboard",
    icon: <Home className="size-5 md:size-4" />,
    text: "Dashboard",
    badgeContent: 0,
  },
  {
    href: "/dashboard/printables",
    icon: <Book className="size-5 md:size-4" />,
    text: "Printables",
    badgeContent: 0,
  },
] as const satisfies Navigation[];

interface DashboardNavigationProps {
  mobile: boolean;
}

export function DashboardNavigation({ mobile }: DashboardNavigationProps) {
  const pathname = usePathname();
  return links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={
        mobile
          ? cn(
              `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2`,
              link.href === pathname
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )
          : cn(
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-all`,
              link.href === pathname
                ? "bg-muted text-primary"
                : "text-muted-foreground hover:text-primary",
            )
      }
    >
      {link.icon}
      {link.text}
      {!!link.badgeContent && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {link.badgeContent}
        </Badge>
      )}
    </Link>
  ));
}
