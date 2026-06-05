import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webvictech.com";

export const metadata: Metadata = {
  title: "Pricing — Simple, Transparent Plans",
  description:
    "Get started free and upgrade when you need more. Our Pro plan gives you unlimited website performance analyses, priority support, and advanced insights for ₦5,000/month.",
  alternates: { canonical: `${siteUrl}/pricing` },
  openGraph: {
    url: `${siteUrl}/pricing`,
    title: "Pricing | WebvicTech",
    description:
      "Unlimited website analyses and advanced performance insights. Upgrade to Pro for ₦5,000/month.",
  },
};
