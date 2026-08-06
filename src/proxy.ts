import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function proxy(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};
