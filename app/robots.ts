import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webvictech.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/create-project", "/icon", "/apple-icon", "/favicon.svg", "/site.webmanifest"],
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
