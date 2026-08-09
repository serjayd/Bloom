import prisma from "@/lib/prisma";
import { getReadingTime } from "@/utils/getReadingTime";
import { PartialBlock } from "@blocknote/core";
import Link from "next/link";

interface Props {
  collectionId: string;
}

export default async function RelatedPosts({ collectionId }: Props) {
  const relatedPosts = await prisma.post.findMany({
    where: {
      collectionId,
      type: "PUBLISHED",
      publishedAt: {
        not: null,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 3,
  });

  return (
    <div className="w-full rounded-xl border border-border p-4">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
        Related articles
      </h2>
      <div className="space-y-2">
        {relatedPosts.map((post) => (
          <div key={post.id}>
            <Link
              href={`/explore/${post.slug}`}
              className="text-sm font-medium leading-snug hover:underline transition"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">
              {getReadingTime(post.content as PartialBlock[])} min read
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
