import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webvictech.com";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your free WebvicTech account and start analyzing your website performance today.",
  alternates: { canonical: `${siteUrl}/register` },
  robots: { index: false, follow: false },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
