"use client";

import "@xyflow/react/dist/style.css";

import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface Collection {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  collections: Collection[];
}

export default function LearningTree({ collections }: Props) {
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const centerX = 600;
  const centerY = 450;
  const radius = Math.max(500, collections.length * 30);

  const nodes: Node[] = [
    {
      id: "bloom",
      position: {
        x: centerX,
        y: centerY,
      },
      data: {
        label: "Bloom",
      },
      className:
        "rounded-full border border-accent/30 bg-background px-10 py-8 text-xl font-semibold shadow-lg",
    },

    ...collections.map((collection, index) => {
      const angle = (index / collections.length) * Math.PI * 2 - Math.PI / 2;

      return {
        id: collection.id,
        position: {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
        },
        data: {
          label: collection.name,
          collectionId: collection.id,
          slug: collection.slug,
        },
        className:
          "cursor-pointer rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium shadow-sm transition hover:border-accent hover:shadow-md",
      };
    }),
  ];

  const edges: Edge[] = collections.map((collection) => ({
    id: `bloom-${collection.id}`,
    source: "bloom",
    target: collection.id,
    type: "smoothstep",
  }));

  const handleNodeClick: NodeMouseHandler = (_, node) => {
    if (node.id === "bloom") {
      router.push("/learning");
      return;
    }

    const collection = collections.find(
      (collection) => collection.id === node.id,
    );

    if (!collection) return;

    router.push(`/learning?collection=${collection.slug}`);
  };

  return (
    <div className="h-225 w-full overflow-hidden rounded-2xl border border-border bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        colorMode={resolvedTheme === "dark" ? "dark" : "light"}
        fitView
        fitViewOptions={{
          padding: 0.15,
        }}
        onNodeClick={handleNodeClick}
      >
        <Background gap={24} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
