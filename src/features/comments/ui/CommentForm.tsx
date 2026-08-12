"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CommentFormValues, commentSchema } from "../schemas";
import { createComment } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
}

export default function CommentForm({ postId }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: CommentFormValues) => {
    const res = await createComment(data, postId);

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
      <Textarea
        {...register("content")}
        placeholder="Share your thoughts..."
        className="min-h-24 w-full resize-none shadow-sm"
        disabled={isSubmitting}
      />

      {errors.content && (
        <p className="text-sm text-destructive">{errors.content.message}</p>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Comment"}
        </Button>
      </div>
    </form>
  );
}
