import Container from "@/shared/ui/Container";
import Logo from "@/shared/ui/Logo";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import { ModeToggle } from "@/shared/ui/ModeToggle";
import { HeaderUser } from "./HeaderUser";
import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeaderOpenButton from "./HeaderOpenButton";

export default async function Header() {
  const session = await getSession();

  // Get Articles, Authors, Topics last 4 pass to header search

  return (
    <header className="border-b border-border">
      <Container>
        <div className="flex h-16 items-center gap-8 justify-between">
          <Logo name="Bloom" />
          <nav className="hidden lg:block">
            <HeaderNav />
          </nav>
          <div className="hidden lg:flex ml-auto items-center gap-2">
            {session ? (
              <HeaderSearch />
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Sign in</Link>
                </Button>

                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}

            <ModeToggle />

            {session && <HeaderUser user={session?.user} />}
          </div>
          <HeaderOpenButton user={session?.user} />
        </div>
      </Container>
    </header>
  );
}
