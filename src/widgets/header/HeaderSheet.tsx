import Logo from "@/shared/ui/Logo";
import { ModeToggle } from "@/shared/ui/ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import { HeaderUser } from "./HeaderUser";
import { TUser } from "@/types/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: TUser | undefined;
}

export default function HeaderSheet({ open, onOpenChange, user }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full max-w-sm flex-col p-0">
        <SheetHeader className="border-b">
          <SheetTitle className="flex justify-start">
            <Logo onNavigate={() => onOpenChange(false)} />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4">
            {user && (
              <div className="mb-6">
                <HeaderSearch />
              </div>
            )}

            <nav className="flex flex-col gap-2">
              <HeaderNav onNavigate={() => onOpenChange(false)} />
            </nav>

            {!user && (
              <div className="mt-8 space-y-2">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/sign-in">Sign in</Link>
                </Button>

                <Button className="w-full" asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <ModeToggle />

              {user && (
                <HeaderUser
                  user={user}
                  onNavigate={() => onOpenChange(false)}
                />
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
