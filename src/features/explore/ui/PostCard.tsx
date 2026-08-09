import { TPost } from "@/types/post";
import Image from "next/image";
import { Clock, Flower } from "lucide-react";
import { getReadingTime } from "@/utils/getReadingTime";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PartialBlock } from "@blocknote/core";
import Link from "next/link";
import { getContentPreview } from "@/utils/getContentPreview";

interface Props {
  post: TPost;
}

export default function PostCard({ post }: Props) {
  const userInitials =
    post.author.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:scale-[1.01] hover:shadow-md">
      <Link
        href={`/explore/${post.slug}`}
        className="block relative h-44 w-full overflow-hidden"
      >
        {post.bannerUrl ? (
          <Image
            fill
            src={post.bannerUrl}
            alt={post.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Flower className="size-7 text-muted-foreground" />
          </div>
        )}
      </Link>

      <div className="p-4">
        <span className="border border-accent/20 px-2 py-0.5 rounded-full text-xs text-accent bg-accent/10 mb-4 block w-fit">
          {post.collection.name}
        </span>
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{post.title}</h3>
          <p className="text-sm text-muted-foreground">
            {getContentPreview(post.content as PartialBlock[])}
          </p>
        </div>

        <div className="flex items-center gap-2 justify-between mt-6 border-t border-border pt-4">
          <Link
            href={`/profile/${post.author.id}`}
            className="flex items-center gap-2"
          >
            <Avatar>
              <AvatarImage
                src={post.author.image ?? undefined}
                alt={post.author.name ?? "User"}
              />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <h3 className="text-sm font-medium hover:underline">
              {post.author.name}
            </h3>
          </Link>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {getReadingTime(post.content as PartialBlock[])} min read
          </p>
        </div>
      </div>
    </article>
  );
}
