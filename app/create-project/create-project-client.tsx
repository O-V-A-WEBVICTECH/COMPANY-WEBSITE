"use client";
import { useState, useMemo, useEffect, FormEvent } from "react";
import {
  ArrowLeft,
  Mail,
  Loader2,
  Send,
  CheckCircle2,
  Globe,
  Server,
  Smartphone,
  Code2,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import {
  defaultQuotePricing as quotePricing,
  WEBSITE_TYPE_PRESETS,
  BACKEND_TYPE_PRESETS,
} from "@/lib/quote-pricing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ServiceCategory = "website" | "backend";

type FormData = {
  name: string;
  email: string;
  phone: string;
  serviceCategory: ServiceCategory;
  type: string;
  platforms: string[];
  features: string[];
  domain: boolean;
  hosting: boolean;
  deployment: boolean;
  ciCd: boolean;
  budget: string;
  description: string;
  timeline: string;
};

const inputClass =
  "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-sm";

const labelClass =
  "block text-xs font-semibold tracking-wider text-slate-700 uppercase mb-2";

const FALLBACK_RATE = 1600; // NGN per 1 USD

function fmt(n: number, currency: "NGN" | "USD", rate: number) {
  if (currency === "USD") {
    const usd = n / rate;
    return (
      "$" +
      usd.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  }
  return "\u20a6" + n.toLocaleString();
}

const firstWebsiteType = quotePricing.website.types[0].value;
const firstBackendType = quotePricing.backend.types[0].value;

export default function CreateProjectClient() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    serviceCategory: "website",
    type: firstWebsiteType,
    platforms: [],
    features: WEBSITE_TYPE_PRESETS[firstWebsiteType] ?? [],
    domain: false,
    hosting: false,
    deployment: false,
    ciCd: false,
    budget: "",
    description: "",
    timeline: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [exchangeRate, setExchangeRate] = useState(FALLBACK_RATE);
  const [rateLoading, setRateLoading] = useState(true);

  // Auto-detect locale via IP geolocation and fetch live rate
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const tzIsNigerian =
      tz.startsWith("Africa/Lagos") || tz.startsWith("Africa/Abuja");
    if (tzIsNigerian) setCurrency("NGN");

    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (data?.country_code === "NG") {
          setCurrency("NGN");
        } else if (data?.country_code) {
          setCurrency("USD");
        }
      })
      .catch(() => {
        if (!tzIsNigerian) setCurrency("USD");
      });

    fetch("https://api.frankfurter.app/latest?from=USD&to=NGN")
      .then((r) => r.json())
      .then((data) => {
        const rate = data?.rates?.NGN;
        if (rate && typeof rate === "number") setExchangeRate(rate);
      })
      .catch(() => {
        /* keep fallback rate */
      })
      .finally(() => setRateLoading(false));
  }, []);

  const isWebsite = formData.serviceCategory === "website";
  const activeSection = isWebsite ? quotePricing.website : quotePricing.backend;

  // Switch service category
  function handleCategoryChange(cat: ServiceCategory) {
    const firstType = cat === "website" ? firstWebsiteType : firstBackendType;
    setFormData((prev) => ({
      ...prev,
      serviceCategory: cat,
      type: firstType,
      platforms: [],
      features:
        cat === "website"
          ? (WEBSITE_TYPE_PRESETS[firstType] ?? [])
          : (BACKEND_TYPE_PRESETS[firstType] ?? []),
      domain: false,
      hosting: false,
      deployment: false,
      ciCd: false,
    }));
  }

  // Switch project type — auto-apply feature preset
  function handleTypeChange(val: string) {
    const preset = isWebsite
      ? (WEBSITE_TYPE_PRESETS[val] ?? [])
      : (BACKEND_TYPE_PRESETS[val] ?? []);
    setFormData((prev) => ({ ...prev, type: val, features: preset }));
  }

  function toggleItem(field: "platforms" | "features", value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  }

  // Live cost calculation
  const estimatedCost = useMemo(() => {
    let min = activeSection.base.min;
    let max = activeSection.base.max;

    const t = activeSection.types.find((x) => x.value === formData.type);
    if (t) {
      min += t.min;
      max += t.max;
    }

    if (isWebsite) {
      for (const p of formData.platforms) {
        const obj = quotePricing.website.platforms.find((x) => x.value === p);
        if (obj) {
          min += obj.min;
          max += obj.max;
        }
      }
    }

    for (const f of formData.features) {
      const obj = activeSection.features.find((x) => x.value === f);
      if (obj) {
        min += obj.min;
        max += obj.max;
      }
    }

    if (isWebsite) {
      if (formData.domain) {
        const d = quotePricing.website.optional.find(
          (x) => x.value === "domain",
        );
        if (d) {
          min += d.min;
          max += d.max;
        }
      }
      if (formData.hosting) {
        const h = quotePricing.website.optional.find(
          (x) => x.value === "hosting_first",
        );
        if (h) {
          min += h.min;
          max += h.max;
        }
      }
    } else {
      if (formData.deployment) {
        const d = quotePricing.backend.optional.find(
          (x) => x.value === "deployment",
        );
        if (d) {
          min += d.min;
          max += d.max;
        }
      }
      if (formData.ciCd) {
        const c = quotePricing.backend.optional.find(
          (x) => x.value === "ci_cd",
        );
        if (c) {
          min += c.min;
          max += c.max;
        }
      }
    }

    return { min, max };
  }, [formData, isWebsite, activeSection]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        currency,
        range: `${fmt(estimatedCost.min, currency, exchangeRate)} – ${fmt(estimatedCost.max, currency, exchangeRate)}`,
      };
      const res = await axios.post("/api/quote", payload);
      if (res.status === 200) setSubmitStatus("success");
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 flex flex-col justify-between">
      <Header />

      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20 w-full">
        <div className="mb-8 text-center space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-2 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Back to home
            </span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Get a Project{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Quote
            </span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Tell O.V.A WebvicTech about your project requirements and receive an
            instant, itemized estimate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* ── Service Category ── */}
          <section className="bg-white border border-slate-200/80 shadow-md shadow-slate-100 rounded-2xl p-6">
            <h2 className="text-xs font-bold tracking-wider uppercase text-blue-600 mb-4">
              Service Category
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  cat: "website" as const,
                  label: "Website / App",
                  sub: "Frontend & full-stack",
                  Icon: Globe,
                },
                {
                  cat: "backend" as const,
                  label: "Backend / API",
                  sub: "APIs, microservices & DBs",
                  Icon: Server,
                },
              ].map(({ cat, label, sub, Icon }) => {
                const selected = formData.serviceCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${
                      selected
                        ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <Icon
                      size={22}
                      className={selected ? "text-blue-600" : "text-slate-500"}
                    />
                    <p
                      className={`mt-2 text-sm font-bold ${selected ? "text-blue-900" : "text-slate-900"}`}
                    >
                      {label}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Contact ── */}
          <section className="bg-white border border-slate-200/80 shadow-md shadow-slate-100 rounded-2xl p-6">
            <h2 className="text-xs font-bold tracking-wider uppercase text-blue-600 mb-5 flex items-center gap-2">
              <Mail size={14} /> Contact Information
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClass}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={inputClass}
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Project Type ── */}
          <section className="bg-white border border-slate-200/80 shadow-md shadow-slate-100 rounded-2xl p-6">
            <h2 className="text-xs font-bold tracking-wider uppercase text-blue-600 mb-4 flex items-center gap-2">
              <Code2 size={14} />{" "}
              {isWebsite ? "Project Type" : "API / Backend Type"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeSection.types.map(({ value, label, min, max }) => {
                const selected = formData.type === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleTypeChange(value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${
                      selected
                        ? "border-blue-600 bg-blue-50/70 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <p
                      className={`text-sm font-bold ${selected ? "text-blue-900" : "text-slate-900"}`}
                    >
                      {label}
                    </p>
                    <p className="text-xs text-blue-600 font-semibold mt-1">
                      {fmt(min, currency, exchangeRate)} –{" "}
                      {fmt(max, currency, exchangeRate)}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Platforms (website only) ── */}
          {isWebsite && (
            <section className="bg-white border border-slate-200/80 shadow-md shadow-slate-100 rounded-2xl p-6">
              <h2 className="text-xs font-bold tracking-wider uppercase text-blue-600 mb-4 flex items-center gap-2">
                <Smartphone size={14} /> Platforms
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {quotePricing.website.platforms.map(
                  ({ value, label, min, max }) => {
                    const selected = formData.platforms.includes(value);
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => toggleItem("platforms", value)}
                        className={`p-4 rounded-xl border-2 text-left flex items-center justify-between transition-all active:scale-[0.98] ${
                          selected
                            ? "border-blue-600 bg-blue-50/70 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                        }`}
                      >
                        <div>
                          <p
                            className={`text-sm font-bold ${selected ? "text-blue-900" : "text-slate-900"}`}
                          >
                            {label}
                          </p>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {min === 0 && max === 0
                              ? "Included"
                              : `+${fmt(min, currency, exchangeRate)}`}
                          </p>
                        </div>
                        {selected && (
                          <CheckCircle2
                            size={18}
                            className="text-blue-600 flex-shrink-0"
                          />
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            </section>
          )}

          {/* ── Features ── */}
          <section className="bg-white border border-slate-200/80 shadow-md shadow-slate-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xs font-bold tracking-wider uppercase text-blue-600 flex items-center gap-2">
                <Server size={14} /> {isWebsite ? "Features" : "API Features"}
              </h2>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Auto-Selected
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Pre-selected based on your project type — customize as needed.
            </p>
            <div className="flex flex-col gap-2.5">
              {activeSection.features.map(
                ({ value, label, description, min, max }) => {
                  const selected = formData.features.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleItem("features", value)}
                      className={`p-4 rounded-xl border-2 text-left flex items-start justify-between gap-3 transition-all active:scale-[0.99] ${
                        selected
                          ? "border-blue-600 bg-blue-50/70 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className="flex-1">
                        <p
                          className={`text-sm font-bold ${selected ? "text-blue-900" : "text-slate-900"}`}
                        >
                          {label}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {description}
                        </p>
                        <p className="text-xs text-blue-600 font-semibold mt-1">
                          +{fmt(min, currency, exchangeRate)} –{" "}
                          {fmt(max, currency, exchangeRate)}
                        </p>
                      </div>
                      {selected && (
                        <CheckCircle2
                          size={18}
                          className="text-blue-600 flex-shrink-0 mt-0.5"
                        />
                      )}
                    </button>
                  );
                },
              )}
            </div>
          </section>

          {/* ── Add-ons ── */}
          <section className="bg-white border border-slate-200/80 shadow-md shadow-slate-100 rounded-2xl p-6">
            <h2 className="text-xs font-bold tracking-wider uppercase text-blue-600 mb-4">
              Optional Add-ons
            </h2>
            <div className="flex flex-col gap-2.5">
              {isWebsite ? (
                <>
                  {[
                    {
                      key: "domain" as const,
                      label: "Domain Registration",
                      note: `${fmt(35000, currency, exchangeRate)} / year`,
                    },
                    {
                      key: "hosting" as const,
                      label: "Web Hosting",
                      note: `${fmt(12000, currency, exchangeRate)} first month`,
                    },
                  ].map(({ key, label, note }) => (
                    <label
                      key={key}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData[key]
                          ? "border-blue-600 bg-blue-50/70 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData[key]}
                        onChange={() =>
                          setFormData((prev) => ({
                            ...prev,
                            [key]: !prev[key],
                          }))
                        }
                        className="accent-blue-600 w-4 h-4 rounded"
                      />
                      <div>
                        <p
                          className={`text-sm font-bold ${formData[key] ? "text-blue-900" : "text-slate-900"}`}
                        >
                          {label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{note}</p>
                      </div>
                    </label>
                  ))}
                </>
              ) : (
                <>
                  {quotePricing.backend.optional.map(
                    ({ value, label, min, max }) => {
                      const key =
                        value === "deployment" ? "deployment" : "ciCd";
                      const checked = formData[key as "deployment" | "ciCd"];
                      return (
                        <label
                          key={value}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            checked
                              ? "border-blue-600 bg-blue-50/70 shadow-sm"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                [key]: !prev[key as "deployment" | "ciCd"],
                              }))
                            }
                            className="accent-blue-600 w-4 h-4 rounded"
                          />
                          <div>
                            <p
                              className={`text-sm font-bold ${checked ? "text-blue-900" : "text-slate-900"}`}
                            >
                              {label}
                            </p>
                            <p className="text-xs text-blue-600 font-semibold mt-0.5">
                              +{fmt(min, currency, exchangeRate)} –{" "}
                              {fmt(max, currency, exchangeRate)}
                            </p>
                          </div>
                        </label>
                      );
                    },
                  )}
                </>
              )}
            </div>
          </section>

          {/* ── Project Details ── */}
          <section className="bg-white border border-slate-200/80 shadow-md shadow-slate-100 rounded-2xl p-6">
            <h2 className="text-xs font-bold tracking-wider uppercase text-blue-600 mb-5">
              Project Details
            </h2>
            <div className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Budget Range</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className={inputClass}
                    placeholder="₦200,000 – ₦500,000"
                  />
                </div>
                <div>
                  <label className={labelClass}>Timeline</label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, timeline: e.target.value })
                    }
                    className={inputClass}
                    placeholder="2–3 months"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                />
              </div>
            </div>
          </section>

          {/* ── Estimate Highlight Card ── */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                  Estimated Cost
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setCurrency((c) => (c === "NGN" ? "USD" : "NGN"))
                  }
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Switch currency"
                >
                  {rateLoading
                    ? "..."
                    : currency === "NGN"
                      ? "Switch to USD"
                      : "Switch to NGN"}
                </button>
              </div>
              <p className="text-3xl font-extrabold tracking-tight">
                {fmt(estimatedCost.min, currency, exchangeRate)}{" "}
                <span className="text-blue-200 font-normal">–</span>{" "}
                {fmt(estimatedCost.max, currency, exchangeRate)}
              </p>
              {currency === "USD" && (
                <p className="text-[11px] text-blue-200 mt-1">
                  Rate: ₦{exchangeRate.toLocaleString()} / $1 (live)
                </p>
              )}
            </div>
            <p className="text-xs text-blue-100 max-w-xs leading-relaxed">
              Transparent estimate based on your selections. Final scope &amp;
              pricing discussed during consultation.
            </p>
          </div>

          {/* ── Submit Button ── */}
          <div className="flex flex-col items-center gap-4 pb-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending
                  Request...
                </>
              ) : (
                <>
                  <Send size={18} /> Submit Quote Request
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="text-emerald-600 flex-shrink-0"
                />
                <p className="text-sm font-semibold text-emerald-800">
                  Quote request sent successfully! We will contact you within 24
                  hours.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="w-full bg-rose-50 border border-rose-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-rose-700">
                  Something went wrong. Please try again or contact support.
                </p>
              </div>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
