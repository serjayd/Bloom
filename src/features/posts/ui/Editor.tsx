"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";

interface Props {
  onChange?: (content: unknown[]) => void;
}

export default function Editor({ onChange }: Props) {
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote();

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={() => {
        onChange?.(editor.document);
      }}
    />
  );
}
