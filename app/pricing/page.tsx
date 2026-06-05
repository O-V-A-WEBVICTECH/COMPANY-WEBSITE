"use client";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface PricingPlan {
  id: string;
  name: string;
  subtitle?: string;
  price: number;       // in kobo
  currency: string;
  interval: string;
  isActive: boolean;
  isPopular: boolean;
  features: Feature[];
  planCode: string;
}

function formatPrice(kobo: number, currency: string) {
  const amount = kobo / 100;
  if (currency === "NGN") return `₦${amount.toLocaleString()}`;
  return `${currency} ${amount.toLocaleString()}`;
}

export default function PricingPage() {
  const [plans, setPlans]       = useState<PricingPlan[]>([]);
  const [loading, setLoading]   = useState(true);
  const [subLoading, setSubLoading] = useState<string | null>(null); // planCode being subscribed

  useEffect(() => {
    axios.get<PricingPlan[]>("/api/pricing")
      .then((r) => setPlans(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSubscribe(planCode: string) {
    setSubLoading(planCode);
    try {
      const { data: session } = await authClient.getSession();
      if (!session) return (window.location.href = "/login");
      const res = await axios.post("/api/subscriptions", {
        email: session.user?.email,
        planCode,
      });
      if (res.status === 200) window.open(res.data.authorizationUrl, "_blank");
    } catch (error) {
      console.error(error);
    } finally {
      setSubLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50 py-16 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center text-xs text-blue-600 hover:underline mb-6 font-medium">
            ← Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Everything you need to grow your digital presence. Start free, upgrade when you&apos;re ready.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className={`grid gap-6 ${`max-w-md mx-auto`} animate-pulse`}>
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
                <div className="h-10 bg-slate-100" />
                <div className="p-7 space-y-4">
                  <div className="h-5 bg-slate-200 rounded w-1/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-10 bg-slate-200 rounded w-1/2" />
                  <div className="h-11 bg-slate-200 rounded-xl w-full" />
                  {[1,2,3,4].map((j) => (
                    <div key={j} className="flex gap-3">
                      <div className="w-6 h-6 bg-slate-100 rounded" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3.5 bg-slate-200 rounded w-1/3" />
                        <div className="h-3 bg-slate-100 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Plans */}
        {!loading && plans.length === 0 && (
          <div className="text-center py-20 text-slate-400 text-sm">No pricing plans available yet.</div>
        )}

        {!loading && plans.length > 0 && (
          <div className={`grid gap-6 ${plans.length === 1 ? "max-w-md mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl border-2 overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow ${
                  plan.isPopular ? "border-blue-500 relative" : "border-slate-200"
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-xs font-bold tracking-wider uppercase">
                    🌟 Most Popular
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Name & subtitle */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900">{plan.name}</h2>
                    {plan.subtitle && (
                      <p className="text-sm text-slate-500 mt-1">{plan.subtitle}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-7">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-slate-900">
                        {formatPrice(plan.price, plan.currency)}
                      </span>
                      <span className="text-slate-500 text-sm mb-1">/{plan.interval}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Billed monthly</p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleSubscribe(plan.planCode)}
                    disabled={subLoading === plan.planCode}
                    className={`w-full py-3 px-5 rounded-xl text-sm font-bold transition-all mb-7 flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    } disabled:opacity-60`}
                  >
                    {subLoading === plan.planCode ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                    ) : (
                      "Get Started Now"
                    )}
                  </button>

                  {/* Features */}
                  <div className="space-y-3 flex-1">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-lg shrink-0 leading-none mt-0.5">{f.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{f.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Guarantee */}
                  <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    30-day money-back guarantee
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trust */}
        <div className="mt-10 text-center">
          <div className="flex justify-center gap-6 text-xs text-slate-400 flex-wrap">
            <span>🔒 Secure Payment</span>
            <span>✖ Cancel Anytime</span>
            <span>📧 Email Support</span>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "Can I cancel anytime?", a: "Yes. Cancel any time — no questions asked, no hidden fees." },
              { q: "What payment methods do you accept?", a: "We accept Visa, MasterCard, Verve, and bank transfers via Paystack." },
              { q: "Is there a free tier?", a: "Yes — you get one free analysis. Upgrade to Pro for unlimited access." },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{faq.q}</h3>
                <p className="text-sm text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
