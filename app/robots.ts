import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.webvictech.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/pricing",
          "/create-project",
          "/ova-logo-v2.svg",
          "/ova-logo.png",
          "/favicon.svg",
          "/site.webmanifest",
        ],
        disallow: [
          "/dashboard",
          "/admin-dashboard",
          "/admin",
          "/api/",
          "/login",
          "/register",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
