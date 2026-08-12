"use server";

import prisma from "@/lib/prisma";

export async function searchPosts(query: string) {
  const search = query.trim();

  if (!search) {
    return {
      success: true,
      posts: [],
    };
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        type: "PUBLISHED",
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            collection: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            author: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 8,
      select: {
        id: true,
        title: true,
        slug: true,
        bannerUrl: true,

        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },

        collection: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },

        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return {
      success: true,
      posts,
    };
  } catch (error) {
    console.error("Search failed:", error);

    return {
      success: false,
      error: "Failed to search posts",
      posts: [],
    };
  }
}
