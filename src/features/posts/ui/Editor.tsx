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

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        props: {
          level: 1,
        },
        content: "Bloom your ideas.",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Start with a thought, a question, or something you've learned. ",
          },
          {
            type: "text",
            text: "Let it grow from there.",
            styles: {
              italic: true,
            },
          },
        ],
      },

      {
        type: "heading",
        props: {
          level: 2,
        },
        content: "Write. Connect. Grow.",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Your ideas don't have to be perfect. Write them down, ",
          },
          {
            type: "link",
            href: "https://bloom.app",
            content: "connect them",
          },
          {
            type: "text",
            text: ", and let Bloom help you discover what's next.",
          },
        ],
      },

      {
        type: "bulletListItem",
        content: "Capture what you're learning",
      },
      {
        type: "bulletListItem",
        content: "Connect ideas that belong together",
      },
      {
        type: "bulletListItem",
        content: "Build your personal knowledge garden",
      },

      {
        type: "quote",
        content: "Great ideas rarely grow alone. They grow through connection.",
      },

      {
        type: "heading",
        props: {
          level: 2,
        },
        content: "A tiny example",
      },
      {
        type: "paragraph",
        content: "Even a simple idea can become something bigger:",
      },
      {
        type: "codeBlock",
        props: {
          language: "typescript",
        },
        content: 'const idea = "Learn something new";\n\nbloom(idea);',
      },

      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "💡 ",
          },
          {
            type: "text",
            text: "Tip:",
            styles: {
              bold: true,
            },
          },
          {
            type: "text",
            text: " Try writing without editing yourself. You can shape it later.",
          },
        ],
      },

      {
        type: "paragraph",
        content:
          "Now, make this space yours. Start writing something worth remembering.",
      },
    ],
  });

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
