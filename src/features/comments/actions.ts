"use server";

import { getSession } from "@/lib/session";
import { commentSchema } from "./schemas";
import prisma from "@/lib/prisma";

export async function createComment(data: unknown, postId: string) {
  const parsed = commentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid post data",
    };
  }

  const { content } = parsed.data;

  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
      },
    });

    if (!post) {
      return {
        success: false,
        error: "Post not found",
      };
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: session.user.id,
        postId: post.id,
      },
    });

    return {
      success: true,
      comment,
    };
  } catch (error) {
    console.error("Failed to create comment:", error);

    return {
      success: false,
      error: "Failed to create comment",
    };
  }
}

export async function deleteComment(commentId: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!comment) {
      return {
        success: false,
        error: "Comment not found",
      };
    }

    if (comment.authorId !== session.user.id) {
      return {
        success: false,
        error: "You can only delete your own comments",
      };
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to delete comment:", error);

    return {
      success: false,
      error: "Failed to delete comment",
    };
  }
}

export async function updateComment(commentId: string, content: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        authorId: true,
      },
    });

    if (!comment) {
      return {
        success: false,
        error: "Comment not found",
      };
    }

    if (comment.authorId !== session.user.id) {
      return {
        success: false,
        error: "You can only edit your own comments",
      };
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content.trim(),
      },
    });

    return {
      success: true,
      comment: updatedComment,
    };
  } catch (error) {
    console.error("Failed to update comment:", error);

    return {
      success: false,
      error: "Failed to update comment",
    };
  }
}
