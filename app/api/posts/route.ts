/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/auth";

//handles get all posts endpoint
export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  try {
    const blogPosts = await prisma.blog.findMany();
    return NextResponse.json(blogPosts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
