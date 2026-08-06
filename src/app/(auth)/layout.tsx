import { redirect } from "next/navigation";

import Container from "@/components/shared/Container";
import { getSession } from "@/lib/session";

interface Props {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Container className="mx-auto max-w-md">{children}</Container>
    </main>
  );
}
