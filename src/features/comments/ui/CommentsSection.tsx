import { MessageCircle } from "lucide-react";
import CommentForm from "./CommentForm";
import prisma from "@/lib/prisma";
import CommentCard from "./CommentCard";

interface Props {
  postId: string;
}

export default async function CommentsSection({ postId }: Props) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: {
        select: {
          image: true,
          name: true,
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section id="comments" className="mt-16 border-t border-border pt-10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <MessageCircle className="size-5 text-muted-foreground" />

        <h2 className="text-xl font-semibold tracking-tight">Discussion</h2>

        <span className="text-sm text-muted-foreground">
          ({comments.length})
        </span>
      </div>

      {/* Comment form */}

      <CommentForm postId={postId} />

      {comments.length > 0 ? (
        <div className="mt-8 w-full space-y-6 rounded-md border border-border bg-card p-4 shadow-sm">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <MessageCircle className="mx-auto mb-3 size-8 text-muted-foreground/50" />

          <p className="text-sm font-medium">No comments yet</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Be the first to start the discussion.
          </p>
        </div>
      )}
    </section>
  );
}
