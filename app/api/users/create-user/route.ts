import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
// import { authClient } from "@/lib/auth-client";

export async function POST(req: NextRequest) {
  const { email, name, position, twitterUrl, githubUrl, linkedInUrl } =
    await req.json();
  if (!email || !name)
    return NextResponse.json({
      error: "please provide required fields",
    });
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password: "26password",
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
        user,
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
