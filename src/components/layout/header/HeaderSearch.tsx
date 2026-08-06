"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import HeaderSearchModal from "./HeaderSearchModal";

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);

  // Filter data return filtered Articles, Topics, Authours, Search to Header Search Modal

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="lift h-10 w-64 justify-start gap-2 rounded-xl px-3 text-muted-foreground hover:bg-muted transition-all"
      >
        <Search className="size-4" />
        <span>Search</span>

        <span className="ml-auto text-xs">⌘K</span>
      </Button>
      {open && <HeaderSearchModal open={open} onOpenChange={setOpen} />}
    </>
  );
}
