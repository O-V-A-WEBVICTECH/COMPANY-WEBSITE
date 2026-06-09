import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.webvictech.com";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your WebvicTech account to access your dashboard and performance reports.",
  alternates: { canonical: `${siteUrl}/login` },
  robots: { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
