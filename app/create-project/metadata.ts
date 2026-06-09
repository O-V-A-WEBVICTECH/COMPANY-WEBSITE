import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.webvictech.com";

const title =
  "Free Project Cost Estimator — Web, App & API Development | O.V.A WebvicTech";
const description =
  "Get an instant, transparent quote for your web, mobile, or backend project. Estimate costs for landing pages, e-commerce stores, SaaS platforms, REST APIs, and more. No sign-up required.";
const url = `${siteUrl}/create-project`;
const image = "/ova-logo.png";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    // Tool-specific
    "project cost estimator Nigeria",
    "web development cost calculator Nigeria",
    "website price estimate Nigeria",
    "how much does a website cost Nigeria",
    "software development quote Nigeria",
    "mobile app cost estimate Nigeria",
    "API development cost Nigeria",
    "backend development price Nigeria",
    "e-commerce website cost Nigeria",
    "SaaS development cost Nigeria",
    // Service + brand
    "WebvicTech project estimator",
    "O.V.A WebvicTech quote",
    "affordable web development quote",
    "instant website quote Nigeria",
    "transparent web development pricing",
    "web development pricing Lagos",
    "website development cost Lagos",
    "app development quote Abuja",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: "O.V.A WebvicTech",
    title,
    description,
    locale: "en_NG",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "O.V.A WebvicTech — Free Project Cost Estimator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@webvictech",
    creator: "@webvictech",
    title,
    description,
    images: [image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};
