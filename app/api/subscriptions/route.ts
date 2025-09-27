// app/api/subscription/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planCode, email } = body;

    if (!planCode || !email) {
      return NextResponse.json(
        { error: "Missing planCode or email" },
        { status: 400 }
      );
    }
    console.log(planCode);

    // 1. Look up plan in DB
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { code: planCode },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    if (!plan.amount) {
      throw new Error("Plan amount is not set for this subscription plan");
    }

    // 2. Initialize Paystack transaction
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: plan.amount * 100,
        plan: plan.paystackPlanCode,
        metadata: {
          planCode: plan.code,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      authorizationUrl: response.data.data.authorization_url,
      accessCode: response.data.data.access_code,
      reference: response.data.data.reference,
    });
  } catch (error) {
    console.error("Paystack init error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
