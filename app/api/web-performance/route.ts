import { NextRequest, NextResponse } from "next/server";
import { auth, prisma } from "@/auth";
import axios from "axios";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscriptions: { where: { status: "active" } },
      reports: true,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (user.banned)
    return NextResponse.json({ error: "User banned" }, { status: 403 });

  const activeSub = user.subscriptions[0];
  const isFreeTier = !activeSub || activeSub.planType === "free";

  // Free tier: Check report count
  if (isFreeTier && user.role !== "admin") {
    const reportCount = user.reports.length;
    if (reportCount >= 1) {
      return NextResponse.json(
        { error: "Free tier limited to one report. Upgrade for more." },
        { status: 403 }
      );
    }
  }

  const API_KEY = process.env.GOOGLE_PAGE_SPEED_KEY;
  const searchParams = request.nextUrl.searchParams;
  const websiteUrl = searchParams.get("websiteUrl");

  if (!websiteUrl) {
    return NextResponse.json(
      { error: "websiteUrl is required" },
      { status: 400 }
    );
  }

  try {
    const res = await axios.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        websiteUrl
      )}&key=${API_KEY}&strategy=mobile`
    );

    const lighthouse = res.data.lighthouseResult;
    const performance = Math.round(
      lighthouse.categories.performance.score * 100
    );

    const metrics = {
      fcp: lighthouse.audits["first-contentful-paint"].displayValue,
      lcp: lighthouse.audits["largest-contentful-paint"].displayValue,
      tbt: lighthouse.audits["total-blocking-time"].displayValue,
      cls: lighthouse.audits["cumulative-layout-shift"].displayValue,
      si: lighthouse.audits["speed-index"].displayValue,
    };

    const recommendations = Object.values(lighthouse.audits)
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (audit: any) =>
          audit.score !== 1 && audit.details?.type === "opportunity"
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((audit: any) => ({
        title: audit.title,
        description: audit.description,
        savings: audit.displayValue || "",
      }));

    // Store report
    await prisma.report.create({
      data: {
        userId: user.id,
        url: websiteUrl,
        performance,
        metrics,
        recommendations,
      },
    });

    return NextResponse.json(
      {
        url: websiteUrl,
        performance,
        metrics,
        recommendations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
