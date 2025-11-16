"use client";
import { useEffect, useState } from "react";
import QuoteForm, { QuotePayload } from "@/components/quote-form";
import QuoteResult from "@/components/quote-result";
import axios from "axios";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const [pricing, setPricing] = useState(null);
  const [sent, setSent] = useState<{
    estimate_id: string;
    payload: QuotePayload;
  } | null>(null);

  async function getData() {
    try {
      const res = await axios.get("/api/pricing");
      if (res.status === 200) return setPricing(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <main className="  p-8 bg-slate-50">
        <div className="max-w-4xl mt-4  mx-auto bg-white rounded-xl shadow p-6">
          <h1 className="text-xl lg:text-2xl font-bold mb-4 text-blue-600">
            <span className="text-indigo-600">
              <span className="text-gray-700">Project Cost Estimator</span>
            </span>
          </h1>
          {!pricing ? (
            <p>Loading...</p>
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
