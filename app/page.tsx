import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webvictech.com";

export const metadata: Metadata = {
  title: "O.V.A WebvicTech | #1 Web & App Development Company in Nigeria",
  description:
    "Nigeria's leading web and mobile app development company. We design and build exceptional websites, web applications, mobile apps, and enterprise solutions for businesses across Lagos, Abuja, Port Harcourt and beyond.",
  alternates: { canonical: siteUrl },
  openGraph: {
    url: siteUrl,
    title: "O.V.A WebvicTech — #1 Web & App Development Company in Nigeria",
    description:
      "Nigeria's leading web and mobile app development company. Custom websites, web apps, mobile apps, and enterprise solutions.",
    images: [
      {
        url: "/ova-logo.png",
        width: 1200,
        height: 630,
        alt: "O.V.A WebvicTech Nigeria",
      },
    ],
  },
};

export default function App() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "O.V.A WebvicTech INT' SERVICE LIMITED",
        alternateName: "WebvicTech",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/ova-logo.png`,
          width: 512,
          height: 512,
        },
        image: `${siteUrl}/ova-logo.png`,
        description:
          "Nigeria's leading web and mobile app development company. We build custom websites, web applications, mobile apps, and enterprise software for businesses across Lagos, Abuja, Port Harcourt and all of Nigeria.",
        email: "info@webvictech.com",
        telephone: "+2349136600887",
        foundingDate: "2020",
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 5,
          maxValue: 50,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Lagos Business District",
          addressLocality: "Lagos",
          addressRegion: "Lagos State",
          postalCode: "100001",
          addressCountry: "NG",
        },
        areaServed: [
          { "@type": "Country", name: "Nigeria" },
          { "@type": "City", name: "Lagos" },
          { "@type": "City", name: "Abuja" },
          { "@type": "City", name: "Port Harcourt" },
        ],
        sameAs: [
          "https://twitter.com/webvictech",
          "https://linkedin.com/company/webvictech",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web & App Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Website Design & Development",
              description: "Custom business websites built for speed and conversions",
              areaServed: "Nigeria",
              priceCurrency: "NGN",
            },
            {
              "@type": "Offer",
              name: "Web Application Development",
              description: "Scalable web apps using React, Next.js and Node.js",
              areaServed: "Nigeria",
              priceCurrency: "NGN",
            },
            {
              "@type": "Offer",
              name: "Mobile App Development",
              description: "Cross-platform mobile apps for Android and iOS",
              areaServed: "Nigeria",
              priceCurrency: "NGN",
            },
            {
              "@type": "Offer",
              name: "E-commerce Development",
              description: "Full-featured online stores for Nigerian businesses",
              areaServed: "Nigeria",
              priceCurrency: "NGN",
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "O.V.A WebvicTech",
        description: "Nigeria's leading web and mobile app development company",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "en-NG",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "O.V.A WebvicTech INT' SERVICE LIMITED",
        image: `${siteUrl}/ova-logo.png`,
        url: siteUrl,
        telephone: "+2349136600887",
        email: "info@webvictech.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Lagos Business District",
          addressLocality: "Lagos",
          addressRegion: "Lagos State",
          postalCode: "100001",
          addressCountry: "NG",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 6.5244,
          longitude: 3.3792,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        priceRange: "₦₦",
        servesCuisine: null,
        currenciesAccepted: "NGN",
        paymentAccepted: "Bank Transfer, Card",
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
