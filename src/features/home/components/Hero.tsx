import { Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const COLLECTIONS = [
  "Frontend",
  "Backend",
  "Databases",
  "DevOps",
  "Artificial Intelligence",
  "Mobile Development",
  "Desktop Development",
  "Game Development",
  "Programming Languages",
  "Security",
  "Testing",
  "Git & Collaboration",
  "Software Architecture",
  "UI / UX",
  "Tools",
  "Career",
  "Algorithms & Computer Science",
  "Networking",
  "Operating Systems",
];

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center py-10 lg:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
          <Sparkles className="size-4 text-accent" />
          AI-organized knowledge, not another feed
        </span>

        <h1 className="mb-8 text-5xl md:text-7xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground">
          Build your knowledge,
          <br />
          not just your audience.
        </h1>

        <p className="mb-6 max-w-2xl text-base md:text-lg  text-muted-foreground">
          Write articles, connect ideas, and let AI organize everything into a
          living knowledge graph that grows with you.
        </p>

        <div className="mb-10 flex items-center gap-3">
          <Button size="lg" className="lift" asChild>
            <Link href="/write">Start Writing</Link>
          </Button>

          <Button size="lg" variant="outline" className="lift" asChild>
            <Link href="/explore">Explore Articles</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {COLLECTIONS.map((item) => (
            <div
              key={item}
              className="lift rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:text-foreground cursor-default"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
