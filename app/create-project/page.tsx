"use client";
import { useEffect, useState } from "react";
import QuoteForm, { QuotePayload } from "@/components/quote-form";
import { defaultQuotePricing, QuotePricing } from "@/lib/quote-pricing";
import QuoteResult from "@/components/quote-result";
import axios from "axios";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
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
      <Header />
      <main className="py-12 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative min-h-[80vh] overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Redesigned Header Block */}
          <div className="text-center mt-8  md:mt-10 space-y-3">
            {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              <i className="fa-solid fa-calculator text-[10px]" /> Estimator
              Tool
            </span> */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Project Cost{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Estimator
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Plan your budget with ease. Select your desired platform and core
              features below to receive an instant, transparent price estimate.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/60 p-5 sm:p-8">
            {!pricing ? (
              <div className="space-y-6 animate-pulse">
                {/* Currency bar placeholder */}
                <div className="h-12 bg-slate-100 rounded-xl w-full" />
                {/* Card blocks placeholders */}
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-slate-105 rounded-xl p-5 space-y-3"
                  >
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                    <div className="h-10 bg-slate-100 rounded w-full" />
                    <div className="h-10 bg-slate-100 rounded w-full" />
                  </div>
                ))}
                {/* Estimate bar placeholder */}
                <div className="h-20 bg-blue-50/50 rounded-xl w-full" />
              </div>
            ) : !sent ? (
              <QuoteForm pricing={pricing} onSent={setSent} />
            ) : (
              <QuoteResult />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
