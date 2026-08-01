import type { Metadata } from "next";
import Header from "@/components/Header";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webvictech.com";

export const metadata: Metadata = {
  title: "About Us | O.V.A WebvicTech - Best Software Development Agency",
  description:
    "Learn about O.V.A WebvicTech, recognized as the best software development agency in Nigeria. Discover our mission, values, experience, and commitment to software engineering excellence.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    url: `${siteUrl}/about`,
    title: "About Us | O.V.A WebvicTech - Best Software Development Agency",
    description:
      "Learn about O.V.A WebvicTech, recognized as the best software development agency in Nigeria. Custom web apps, mobile apps, and enterprise software solutions.",
    images: [
      {
        url: "/ova-logo.png",
        width: 1200,
        height: 630,
        alt: "About O.V.A WebvicTech",
      },
    ],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About O.V.A WebvicTech",
    description:
      "O.V.A WebvicTech is the best software development agency delivering high-quality web applications, mobile apps, and digital solutions.",
    url: `${siteUrl}/about`,
    publisher: {
      "@type": "Organization",
      name: "O.V.A WebvicTech INT' SERVICE LIMITED",
      logo: `${siteUrl}/ova-logo.png`,
    },
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-blue-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-20">
        {/* Modern Dark Hero Banner */}
        <section className="relative py-20 px-6 overflow-hidden border-b border-slate-800/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Pioneering Digital Solutions with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Precision & Excellence
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              We build high-performance web applications, scalable cloud infrastructure, and mobile experiences that transform business capabilities.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="bg-white text-slate-900">
          <About />

          {/* Key Advantages / SEO Section */}
          <section className="py-20 bg-slate-900 text-white relative border-t border-b border-slate-800">
            <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Why Partner with the{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Best Software Development Agency
                </span>
                ?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                At O.V.A WebvicTech, we take pride in being recognized as a premier software development agency. Our engineering philosophy centers on clean architecture, high scalability, robust cybersecurity, and user-centric UI/UX design. Whether you require bespoke enterprise software, high-converting e-commerce web applications, or cross-platform mobile apps, our team brings top-tier execution to every project.
              </p>
            </div>
          </section>

          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
