import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.webvictech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "O.V.A WebvicTech | #1 Web & App Development Company in Nigeria",
    template: "%s | O.V.A WebvicTech Nigeria",
  },
  description:
    "O.V.A WebvicTech is Nigeria's leading web and mobile app development company. We build fast, secure, and scalable websites, web apps, and mobile applications for businesses across Lagos, Abuja, Port Harcourt and beyond.",
  keywords: [
    // Brand
    "O.V.A WebvicTech",
    "WebvicTech",
    "OVA WebvicTech",
    "WebvicTech Nigeria",
    // Core services
    "web development Nigeria",
    "mobile app development Nigeria",
    "software development company Nigeria",
    "custom software development Nigeria",
    "web application development Nigeria",
    "website design Nigeria",
    "website development Nigeria",
    "ecommerce website Nigeria",
    "fintech development Nigeria",
    "best web developer Nigeria",
    "affordable web development Nigeria",
    "professional website Nigeria",
    "digital agency Nigeria",
    "IT company Nigeria",
    "tech startup Nigeria",
    "Nigerian software company",
    "digital transformation Nigeria",
    // Lagos
    "web developer Lagos",
    "software company Lagos",
    "app developer Lagos",
    "website design Lagos",
    "web design Lagos",
    "tech company Lagos",
    "IT services Lagos",
    // Abuja
    "web design Abuja",
    "software developer Abuja",
    "web developer Abuja",
    "app development Abuja",
    "IT company Abuja",
    // Port Harcourt
    "web developer Port Harcourt",
    "software company Port Harcourt",
    // Tech stack
    "Next.js development",
    "React development",
    "Node.js development",
    "Flutter app development",
    "React Native development",
    // Business/service terms
    "enterprise software solutions Nigeria",
    "UI UX design Nigeria",
    "API development Nigeria",
    "ecommerce development Nigeria",
    "business website design Nigeria",
    "startup tech partner Nigeria",
    "cloud architecture Nigeria",
  ],
  authors: [{ name: "O.V.A WebvicTech", url: siteUrl }],
  creator: "O.V.A WebvicTech INT' SERVICE LIMITED",
  publisher: "O.V.A WebvicTech INT' SERVICE LIMITED",
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
    locale: "en_NG",
    url: siteUrl,
    siteName: "O.V.A WebvicTech",
    title: "O.V.A WebvicTech — #1 Web & App Development Company in Nigeria",
    description:
      "Nigeria's leading web and mobile app development company. We build fast, secure, and scalable websites, web apps, and mobile applications for businesses across Lagos, Abuja, Port Harcourt and beyond.",
    images: [
      {
        url: "/ova-logo.png",
        width: 1200,
        height: 630,
        alt: "O.V.A WebvicTech — Web & App Development Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@webvictech",
    creator: "@webvictech",
    title: "O.V.A WebvicTech — #1 Web & App Development Company in Nigeria",
    description:
      "Nigeria's leading web and mobile app development company. Fast, secure, and scalable digital solutions for businesses across Nigeria.",
    images: ["/ova-logo.png"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-NG": siteUrl,
      "en-US": siteUrl,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/ova-logo-v2.svg", type: "image/svg+xml" },
      { url: "/ova-logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/ova-logo-v2.svg",
    apple: [{ url: "/ova-logo.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/ova-logo-v2.svg" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    "geo.region": "NG",
    "geo.placename": "Nigeria",
    "DC.language": "en-NG",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "O.V.A WebvicTech",
    description:
      "Nigeria's leading web and mobile app development company. We build fast, secure, and scalable websites, web apps, and mobile applications for businesses across Lagos, Abuja, Port Harcourt and beyond.",
    url: siteUrl,
    logo: `${siteUrl}/ova-logo.png`,
    image: `${siteUrl}/ova-logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "120",
    },
    sameAs: [
      "https://twitter.com/webvictech",
      "https://linkedin.com/company/webvictech",
      "https://facebook.com/webvictech",
    ],
  };

  return (
    <html lang="en-NG">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <WhatsAppWidget />
        <Toaster richColors closeButton visibleToasts={5} expand={true} />
      </body>
    </html>
  );
}
