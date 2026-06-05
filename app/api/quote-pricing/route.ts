import { NextResponse } from "next/server";
import { defaultQuotePricing } from "@/lib/quote-pricing";

export async function GET() {
  return NextResponse.json(defaultQuotePricing, { status: 200 });
}
