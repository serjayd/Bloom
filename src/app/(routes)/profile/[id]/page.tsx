import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import Container from "@/shared/ui/Container";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;

  const session = await getSession();

  if (!session) {
    return null;
  }

  const isOwner = session.user.id === id;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
    },
  });

  if (!user) {
    notFound();
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: id,
      type: "PUBLISHED",
    },
    orderBy: {
      publishedAt: "desc",
    },
    include: {
      collection: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  const userInitials =
    user.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  const totalLikes = posts.reduce(
    (total, post) => total + post._count.likes,
    0,
  );

  return (
    <main className="min-h-screen py-10 sm:py-14">
      <Container>
        {/* Profile header */}
        <section className="border-b border-border pb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="size-20 border border-border sm:size-24">
                <AvatarImage
                  src={user.image ?? undefined}
                  alt={user.name ?? "User"}
                />
                <AvatarFallback className="text-xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              <div className="pt-1">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {user.name}
                </h1>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    <strong className="font-medium text-foreground">
                      {posts.length}
                    </strong>{" "}
                    {posts.length === 1 ? "article" : "articles"}
                  </span>

                  <span>·</span>

                  <span>
                    <strong className="font-medium text-foreground">
                      {totalLikes}
                    </strong>{" "}
                    likes
                  </span>
                </div>
              </div>
            </div>

            {isOwner ? (
              <Button variant="outline" size="lg" asChild>
                <Link href="/settings/profile">
                  <Pencil className="size-4" />
                  Edit profile
                </Link>
              </Button>
            ) : (
              <Button variant="default" size="lg">
                Follow
              </Button>
            )}
          </div>
        </section>

        {/* Articles */}
        <section className="py-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight">Articles</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Knowledge shared by {user.name}.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <p className="font-medium">
                {isOwner
                  ? "You haven't published anything yet."
                  : "No articles yet."}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {isOwner
                  ? "Start writing and share your knowledge with Bloom."
                  : "This developer hasn't published any articles yet."}
              </p>

              {isOwner && (
                <Button className="mt-5" asChild>
                  <Link href="/write">Write an article</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/explore/${post.slug}`}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-xs text-accent">
                        {post.collection.name}
                      </span>

                      <h3 className="mt-3 font-semibold tracking-tight transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>
                    </div>

                    <span className="shrink-0 text-xs text-muted-foreground">
                      {post._count.likes} likes
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
