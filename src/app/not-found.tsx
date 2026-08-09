import Link from "next/link";
import { ArrowLeft, Flower } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-8 flex size-12 items-center justify-center rounded-xl border bg-muted/40 shadow-sm">
          <Flower className="size-7 text-muted-foreground" />
        </div>

        <p className="mb-3 text-sm font-medium tracking-wide text-muted-foreground">
          404 · Nothing here
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          This idea hasn&apos;t bloomed yet.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, may have moved,
          or is still waiting to grow.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <ArrowLeft className="size-4" />
            Back home
          </Link>

          <Link
            href="/explore"
            className="inline-flex h-10 items-center rounded-xl border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Explore ideas
          </Link>
        </div>
      </div>
    </main>
  );
}
