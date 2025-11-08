import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth, prisma } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });

  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId") as string;
  if (!userId)
    return NextResponse.json(
      { error: "please provide required query userId" },
      { status: 400 }
    );
  try {
    const userAccount = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        id: true,
        image: true,
        email: true,
        subscriptions: {
          select: {
            id: true,
            planAmount: true,
            planType: true,
            startDate: true,
            nextPaymentDate: true,
          },
        },
        reports: true,
      },
    });
    if (!userAccount)
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 404 }
      );

    return NextResponse.json(userAccount, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
