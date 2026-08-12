import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import LikeButtonClient from "./LikeButtonClient";

interface Props {
  postId: string;
}

export default async function LikeButton({ postId }: Props) {
  const session = await getSession();

  if (!session) return null;

  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId: session.user.id,
      },
    },
  });

  return <LikeButtonClient postId={postId} initialLiked={!!existingLike} />;
}
