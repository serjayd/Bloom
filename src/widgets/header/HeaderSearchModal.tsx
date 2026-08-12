"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { searchPosts } from "@/features/search/actions";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HeaderSearchModal({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<
    Awaited<ReturnType<typeof searchPosts>>["posts"]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = query.trim();

    if (!search) {
      return;
    }

    let cancelled = false;

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const result = await searchPosts(search);

        if (cancelled) return;

        if (result.success) {
          setPosts(result.posts);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-5xl gap-0 overflow-hidden rounded-2xl p-0">
        <DialogHeader className="border-b border-border px-5 py-4">
          <DialogTitle className="sr-only">Search Bloom</DialogTitle>

          <div className="flex items-center gap-3">
            <Search className="size-5 shrink-0 text-muted-foreground" />

            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles, collections, authors..."
              className="border-0 p-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </DialogHeader>

        <div className="max-h-125 overflow-y-auto p-2">
          {!hasQuery && (
            <div className="px-3 py-10 text-center">
              <Search className="mx-auto mb-3 size-8 text-muted-foreground/50" />

              <p className="text-sm font-medium">Search Bloom</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Find articles, collections, and developers.
              </p>
            </div>
          )}

          {hasQuery && loading && (
            <div className="px-3 py-10 text-center">
              <p className="text-sm text-muted-foreground">Searching...</p>
            </div>
          )}

          {hasQuery && !loading && posts.length === 0 && (
            <div className="px-3 py-10 text-center">
              <p className="text-sm font-medium">No results found</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Try another title, collection, or author.
              </p>
            </div>
          )}

          {hasQuery && !loading && posts.length > 0 && (
            <div className="space-y-1">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/explore/${post.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="group block rounded-xl p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium group-hover:text-accent">
                        {post.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.author.name}</span>

                        <span>·</span>

                        <span>{post.collection.name}</span>

                        <span>·</span>

                        <span>{post._count.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
