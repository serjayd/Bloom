"use server";

import prisma from "@/lib/prisma";

import slugify from "slugify";
import { postSchema } from "./schemas";
import { getSession } from "@/lib/session";
import { Prisma } from "@/generated/prisma/client";

export async function createPost(data: unknown) {
  const parsed = postSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid post data",
    };
  }

  const { title, collectionId, content, bannerUrl } = parsed.data;

  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (
      await prisma.post.findUnique({
        where: {
          slug,
        },
      })
    ) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        bannerUrl,
        content: content as Prisma.InputJsonValue,

        type: "PUBLISHED",
        publishedAt: new Date(),

        author: {
          connect: {
            id: session.user.id,
          },
        },

        collection: {
          connect: {
            id: collectionId,
          },
        },
      },
    });

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error("Failed to create post:", error);

    return {
      success: false,
      error: "Failed to create post",
    };
  }
}

export async function deletePost(postId: string) {
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
    });

    if (!post) {
      return {
        success: false,
        error: "Post not found",
      };
    }

    if (post.authorId !== session.user.id) {
      return {
        success: false,
        error: "You can only delete your own posts",
      };
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to delete post:", error);

    return {
      success: false,
      error: "Failed to delete post",
    };
  }
}
