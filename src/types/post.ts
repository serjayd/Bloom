import { PostType, Prisma } from "@/generated/prisma/client";

export type TPost = {
  id: string;
  title: string;
  slug: string;
  bannerUrl: string | null;
  content: Prisma.JsonValue;
  type: PostType;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  collectionId: string;

  author: {
    id: string;
    name: string;
    image: string | null;
  };
  collection: {
    id: string;
    slug: string;
    name: string;
  };
};
