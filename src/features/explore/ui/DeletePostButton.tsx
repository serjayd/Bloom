"use client";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/features/posts/actions";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  postId: string;
}

export default function DeletePostButton({ postId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deletePost(postId);

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    toast.success("Comment deleted");

    router.push("/explore");
  };
  return (
    <Button size="icon-sm" variant="destructive" onClick={handleDelete}>
      <Trash />
    </Button>
  );
}
