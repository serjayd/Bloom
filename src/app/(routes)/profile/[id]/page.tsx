import { getSession } from "@/lib/session";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;

  const session = await getSession();

  if (!session) return null;

  const isOwner = session.user.id === id;

  return (
    <div>
      <h1>{isOwner ? "OWNER" : "FOLLOW USER"}</h1>
    </div>
  );
}
