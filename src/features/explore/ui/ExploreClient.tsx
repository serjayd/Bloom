"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { COLLECTIONS } from "@/features/posts/constants";

import { TPost } from "@/types/post";
import PostCard from "./PostCard";
import { Flower } from "lucide-react";

interface Props {
  posts: TPost[];
}

export default function ExploreClient({ posts }: Props) {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );

  const filteredPosts = useMemo(() => {
    if (!selectedCollection) {
      return posts;
    }

    return posts.filter((post) => post.collection.name === selectedCollection);
  }, [posts, selectedCollection]);

  return (
    <>
      <section className="flex flex-wrap items-center gap-2 justify-center">
        <Button
          variant={selectedCollection === null ? "default" : "outline"}
          onClick={() => setSelectedCollection(null)}
          className="lift"
        >
          All
        </Button>

        {COLLECTIONS.map((collection) => (
          <Button
            key={collection}
            className="lift"
            variant={selectedCollection === collection ? "default" : "outline"}
            onClick={() => setSelectedCollection(collection)}
          >
            {collection}
          </Button>
        ))}
      </section>

      <section className="mt-10">
        {filteredPosts.length === 0 && (
          <div className="flex min-h-100 flex-col items-center justify-center text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl border bg-muted/40 shadow-sm">
              <Flower className="size-7 text-muted-foreground" />
            </div>

            <h2 className="text-lg font-semibold tracking-tight">
              Nothing has bloomed here yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              There are no posts in this collection yet. Check back later, or
              explore another collection and discover something new.
            </p>
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
