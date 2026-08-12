"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { toggleLike } from "../actions";

interface Props {
  postId: string;
  initialLiked: boolean;
}

export default function LikeButtonClient({ postId, initialLiked }: Props) {
  const router = useRouter();

  const handleLike = async () => {
    const res = await toggleLike(postId);

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    router.refresh();
  };

  return (
    <Button
      size="icon-lg"
      variant={initialLiked ? "default" : "secondary"}
      onClick={handleLike}
      className="rounded-xl"
    >
      <Heart className={initialLiked ? "fill-current" : ""} />
    </Button>
  );
}
