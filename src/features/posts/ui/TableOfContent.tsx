"use client";

import { Button } from "@/components/ui/button";
import type { PartialBlock } from "@blocknote/core";

interface Props {
  content: PartialBlock[];
}

function getHeadingText(block: PartialBlock): string {
  if (typeof block.content === "string") {
    return block.content;
  }

  if (!Array.isArray(block.content)) {
    return "";
  }

  return block.content
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      if ("text" in item) {
        return item.text;
      }

      return "";
    })
    .join("");
}

export function TableOfContent({ content }: Props) {
  const headings = content.filter((block) => block.type === "heading");

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="border border-border p-4 rounded-xl w-full hidden lg:block">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
        On this page
      </h2>

      <nav className="flex flex-col items-start">
        {headings.map((heading) => {
          if (!heading.id) {
            return null;
          }

          return (
            <Button
              variant="link"
              key={heading.id}
              type="button"
              onClick={() => {
                document.getElementById(heading.id!)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {getHeadingText(heading)}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
