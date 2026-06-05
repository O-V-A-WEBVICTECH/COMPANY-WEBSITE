import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webvictech.com";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse our full portfolio of web applications, mobile apps, and enterprise software projects. See what WebvicTech has built for clients across industries.",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    url: `${siteUrl}/projects`,
    title: "Projects | WebvicTech",
    description:
      "Our full portfolio — web apps, mobile apps, and enterprise solutions built for clients across industries.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
