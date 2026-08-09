import type { PartialBlock } from "@blocknote/core";

export function getReadingTime(content: PartialBlock[]) {
  const text = content.map((block) => getBlockText(block)).join(" ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));

  return minutes;
}

function getBlockText(block: PartialBlock): string {
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

      if ("content" in item && typeof item.content === "string") {
        return item.content;
      }

      return "";
    })
    .join(" ");
}
