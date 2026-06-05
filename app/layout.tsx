import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webvictech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WebvicTech — Custom Web & Mobile App Development",
    template: "%s | WebvicTech",
  },
  description:
    "WebvicTech INT' SERVICE LIMITED builds custom web applications, mobile apps, and enterprise software. Fast, secure, and scalable digital solutions for businesses of all sizes.",
  keywords: [
    // Core services
    "web development",
    "mobile app development",
    "software development company",
    "custom software development",
    "web application development",
    // Tech stack
    "Next.js development",
    "React development",
    "Node.js development",
    "Flutter app development",
    "React Native development",
    // Nigeria-specific
    "web developer in Nigeria",
    "software company in Nigeria",
    "web development company Nigeria",
    "app development Nigeria",
    "software developer Nigeria",
    "tech company Nigeria",
    "website design Nigeria",
    "web developer Lagos",
    "software company Lagos",
    "app developer Lagos",
    "web design Abuja",
    "software developer Abuja",
    "IT company Nigeria",
    "digital agency Nigeria",
    "tech startup Nigeria",
    "Nigerian software company",
    "website development Nigeria",
    "ecommerce website Nigeria",
    "fintech development Nigeria",
    "best web developer Nigeria",
    // Business/service terms
    "enterprise software solutions",
    "cloud architecture",
    "UI UX design",
    "API development",
    "ecommerce development",
    "business website design",
    "startup tech partner",
    "digital transformation Nigeria",
    "affordable web development Nigeria",
    "professional website Nigeria",
    // Brand
    "WebvicTech",
  ],
  authors: [{ name: "WebvicTech", url: siteUrl }],
  creator: "WebvicTech INT' SERVICE LIMITED",
  publisher: "WebvicTech INT' SERVICE LIMITED",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "WebvicTech",
    title: "WebvicTech — Custom Web & Mobile App Development",
    description:
      "We build custom web applications, mobile apps, and enterprise software that help businesses grow in the digital age.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebvicTech — Custom Web & Mobile App Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@webvictech",
    creator: "@webvictech",
    title: "WebvicTech — Custom Web & Mobile App Development",
    description:
      "We build custom web applications, mobile apps, and enterprise software that help businesses grow.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors closeButton visibleToasts={5} expand={true} />
      </body>
    </html>
  );
}
