import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/auth";

export async function POST(req: NextRequest) {
  const { email, name, position, twitterUrl, githubUrl, linkedInUrl } =
    await req.json();
  if (!email || !name)
    return NextResponse.json({
      error: "please provide required fields",
    });
  try {
    const newUser = await prisma.team.create({
      data: {
        email,
        name,
        position,
        githubUrl,
        linkedInUrl,
        twitterUrl,
      },
    });

    return NextResponse.json(
      {
        message: "new user created",
        user: newUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 501 }
    );
  }
}
