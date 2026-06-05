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
      <main className="py-8 px-3 bg-slate-50">
        <div className="max-w-4xl mt-4  mx-auto bg-white rounded-xl shadow p-6">
          <h1 className="text-xl lg:text-2xl font-bold mb-4 text-blue-600">
            <span className="text-indigo-600">
              <span className="text-gray-700">Project Cost Estimator</span>
            </span>
          </h1>
          {!pricing ? (
            <div className="space-y-5 animate-pulse">
              {/* Currency bar */}
              <div className="h-12 bg-slate-100 rounded-lg w-full" />
              {/* Card blocks */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border border-slate-200 rounded-xl p-5 space-y-3"
                >
                  <div className="h-4 bg-slate-200 rounded w-1/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-10 bg-slate-100 rounded w-full" />
                  <div className="h-10 bg-slate-100 rounded w-full" />
                </div>
              ))}
              {/* Estimate bar */}
              <div className="h-20 bg-blue-100 rounded-xl w-full" />
            </div>
          ) : !sent ? (
            <QuoteForm pricing={pricing} onSent={setSent} />
          ) : (
            <QuoteResult />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
