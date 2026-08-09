"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import type { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

interface Props {
  content: PartialBlock[];
}

export function PostContent({ content }: Props) {
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent: content,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      editable={false}
    />
  );
}
