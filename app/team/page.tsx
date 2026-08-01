import type { Metadata } from "next";
import Header from "@/components/Header";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webvictech.com";

export const metadata: Metadata = {
  title: "Our Team | O.V.A WebvicTech - Expert Software Engineers & Designers",
  description:
    "Meet the expert team behind O.V.A WebvicTech, the best software development agency. Our passionate developers, UI/UX designers, and architects build high-performance web and mobile apps.",
  alternates: { canonical: `${siteUrl}/team` },
  openGraph: {
    url: `${siteUrl}/team`,
    title: "Our Team | O.V.A WebvicTech - Expert Software Engineers",
    description:
      "Meet the software engineers, designers, and project leaders driving digital transformation at O.V.A WebvicTech.",
    images: [
      {
        url: "/ova-logo.png",
        width: 1200,
        height: 630,
        alt: "O.V.A WebvicTech Team",
      },
    ],
  },
};

export default function TeamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Our Team - O.V.A WebvicTech",
    description:
      "Meet the dedicated team of software developers and digital experts at O.V.A WebvicTech.",
    url: `${siteUrl}/team`,
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-blue-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="relative py-20 px-6 overflow-hidden border-b border-slate-800/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Meet the Engineers & Strategists Behind{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                O.V.A WebvicTech
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              A collective of full-stack developers, mobile engineers, UI/UX designers, and DevOps specialists building world-class products.
            </p>
          </div>
        </section>

        {/* Team Grid Component Container */}
        <div className="bg-white text-slate-900 pt-8">
          <Team />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
