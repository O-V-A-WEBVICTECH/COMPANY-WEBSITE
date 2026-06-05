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
  title: "WebvicTech Custom Web & Mobile App Development",
  description:
    "Transform your vision into reality. We design and develop exceptional web applications, mobile apps, and enterprise solutions that elevate your brand and drive measurable results.",
  alternates: { canonical: siteUrl },
  openGraph: {
    url: siteUrl,
    title: "WebvicTech — Custom Web & Mobile App Development",
    description:
      "Transform your vision into reality. Custom web apps, mobile apps, and enterprise solutions.",
  },
};

export default function App() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WebvicTech INT' SERVICE LIMITED",
    url: siteUrl,
    logo: `${siteUrl}/ovi-logo.png`,
    description:
      "Custom web application, mobile app, and enterprise software development agency.",
    email: "info@webvictech.com",
    telephone: "+1-555-123-4567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Tech Street",
      addressLocality: "Digital City",
      addressRegion: "CA",
      postalCode: "94103",
      addressCountry: "US",
    },
    sameAs: [
      "https://twitter.com/webvictech",
      "https://linkedin.com/company/webvictech",
    ],
    offers: {
      "@type": "Offer",
      name: "Pro Plan",
      price: "5000",
      priceCurrency: "NGN",
      description: "Unlimited website performance analyses and advanced insights",
    },
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
