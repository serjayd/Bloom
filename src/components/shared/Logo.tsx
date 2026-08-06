import { Flower } from "lucide-react";
import Link from "next/link";

interface Props {
  name?: string;
}

export default function Logo({ name }: Props) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:shadow-md">
        <Flower className="relative z-10 size-5 text-amber-600 transition-transform duration-300 group-hover:scale-110 dark:text-amber-500" />

        {/* Shine */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full dark:via-white/15" />
      </div>

      {name && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          {name}
        </span>
      )}
    </Link>
  );
}
