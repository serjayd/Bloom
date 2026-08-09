"use client";

import dynamic from "next/dynamic";

export const PostContent = dynamic(
  () => import("./PostContent").then((mod) => mod.PostContent),
  {
    ssr: false,
  },
);
