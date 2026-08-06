import Container from "@/components/shared/Container";
import Logo from "@/components/shared/Logo";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { HeaderUser } from "./HeaderUser";
import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Header() {
  const session = await getSession();

  // Get Articles, Authors, Topics last 4 pass to header search

  return (
    <header className="border-b border-border">
      <Container>
        <div className="flex h-16 items-center gap-8 justify-between">
          <Logo name="Bloom" />
          <HeaderNav />
          <div className="ml-auto flex items-center gap-2">
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

            {session && <HeaderUser user={session.user} />}
          </div>
        </div>
      </Container>
    </header>
  );
}
