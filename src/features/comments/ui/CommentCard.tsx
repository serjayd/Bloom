import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TComment } from "@/types/comment";
import { formatDate } from "@/utils/dateFormatter";
import Link from "next/link";
import { getSession } from "@/lib/session";
import CommentContent from "./CommentContent";

interface Props {
  comment: TComment;
}

export default async function CommentCard({ comment }: Props) {
  const userInitials =
    comment.author.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  const session = await getSession();

  const isOwner = session?.user.id === comment.author.id;

  return (
    <article className="flex gap-3">
      <Link href={`/profile/${comment.author.id}`} className="shrink-0">
        <Avatar className="size-9">
          <AvatarImage
            src={comment.author.image ?? undefined}
            alt={comment.author.name}
          />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/profile/${comment.author.id}`}
              className="text-sm font-medium hover:underline"
            >
              {comment.author.name}
            </Link>

            <span className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>

        <CommentContent comment={comment} isOwner={isOwner} />
      </div>
    </article>
  );
}
