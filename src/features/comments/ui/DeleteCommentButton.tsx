"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteComment } from "../actions";

interface Props {
  commentId: string;
}

export default function DeleteCommentButton({ commentId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteComment(commentId);

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    toast.success("Comment deleted");

    router.refresh();
  };

  return (
    <Button size="icon-sm" variant="destructive" onClick={handleDelete}>
      <Trash />
    </Button>
  );
}
