import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webvictech.com";

export const metadata: Metadata = {
  title: "Project Cost Estimator  Get Your Software Development Quote",
  description:
    "Instantly estimate your web development project costs. Transparent pricing for websites, e-commerce stores, web apps, and mobile applications.",
  alternates: { canonical: `${siteUrl}/create-project` },
  openGraph: {
    url: `${siteUrl}/create-project`,
    title: "Project Cost Estimator | WebvicTech",
    description:
      "Instantly estimate your web development project costs. Transparent pricing for websites, e-commerce stores, web apps, and mobile applications.",
  },
};
