import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),

  collectionId: z.string().min(1, "Please select a collection"),

  content: z.array(z.unknown()).min(1, "Post content is required"),
  bannerUrl: z.string().url().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;
