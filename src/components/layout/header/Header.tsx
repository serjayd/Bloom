import Container from "@/components/shared/Container";
import Logo from "@/components/shared/Logo";
import { ModeToggle } from "@/components/shared/ModeToggle";

export default function Header() {
  return (
    <header className="border-b border-border">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo name="Bloom" />
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
}
