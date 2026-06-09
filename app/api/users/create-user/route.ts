import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  const { email, name, position, twitterUrl, githubUrl, linkedInUrl, image } =
    await req.json();
  if (!email || !name)
    return NextResponse.json({
      error: "please provide required fields",
    });
  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const newUser = await prisma.team.create({
      data: {
        email,
        name,
        position,
        githubUrl,
        linkedInUrl,
        twitterUrl,
        image,
      },
    });

    return NextResponse.json(
      {
        message: "new user created",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 501 }
    );
  }
}
