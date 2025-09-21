import { NextRequest, NextResponse } from "next/server";
import { prisma, auth } from "@/auth";
// import { authClient } from "@/lib/auth-client";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  if (!email || !name)
    return NextResponse.json({
      error: "please provide required fields",
    });
  try {
    // const { data: newUser, error } = await authClient.admin.createUser({
    //   password: "password",
    //   email,
    //   name,
    // });

    const data = await auth.api.signUpEmail({
      body: {
        email,
        password: "26password",
        name,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 501 }
    );
  }
}
