import type { Metadata } from "next";
import CreateProjectClient from "./create-project-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webvictech.com";
const pageUrl = `${siteUrl}/create-project`;

export const metadata: Metadata = {
  title: "Get a Project Quote — Web & Mobile App Development | O.V.A WebvicTech",
  description:
    "Request an instant cost estimate for your website, mobile app, or backend API from O.V.A WebvicTech, the best software development agency. Fast turnaround, transparent pricing in Naira & USD. Reply within 24 hours.",
  keywords: [
    "get a website quote Nigeria",
    "best software development agency",
    "web development quote Nigeria",
    "mobile app development quote Nigeria",
    "Flutter app developer Nigeria",
    "Next.js development quote Nigeria",
    "software agency Nigeria quote",
    "project cost estimate Nigeria",
    "software development cost Nigeria",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    url: pageUrl,
    title: "Get a Project Quote — O.V.A WebvicTech",
    description:
      "Request an instant cost estimate for your website, mobile app, or API. Transparent Naira & USD pricing. Reply within 24 hours.",
    images: [
      {
        url: "/ova-logo.png",
        width: 1200,
        height: 630,
        alt: "Get a project quote — O.V.A WebvicTech",
      },
    ],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Web & Mobile Development",
  description:
    "Custom web applications, mobile apps (React Native, Flutter), REST APIs, and backend systems built by O.V.A WebvicTech.",
  url: pageUrl,
  provider: {
    "@type": "Organization",
    name: "O.V.A WebvicTech INT' SERVICE LIMITED",
    url: siteUrl,
    logo: `${siteUrl}/ova-logo.png`,
  },
  areaServed: [
    { "@type": "Country", name: "Nigeria" },
  ],
  serviceType: [
    "Web Development",
    "Mobile App Development",
    "API Development",
    "Full-Stack Development",
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Get a Quote",
      item: pageUrl,
    },
  ],
};

export default function CreateProjectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CreateProjectClient />
    </>
  );
}
