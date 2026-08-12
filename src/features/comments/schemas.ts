import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be blank")
    .max(500, "Comment is too long"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
