import { auth, prisma } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//handles adding project
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  const { name, description, stack, image, link, repoUrl } =
    await request.json();

  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const project = await prisma.project.create({
      data: {
        name,
        description,
        stack,
        image,
        link,
        repoUrl,
      },
    });
    return NextResponse.json(
      {
        message: "new project post was successfully added",
        project,
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

//handles deletion of projects
export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  const searchParams = request.nextUrl.searchParams;
  const projectId = searchParams.get("projectId") as string;

  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project)
      return NextResponse.json(
        { error: "project does not exist" },
        { status: 404 }
      );
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    return NextResponse.json(
      { message: "project was successfully updated", project },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

//handles endpoint responsible for updating projects
export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  const searchParams = request.nextUrl.searchParams;
  const projectId = searchParams.get("projectId") as string;

  const { name, description, stack, image, link, repoUrl } =
    await request.json();

  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project)
      return NextResponse.json(
        { error: "project does not exist" },
        { status: 404 }
      );
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        description,
        link,
        repoUrl,
        image,
        stack,
      },
    });
    return NextResponse.json(
      { message: "project was successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

//handles endpoint to get all projects
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
