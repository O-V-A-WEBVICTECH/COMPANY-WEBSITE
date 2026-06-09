/* eslint-disable @typescript-eslint/no-unused-vars */ import {
  NextRequest,
  NextResponse,
} from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.team.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { eror: "internal server error" },
      { status: 500 },
    );
  }
}
