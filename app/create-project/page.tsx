"use client";
import { useEffect, useState } from "react";
import QuoteForm, { QuotePayload } from "@/components/quote-form";
import { defaultQuotePricing, QuotePricing } from "@/lib/quote-pricing";
import QuoteResult from "@/components/quote-result";
import axios from "axios";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.webvictech.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/create-project`,
      url: `${siteUrl}/create-project`,
      name: "Free Project Cost Estimator — Web, App & API Development",
      description:
        "Get an instant, transparent quote for your web, mobile, or backend project. No sign-up required.",
      isPartOf: { "@id": siteUrl },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Project Cost Estimator",
            item: `${siteUrl}/create-project`,
          },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/create-project#service`,
      name: "Web & App Development",
      provider: {
        "@type": "Organization",
        name: "O.V.A WebvicTech",
        url: siteUrl,
        logo: `${siteUrl}/ova-logo.png`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "NG",
          addressRegion: "Lagos",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "support@webvitech.com",
        },
      },
      serviceType: [
        "Website Development",
        "Mobile App Development",
        "E-commerce Development",
        "SaaS Development",
        "API Development",
        "Backend Development",
      ],
      areaServed: {
        "@type": "Country",
        name: "Nigeria",
      },
      description:
        "Custom web, mobile, and backend development services. Get an instant cost estimate for your project.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does a website cost in Nigeria?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Website costs in Nigeria vary by type. A landing page typically starts from ₦80,000 – ₦180,000. A business website ranges from ₦180,000 – ₦380,000. An e-commerce store starts from ₦300,000 – ₦650,000. Use our estimator for a personalised quote.",
          },
        },
        {
          "@type": "Question",
          name: "How much does it cost to build a mobile app in Nigeria?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mobile app development in Nigeria typically costs ₦300,000 – ₦550,000 per platform (Android or iOS), depending on features and complexity. Use our estimator to get a transparent, itemised quote.",
          },
        },
        {
          "@type": "Question",
          name: "How much does API or backend development cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Backend and API development costs depend on the type and features required. A REST API starts from ₦150,000 – ₦400,000, while a microservices architecture can range from ₦550,000 – ₦1,300,000. Select 'Backend / API' in our estimator for a full breakdown.",
          },
        },
        {
          "@type": "Question",
          name: "Is the estimate binding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The estimate is a transparent guide based on your selections. A final quote is provided after a consultation with our team.",
          },
        },
      ],
    },
  ],
};

export default function CreateProjectPage() {
  const [pricing, setPricing] = useState<QuotePricing | null>(null);
  const [sent, setSent] = useState<{
    estimate_id: string;
    payload: QuotePayload;
  } | null>(null);

  async function getData() {
    try {
      const res = await axios.get("/api/quote-pricing");
      if (res.status === 200) {
        const data = res.data as QuotePricing;
        if (data?.website && Array.isArray(data.website.types)) {
          setPricing(data);
        } else {
          setPricing(defaultQuotePricing);
        }
      }
    } catch (error) {
      console.log(error);
      setPricing(defaultQuotePricing);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main
        className="py-12 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative min-h-[80vh] overflow-hidden"
        aria-label="Project cost estimator"
      >
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Page header — semantically correct h1 for SEO */}
          <div className="text-center mt-14 space-y-3">
            {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              <i className="fa-solid fa-calculator text-[10px]" aria-hidden="true" />
              Free Estimator Tool
            </span> */}

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Project Cost{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Estimator
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Get an instant, transparent price estimate for your website,
              mobile app, or backend API — no sign-up required. Select your
              project type and features below.
            </p>

            {/* Trust signals */}
            {/* <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-check-circle text-green-500" aria-hidden="true" />
                No hidden fees
              </span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-check-circle text-green-500" aria-hidden="true" />
                Instant estimate
              </span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-check-circle text-green-500" aria-hidden="true" />
                Reply within 24 hours
              </span>
            </div> */}
          </div>

          {/* Form container */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/60 p-5 sm:p-8">
            {!pricing ? (
              <div className="space-y-6 animate-pulse" aria-label="Loading estimator">
                <div className="h-12 bg-slate-100 rounded-xl w-full" />
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-slate-100 rounded-xl p-5 space-y-3"
                  >
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                    <div className="h-10 bg-slate-100 rounded w-full" />
                    <div className="h-10 bg-slate-100 rounded w-full" />
                  </div>
                ))}
                <div className="h-20 bg-blue-50/50 rounded-xl w-full" />
              </div>
            ) : !sent ? (
              <QuoteForm pricing={pricing} onSent={setSent} />
            ) : (
              <QuoteResult />
            )}
          </div>

          {/* FAQ section — rendered in DOM for SEO, matches JSON-LD above */}
          <section aria-labelledby="faq-heading" className="pt-4 pb-8">
            <h2
              id="faq-heading"
              className="text-xl font-bold text-slate-800 mb-4 text-center"
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                {
                  q: "How much does a website cost in Nigeria?",
                  a: "Website costs vary by type. A landing page starts from ₦80,000 – ₦180,000, a business site from ₦180,000 – ₦380,000, and an e-commerce store from ₦300,000 – ₦650,000. Use the estimator above for a personalised breakdown.",
                },
                {
                  q: "How much does it cost to build a mobile app in Nigeria?",
                  a: "Mobile app development typically costs ₦300,000 – ₦550,000 per platform (Android or iOS), depending on features and complexity.",
                },
                {
                  q: "How much does API or backend development cost?",
                  a: "A REST API starts from ₦150,000 – ₦400,000. A microservices architecture can range from ₦550,000 – ₦1,300,000. Select 'Backend / API' in the estimator for a full breakdown.",
                },
                {
                  q: "Is the estimate binding?",
                  a: "The estimate is a transparent guide based on your selections. A final quote is provided after a short consultation with our team.",
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="rounded-2xl border border-slate-200 bg-white p-4 group"
                >
                  <summary className="cursor-pointer font-semibold text-slate-800 text-sm list-none flex items-center justify-between gap-2">
                    {q}
                    <i className="fa-solid fa-chevron-down text-slate-400 text-xs transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
