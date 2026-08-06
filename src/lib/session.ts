import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// Soft Check
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session ?? null;
}

// Strict Check
export async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
