import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CommentsSection from "@/features/comments/ui/CommentsSection";
import ShareButton from "@/features/comments/ui/ShareButton";
import LikeButton from "@/features/likes/ui/LikeButton";
import { PostContent } from "@/features/posts/ui/PostContentWrapper";
import RelatedPosts from "@/features/posts/ui/RelatedPosts";
import { TableOfContent } from "@/features/posts/ui/TableOfContent";
import prisma from "@/lib/prisma";
import Container from "@/shared/ui/Container";
import { formatDate } from "@/utils/dateFormatter";
import { getReadingTime } from "@/utils/getReadingTime";
import { PartialBlock } from "@blocknote/core";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const content = post.content as PartialBlock[];

  const userInitials =
    post.author.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  const readingTime = getReadingTime(content);

  return (
    <main className="min-h-screen">
      <Container>
        <div className="py-8 sm:py-12 lg:py-16">
          {/* Back */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="-ml-2 gap-2 text-muted-foreground"
              asChild
            >
              <Link href="/explore">
                <ArrowLeft className="size-4" />
                Back to explore
              </Link>
            </Button>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-4 lg:gap-12">
            {/* Article */}
            <article className="min-w-0 lg:col-span-3">
              {/* Collection */}
              <Link
                href={`/collections/${post.collection.id}`}
                className="mb-5 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/15"
              >
                {post.collection.name}
              </Link>

              {/* Title */}
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {/* Author / actions */}
              <div className="mt-8 flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Link href={`/profile/${post.author.id}`}>
                    <Avatar className="size-10">
                      <AvatarImage
                        src={post.author.image ?? undefined}
                        alt={post.author.name}
                      />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </Link>

                  <div>
                    <Link
                      href={`/profile/${post.author.id}`}
                      className="text-sm font-medium transition-colors hover:text-accent"
                    >
                      {post.author.name}
                    </Link>

                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <LikeButton postId={post.id} />
                    <span className="min-w-6 text-sm text-muted-foreground">
                      {post._count.likes}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="icon-lg"
                      variant="secondary"
                      className="rounded-xl"
                      asChild
                    >
                      <Link href="#comments">
                        <MessageCircle />
                      </Link>
                    </Button>
                    <span className="min-w-6 text-sm text-muted-foreground">
                      {post._count.comments}
                    </span>
                  </div>

                  <ShareButton slug={post.slug} />
                </div>
              </div>

              {/* Banner */}
              {post.bannerUrl && (
                <div className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <Image
                    src={post.bannerUrl}
                    alt={post.title}
                    width={1920}
                    height={1080}
                    priority
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <PostContent content={content} />

              {/* Comments */}
              <CommentsSection postId={post.id} />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-6">
                <TableOfContent content={content} />

                <RelatedPosts collectionId={post.collectionId} />
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </main>
  );
}
