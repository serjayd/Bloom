import { ArrowUpRight, Heart } from "lucide-react";
import Link from "next/link";

import { TPost } from "@/types/post";

interface Collection {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  collection: Collection;
  posts: TPost[];
}

export default function CollectionPosts({ collection, posts }: Props) {
  return (
    <section className="sticky top-20">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Collection
            </p>

            <h2 className="mt-1 truncate text-lg font-semibold tracking-tight">
              {collection.name}
            </h2>
          </div>

          <Link
            href={`/explore`}
            className="shrink-0 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
          </Link>
        </div>

        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Most liked articles in this collection.
        </p>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-sm font-medium">No articles yet</p>

          <p className="mt-1 text-xs text-muted-foreground">
            This collection doesn&apos;t have any published articles.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/explore/${post.slug}`}
              className="group block border-b border-border p-4 last:border-b-0 hover:bg-muted/50"
            >
              <div className="flex gap-3">
                <div className="min-w-0 flex-1">
                  {/* Title */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-sm font-medium leading-5 tracking-tight transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>

                    <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>

                  {/* Author */}
                  <p className="mt-2 truncate text-xs text-muted-foreground">
                    {post.author.name}
                  </p>

                  {/* Likes */}
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart className="size-3" />

                    <span>{post._count.likes}</span>

                    <span>likes</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
