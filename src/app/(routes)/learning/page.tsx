import CollectionPosts from "@/features/learning-tree/ui/CollectionPosts";
import LearningTree from "@/features/learning-tree/ui/LearningTree";
import prisma from "@/lib/prisma";
import Container from "@/shared/ui/Container";
import PageHeading from "@/widgets/PageHeading";

interface Props {
  searchParams: Promise<{
    collection?: string;
  }>;
}

export default async function LearningPage({ searchParams }: Props) {
  const { collection: collectionSlug } = await searchParams;

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

  const selectedCollection = collectionSlug
    ? await prisma.collection.findUnique({
        where: {
          slug: collectionSlug,
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      })
    : null;

  const topPosts = selectedCollection
    ? await prisma.post.findMany({
        where: {
          collectionId: selectedCollection.id,
          type: "PUBLISHED",
        },
        orderBy: {
          likes: {
            _count: "desc",
          },
        },
        take: 5,
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
          _count: {
            select: {
              likes: true,
            },
          },
        },
      })
    : [];

  return (
    <main className="min-h-screen py-10">
      <Container>
        <PageHeading
          title="Learning Tree"
          description="Explore the knowledge inside Bloom. Select a collection to discover its most popular articles."
        />

        <div
          className={
            selectedCollection
              ? "mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
              : "mt-10"
          }
        >
          {/* Tree */}
          <div className="min-w-0">
            <LearningTree collections={collections} />
          </div>

          {/* Selected collection */}
          {selectedCollection && (
            <aside className="min-w-0">
              <CollectionPosts
                collection={selectedCollection}
                posts={topPosts}
              />
            </aside>
          )}
        </div>
      </Container>
    </main>
  );
}
