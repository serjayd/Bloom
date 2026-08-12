"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  slug: string;
}

export default function ShareButton({ slug }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/explore/${slug}`;

      await navigator.clipboard.writeText(url);

      setCopied(true);

      toast.success("Link copied", {
        description: "The article link has been copied to your clipboard.",
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  return (
    <Button
      size="icon-lg"
      variant="secondary"
      className="rounded-xl"
      onClick={handleShare}
    >
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
    </Button>
  );
}
