"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  item: {
    href: string;
    label: string;
  };
}

export default function NavItem({ item }: Props) {
  const pathname = usePathname();

  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm transition-colors font-medium",
        isActive
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {item.label}
    </Link>
  );
}
