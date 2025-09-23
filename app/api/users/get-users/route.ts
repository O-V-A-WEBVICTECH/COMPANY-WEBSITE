/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/auth";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authorized" }, { status: 401 });
  try {
    const users = await prisma.team.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        githubUrl: true,
        twitterUrl: true,
        linkedInUrl: true,
        about: true,
        image: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { eror: "internal server error" },
      { status: 500 }
    );
  }
}
