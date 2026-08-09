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

  const { title, collectionId, content } = parsed.data;

  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const post = await prisma.post.create({
      data: {
        title,
        slug,
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
