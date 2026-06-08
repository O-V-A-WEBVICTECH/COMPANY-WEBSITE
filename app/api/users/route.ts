import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//handles updating team profile
export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const teamId = searchParams.get("teamId") as string;

  const {
    email,
    name,
    position,
    githubUrl,
    linkedInUrl,
    twitterUrl,
    about,
    image,
    stack,
  } = await request.json();
  try {
    if (session?.user.role !== "admin" && session?.user.role !== "super_admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const teamMember = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!teamMember)
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        email,
        name,
        position,
        githubUrl,
        image,
        linkedInUrl,
        twitterUrl,
        about,
        stack,
      },
    });
    return NextResponse.json(
      {
        message: "data updated successfully",
        teamMember,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 501 },
    );
  }
}

//handles deleting team member

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const teamId = searchParams.get("teamId") as string;

  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const teamMember = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!teamMember)
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    await prisma.team.delete({
      where: {
        id: teamId,
      },
    });
    return NextResponse.json(
      {
        message: "user was removed successfully",
        teamMember,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 501 },
    );
  }
}
