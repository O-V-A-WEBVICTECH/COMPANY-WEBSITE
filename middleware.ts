import { NextRequest, NextResponse } from "next/server";
import { createAuthClient } from "better-auth/client";

const client = createAuthClient();

export async function middleware(request: NextRequest) {
  const { data: session } = await client.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  });

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If there is a session, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
