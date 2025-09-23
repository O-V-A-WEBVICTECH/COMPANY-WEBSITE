import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
  } catch (error) {
    console.log(error);
  }
}
