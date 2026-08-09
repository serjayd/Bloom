import ExploreClient from "@/features/explore/ui/ExploreClient";
import prisma from "@/lib/prisma";
import Container from "@/shared/ui/Container";
import PageHeading from "@/widgets/PageHeading";

export default async function ExplorePage() {
  const posts = await prisma.post.findMany({
    where: {
      type: "PUBLISHED",
    },
    orderBy: {
      publishedAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      collection: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen py-10">
      <Container>
        <PageHeading
          title="Explore"
          description="Everything published, grouped by the topics your reading history connects to."
        />
        <ExploreClient posts={posts} />
      </Container>
    </div>
  );
}
