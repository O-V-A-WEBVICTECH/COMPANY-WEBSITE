import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify Paystack signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY as string)
      .update(rawBody)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Handle only successful charge events
    if (event.event === "charge.success") {
      const { email, planCode } = event.data.metadata;

      if (!email || !planCode) {
        console.error("Missing metadata:", event.data.metadata);
        return NextResponse.json(
          { error: "Missing metadata" },
          { status: 400 }
        );
      }

      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        console.error("User not found for email:", email);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Get plan details
      const plan = await prisma.subscriptionPlan.findUnique({
        where: { code: planCode },
      });

      if (!plan) {
        console.error("Plan not found:", planCode);
        return NextResponse.json({ error: "Plan not found" }, { status: 404 });
      }

      // Save subscription
      await prisma.subscription.create({
        data: {
          userId: user.id,
          planId: plan.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          status: "ACTIVE",
          reference: event.data.reference,
        },
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
