import Logo from "@/shared/ui/Logo";
import Link from "next/link";
import Container from "@/shared/ui/Container";

const FOOTER_LINKS = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Explore", href: "/explore" },
      { label: "Collections", href: "/collections" },
      { label: "Create Post", href: "/create-post" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Posts", href: "/posts" },
      { label: "Topics", href: "/topics" },
      { label: "Developers", href: "/developers" },
      { label: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Community", href: "/community" },
      { label: "About", href: "/about" },
      { label: "GitHub", href: "https://github.com/serjayd" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background/50 py-10">
      <Container>
        <div className="grid gap-8 md:grid-cols-4 mb-10">
          {/* Brand */}
          <div>
            <Logo />

            <p className="text-xs leading-relaxed text-muted-foreground max-w-xs mt-4">
              A place for developers to learn, share knowledge, and document
              what they build.
            </p>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>

              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-6">
          <span className="text-xs text-muted-foreground">
            © 2026 Bloom. All rights reserved.
          </span>

          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>

            <Link
              href="/status"
              className="hover:text-foreground transition-colors"
            >
              Status
            </Link>

            <Link
              href="https://github.com/serjayd"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
