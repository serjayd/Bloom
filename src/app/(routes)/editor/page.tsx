import CreatePostForm from "@/features/posts/ui/CreatePostForm";
import prisma from "@/lib/prisma";

import Container from "@/shared/ui/Container";

export default async function EditorPage() {
  const collections = await prisma.collection.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return (
    <section className="min-h-screen py-10">
      <Container>
        <div>
          <CreatePostForm collections={collections} />
        </div>
      </Container>
    </section>
  );
}
