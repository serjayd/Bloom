"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import HeaderSheet from "./HeaderSheet";
import { TUser } from "@/types/user";

interface Props {
  user: TUser | undefined;
}

export default function HeaderOpenButton({ user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="block lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>
      {open && <HeaderSheet open={open} onOpenChange={setOpen} user={user} />}
    </>
  );
}
