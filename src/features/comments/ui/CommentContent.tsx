"use client";

import { useState } from "react";
import { Pencil, Trash, X, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { deleteComment, updateComment } from "../actions";
import { TComment } from "@/types/comment";

interface Props {
  comment: TComment;
  isOwner: boolean;
}

export default function CommentContent({ comment, isOwner }: Props) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!content.trim()) {
      toast.error("Comment cannot be blank");
      return;
    }

    if (content.length > 500) {
      toast.error("Comment is too long");
      return;
    }

    setLoading(true);

    try {
      const res = await updateComment(comment.id, content);

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      setEditing(false);

      toast.success("Comment updated");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await deleteComment(comment.id);

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success("Comment deleted");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (editing) {
    return (
      <div className="mt-2 space-y-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-24 resize-none"
          disabled={loading}
          autoFocus
        />

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setContent(comment.content);
              setEditing(false);
            }}
            disabled={loading}
          >
            <X />
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleUpdate}
            disabled={loading}
          >
            <Check />
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-1">
      <div className="flex items-start justify-between gap-4">
        <p className="min-w-0 flex-1 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-muted-foreground">
          {content}
        </p>

        {isOwner && (
          <div className="flex shrink-0 items-center gap-1">
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => setEditing(true)}
              disabled={loading}
            >
              <Pencil />
              <span className="sr-only">Edit comment</span>
            </Button>

            <Button
              size="icon-sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash />
              <span className="sr-only">Delete comment</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
