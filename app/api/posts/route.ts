/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/auth";

//handles get all posts endpoint
export async function GET(request: NextRequest) {
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
