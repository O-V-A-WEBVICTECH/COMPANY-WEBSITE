import { auth, prisma } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const teamId = searchParams.get("teamId") as string;

  const { email, name, position, githubUrl, linkedInUrl, twitterUrl, about } =
    await request.json();
  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const teamMember = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!teamMember)
      return NextResponse.json({ error: "post not found" }, { status: 404 });
    await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        email,
        name,
        position,
        githubUrl,
        linkedInUrl,
        twitterUrl,
        about,
      },
    });
    return NextResponse.json(
      {
        message: "post was updated successfully",
        teamMember,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
