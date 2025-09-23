import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
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

    // ✅ Extract top recommendations
    const audits = lighthouse.audits;
    const recommendations = Object.values(audits)
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
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
