import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET — public, returns active plans
export async function GET() {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
    });
    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST — admin only, create a plan
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  if (!["admin", "super_admin"].includes(session.user.role ?? ""))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { name, subtitle, price, currency, interval, isActive, isPopular, features, planCode } = body;

  if (!name || price === undefined || !planCode || !features || !interval)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  try {
    const plan = await prisma.pricingPlan.create({
      data: { name, subtitle, price: Number(price), currency: currency || "NGN", interval, isActive: isActive ?? true, isPopular: isPopular ?? false, features, planCode },
    });
    return NextResponse.json(plan, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") return NextResponse.json({ error: "Plan code already exists" }, { status: 409 });
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH — admin only, update a plan
export async function PATCH(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  if (!["admin", "super_admin"].includes(session.user.role ?? ""))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing plan id" }, { status: 400 });

  const body = await req.json();

  try {
    const plan = await prisma.pricingPlan.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.subtitle !== undefined && { subtitle: body.subtitle }),
        ...(body.price !== undefined && { price: Number(body.price) }),
        ...(body.currency !== undefined && { currency: body.currency }),
        ...(body.interval !== undefined && { interval: body.interval }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(body.isPopular !== undefined && { isPopular: body.isPopular }),
        ...(body.features !== undefined && { features: body.features }),
        ...(body.planCode !== undefined && { planCode: body.planCode }),
      },
    });
    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — admin only
export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  if (!["admin", "super_admin"].includes(session.user.role ?? ""))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing plan id" }, { status: 400 });

  try {
    await prisma.pricingPlan.delete({ where: { id } });
    return NextResponse.json({ message: "Plan deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
