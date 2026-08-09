import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostContent } from "@/features/posts/ui/PostContentWrapper";
import RelatedPosts from "@/features/posts/ui/RelatedPosts";
import { TableOfContent } from "@/features/posts/ui/TableOfContent";
import prisma from "@/lib/prisma";
import Container from "@/shared/ui/Container";
import { formatDate } from "@/utils/dateFormatter";
import { getReadingTime } from "@/utils/getReadingTime";
import { PartialBlock } from "@blocknote/core";
import { Clock } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SinglePostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      author: true,
      collection: true,
    },
  });

  if (!post) {
    notFound();
  }

  const userInitials =
    post.author.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <div className="min-h-screen py-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start justify-items-end">
          <section className="w-full lg:col-span-3">
            <span className="border border-accent/20 px-2 py-0.5 rounded-full text-xs text-accent bg-accent/10 mb-4 block w-fit">
              {post.collection.name}
            </span>
            <h1 className="text-4xl font-semibold leading-[1.12] mb-2">
              {post.title}
            </h1>
            <div className="flex items-center gap-2  border-b border-border py-4">
              <Avatar>
                <AvatarImage
                  src={post.author.image ?? undefined}
                  alt={post.author.name ?? "User"}
                />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium">{post.author.name}</h3>
                <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  {formatDate(post.publishedAt)}
                  <span>·</span>
                  <Clock className="size-3" />
                  {getReadingTime(post.content as PartialBlock[])} min read
                </p>
              </div>
            </div>
            {post.bannerUrl && (
              <Image
                src={post.bannerUrl}
                alt={post.title}
                width={1920}
                height={1080}
                className="w-full rounded-2xl object-cover shadow-md my-4"
              />
            )}
            <PostContent content={post.content as PartialBlock[]} />
          </section>
          <div className="sticky top-16 space-y-4 lg:max-w-sm w-full">
            <TableOfContent content={post.content as PartialBlock[]} />
            <RelatedPosts collectionId={post.collectionId} />
          </div>
        </div>
      </Container>
    </div>
  );
}
