"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function toggleLike(postId: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const userId = session.user.id;

    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      return {
        success: true,
        liked: false,
      };
    }

    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    return {
      success: true,
      liked: true,
    };
  } catch (error) {
    console.error("Failed to toggle like:", error);

    return {
      success: false,
      error: "Failed to update like",
    };
  }
}
