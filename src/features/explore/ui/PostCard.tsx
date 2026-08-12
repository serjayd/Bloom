import { TPost } from "@/types/post";
import Image from "next/image";
import { Clock, Flower, Heart } from "lucide-react";
import { getReadingTime } from "@/utils/getReadingTime";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PartialBlock } from "@blocknote/core";
import Link from "next/link";
import { getContentPreview } from "@/utils/getContentPreview";

interface Props {
  post: TPost;
}

export default function PostCard({ post }: Props) {
  const content = post.content as PartialBlock[];

  const userInitials =
    post.author.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  const readingTime = getReadingTime(content);
  const preview = getContentPreview(content);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      {/* Cover */}
      <Link
        href={`/explore/${post.slug}`}
        className="relative block h-48 w-full overflow-hidden bg-muted"
      >
        {post.bannerUrl ? (
          <Image
            fill
            src={post.bannerUrl}
            alt={post.title}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
              <Flower className="size-5 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Subtle overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Collection */}
        <Link
          href={`/collections/${post.collection.slug}`}
          className="mb-3 inline-flex w-fit rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent transition-colors hover:bg-accent/15"
        >
          {post.collection.name}
        </Link>

        {/* Title + preview */}
        <Link href={`/explore/${post.slug}`} className="block">
          <h3 className="line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {preview}
          </p>
        </Link>

        {/* Footer pushed to bottom */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
          {/* Author */}
          <Link
            href={`/profile/${post.author.id}`}
            className="flex min-w-0 items-center gap-2"
          >
            <Avatar className="size-8">
              <AvatarImage
                src={post.author.image ?? undefined}
                alt={post.author.name}
              />
              <AvatarFallback className="text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{post.author.name}</p>

              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </Link>

          {/* Likes */}
          <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            <Heart className="size-3.5" />
            <span>{post._count.likes}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
