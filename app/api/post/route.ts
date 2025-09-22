import { auth, prisma } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//this endpoint handles creating new blogpost
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  const { title, content, img } = await request.json();
  if (!title || !content || !img)
    return NextResponse.json(
      { error: "please provide required fields" },
      { status: 404 }
    );

  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const newPost = await prisma.blog.create({
      data: {
        title,
        content,
        img,
        authorId: session?.user.id,
      },
    });
    return NextResponse.json(
      {
        message: "new blog post was successfully added",
        blog: newPost,
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

//handles deletion of blog posts
export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId") as string;

  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const post = await prisma.blog.findUnique({
      where: { id: postId },
    });
    if (!post)
      return NextResponse.json(
        { error: "post does not exist" },
        { status: 404 }
      );
    await prisma.blog.delete({
      where: {
        id: postId,
      },
    });
    return NextResponse.json(
      { message: "post was successfully deleted" },
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

//handles endpoint to get a particular post
export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId") as string;

  try {
    if (session?.user.role !== "admin")
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    const blogpost = await prisma.blog.findUnique({
      where: {
        id: postId,
      },
    });
    return NextResponse.json(blogpost, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
