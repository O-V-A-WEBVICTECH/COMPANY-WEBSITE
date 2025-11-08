"use client";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const monthlyPrice = 5000;

  async function handleSubscribe() {
    setLoading(true);
    try {
      const { data: session } = await authClient.getSession();
      const res = await axios.post("/api/subscriptions", {
        email: session?.user?.email,
        planCode: "pro",
      });
      return window.open(res.data.authorizationUrl, "_blank");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const features = [
    {
      icon: "🚀",
      title: "Unlimited Reports",
      description: "Analyze as many websites as you need, whenever you need",
    },
    {
      icon: "⚡",
      title: "Priority Processing",
      description:
        "Get your analysis results faster with priority queue access",
    },
    {
      icon: "📊",
      title: "Advanced Insights",
      description:
        "Access detailed metrics, historical data, and trend analysis",
    },
    {
      icon: "🎯",
      title: "Custom Recommendations",
      description:
        "Receive tailored optimization strategies for your specific use case",
    },
    {
      icon: "📈",
      title: "Performance Tracking",
      description:
        "Monitor improvements over time with comprehensive dashboards",
    },
    {
      icon: "🔔",
      title: "Alerts & Monitoring",
      description: "Get notified when performance drops below your thresholds",
    },
    {
      icon: "🛠️",
      title: "API Access",
      description: "Integrate our analysis tools into your own workflows",
    },
    {
      icon: "💬",
      title: "Priority Support",
      description: "Get help when you need it with our dedicated support team",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600">
            Everything you need to optimize your website performance
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200">
            {/* Badge */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 font-semibold">
              🌟 MOST POPULAR
            </div>

            <div className="p-8">
              {/* Plan Name */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Pro Plan
                </h2>
                <p className="text-slate-600">
                  For professionals and growing teams
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-end justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-slate-900">
                    ₦{monthlyPrice}
                  </span>
                  <span className="text-2xl text-slate-600 mb-2">/month</span>
                </div>
                <p className="text-sm text-slate-500">Billed monthly</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-full hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 mb-8"
              >
                {loading ? "Processing..." : "Get Started Now"}
              </button>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 text-lg mb-4">
                  Everything included:
                </h3>
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">
                      {feature.icon}
                    </span>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantee */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 mb-4">
              Trusted by 10,000+ professionals
            </p>
            <div className="flex justify-center gap-4 items-center opacity-60">
              <span className="text-xs text-slate-500">🔒 Secure Payment</span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-500">❌ Cancel Anytime</span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-500">📧 Email Support</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-slate-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-slate-600">
                Yes, you can cancel your subscription at any time. No questions
                asked, no hidden fees.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-slate-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-slate-600">
                We accept all major credit cards (Visa, MasterCard, American
                Express) and PayPal.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-slate-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-slate-600">
                You get one free analysis to try our service. After that,
                upgrade to Pro for unlimited access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
