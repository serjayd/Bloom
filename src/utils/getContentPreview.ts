export const getContentPreview = (
  content: unknown[],
  wordLimit = 20,
): string => {
  const text = content
    .flatMap((block) => {
      if (
        typeof block === "object" &&
        block !== null &&
        "content" in block &&
        Array.isArray(block.content)
      ) {
        return block.content;
      }

      return [];
    })
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      if (
        typeof item === "object" &&
        item !== null &&
        "text" in item &&
        typeof item.text === "string"
      ) {
        return item.text;
      }

      return "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";

  const words = text.split(" ");

  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : text;
};
