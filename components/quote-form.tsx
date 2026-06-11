"use client";
import axios from "axios";
import { useState, useMemo, useEffect, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PriceRange, QuotePricing } from "@/lib/quote-pricing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  DollarSign,
  Smartphone,
  Puzzle,
  Plus,
  Mail,
  Send,
  CheckCircle2,
  XCircle,
  Globe,
  Server,
  ShoppingCart,
  Briefcase,
  Newspaper,
  CalendarCheck,
  Store,
  Layers,
  FileText,
  User,
  Cpu,
  Zap,
  GitBranch,
  Radio,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FaReact,
  FaAndroid,
  FaApple,
  FaChrome,
  FaDesktop,
} from "react-icons/fa";
import { SiFlutter } from "react-icons/si";
import { TbWorld } from "react-icons/tb";

export type ServiceCategory = "website" | "backend";

export interface QuotePayload {
  title: string;
  serviceCategory: ServiceCategory;
  type: string;
  platforms: string[];
  features: string[];
  domain: boolean;
  hosting: boolean;
  deployment: boolean;
  ciCd: boolean;
  budget: string;
  email: string;
  phone: string;
  range: string;
  currency: string;
}

interface QuoteFormProps {
  pricing: QuotePricing;
  onSent: (data: { estimate_id: string; payload: QuotePayload }) => void;
}

interface Status {
  type: "success" | "error" | "";
  message: string;
}

const EMPTY_QUOTE_WEBSITE: QuotePricing["website"] = {
  base: { min: 0, max: 0 },
  types: [],
  platforms: [],
  features: [],
  optional: [],
};

const EMPTY_QUOTE_BACKEND: QuotePricing["backend"] = {
  base: { min: 0, max: 0 },
  types: [],
  features: [],
  optional: [],
};

// Feature presets per project type — auto-selected when a type is chosen
const WEBSITE_TYPE_PRESETS: Record<string, string[]> = {
  landing: ["seo"],
  portfolio: ["seo", "cms"],
  business: ["seo", "cms", "live_chat", "notifications"],
  blog_cms: ["cms", "seo", "social_auth", "analytics"],
  ecommerce: [
    "auth",
    "payment",
    "admin_panel",
    "notifications",
    "analytics",
    "seo",
  ],
  saas: [
    "auth",
    "admin_panel",
    "payment",
    "analytics",
    "notifications",
    "social_auth",
  ],
  booking: ["auth", "payment", "notifications", "admin_panel"],
  marketplace: [
    "auth",
    "payment",
    "admin_panel",
    "analytics",
    "notifications",
    "seo",
    "multilang",
  ],
};

const BACKEND_TYPE_PRESETS: Record<string, string[]> = {
  rest_api: ["auth_backend", "database_design", "api_docs"],
  graphql_api: ["auth_backend", "database_design", "api_docs", "caching"],
  microservices: [
    "auth_backend",
    "database_design",
    "api_docs",
    "caching",
    "email_service",
  ],
  realtime: ["auth_backend", "database_design", "caching"],
  serverless: ["database_design", "api_docs"],
};
const platformIcons: Record<string, React.ReactNode> = {
  web: <TbWorld className="w-5 h-5" />,
  android: <FaAndroid className="w-5 h-5" />,
  ios: <FaApple className="w-5 h-5" />,
  desktop: <FaDesktop className="w-5 h-5" />,
  react: <FaReact className="w-5 h-5" />,
  flutter: <SiFlutter className="w-5 h-5" />,
  pwa: <FaChrome className="w-5 h-5" />,
};

// Website type icons + descriptions
const websiteTypeConfig: Record<
  string,
  { icon: React.ReactNode; desc: string }
> = {
  landing: {
    icon: <FileText className="w-5 h-5" />,
    desc: "Single page to convert visitors",
  },
  portfolio: {
    icon: <User className="w-5 h-5" />,
    desc: "Showcase your work & skills",
  },
  business: {
    icon: <Briefcase className="w-5 h-5" />,
    desc: "Professional company presence",
  },
  blog_cms: {
    icon: <Newspaper className="w-5 h-5" />,
    desc: "Content publishing platform",
  },
  ecommerce: {
    icon: <ShoppingCart className="w-5 h-5" />,
    desc: "Sell products online with checkout",
  },
  saas: {
    icon: <Layers className="w-5 h-5" />,
    desc: "Software-as-a-service platform",
  },
  booking: {
    icon: <CalendarCheck className="w-5 h-5" />,
    desc: "Schedule appointments & reservations",
  },
  marketplace: {
    icon: <Store className="w-5 h-5" />,
    desc: "Multi-vendor buying & selling",
  },
};

// Backend type icons + descriptions
const backendTypeConfig: Record<
  string,
  { icon: React.ReactNode; desc: string }
> = {
  rest_api: {
    icon: <Server className="w-5 h-5" />,
    desc: "Standard HTTP REST endpoints",
  },
  graphql_api: {
    icon: <GitBranch className="w-5 h-5" />,
    desc: "Flexible query-based API",
  },
  microservices: {
    icon: <Cpu className="w-5 h-5" />,
    desc: "Independent scalable services",
  },
  realtime: {
    icon: <Radio className="w-5 h-5" />,
    desc: "Live data via WebSockets",
  },
  serverless: {
    icon: <Zap className="w-5 h-5" />,
    desc: "Event-driven cloud functions",
  },
};

export default function QuoteForm({ pricing, onSent }: QuoteFormProps) {
  // ── Service category ────────────────────────────────────────────────────
  const [serviceCategory, setServiceCategory] =
    useState<ServiceCategory>("website");

  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>(
    () => pricing.website?.types?.[0]?.value ?? "",
  );
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>(() => {
    const firstType = pricing.website?.types?.[0]?.value ?? "";
    return WEBSITE_TYPE_PRESETS[firstType] ?? [];
  });

  // website add-ons
  const [domain, setDomain] = useState<boolean>(false);
  const [hosting, setHosting] = useState<boolean>(false);

  // backend add-ons
  const [deployment, setDeployment] = useState<boolean>(false);
  const [ciCd, setCiCd] = useState<boolean>(false);

  const [budget, setBudget] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [status, setStatus] = useState<Status>({ type: "", message: "" });
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [exchangeRate, setExchangeRate] = useState<number>(1600);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Reset selections when category switches
  const handleCategoryChange = (cat: ServiceCategory) => {
    const firstType =
      cat === "website"
        ? (pricing.website?.types?.[0]?.value ?? "")
        : (pricing.backend?.types?.[0]?.value ?? "");
    setServiceCategory(cat);
    setType(firstType);
    setPlatforms([]);
    setFeatures(
      cat === "website"
        ? (WEBSITE_TYPE_PRESETS[firstType] ?? [])
        : (BACKEND_TYPE_PRESETS[firstType] ?? []),
    );
    setDomain(false);
    setHosting(false);
    setDeployment(false);
    setCiCd(false);
  };

  // Apply feature preset when type changes
  const handleTypeChange = (val: string) => {
    setType(val);
    const preset = isWebsite
      ? (WEBSITE_TYPE_PRESETS[val] ?? [])
      : (BACKEND_TYPE_PRESETS[val] ?? []);
    setFeatures(preset);
  };

  useEffect(() => {
    async function detectLocation() {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        if (response?.data.country_code === "NG") {
          setCurrency("NGN");
        } else {
          setCurrency("USD");
          await fetchExchangeRate();
        }
      } catch (error) {
        console.error("Error detecting location:", error);
        setCurrency("NGN");
      }
    }

    async function fetchExchangeRate() {
      try {
        const res = await axios.get("https://open.er-api.com/v6/latest/NGN");
        setExchangeRate(res.data.rates.USD);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    }

    detectLocation();
  }, []);

  const toggle = (
    arrSetter: React.Dispatch<React.SetStateAction<string[]>>,
    arr: string[],
    value: string,
  ): void => {
    if (arr.includes(value)) arrSetter(arr.filter((a) => a !== value));
    else arrSetter([...arr, value]);
  };

  const website = pricing.website ?? EMPTY_QUOTE_WEBSITE;
  const backend = pricing.backend ?? EMPTY_QUOTE_BACKEND;
  const isWebsite = serviceCategory === "website";
  const activeSection = isWebsite ? website : backend;

  const hasPricingData = isWebsite
    ? website.types.length > 0 &&
      website.platforms.length > 0 &&
      website.features.length > 0
    : backend.types.length > 0 && backend.features.length > 0;

  const convertPrice = (ngnPrice: number): number => {
    if (currency === "USD") return Math.round(ngnPrice / exchangeRate);
    return ngnPrice;
  };

  const fmt = (n: number): string => {
    const converted = convertPrice(n);
    return currency === "USD"
      ? "$" + converted.toLocaleString()
      : "₦" + converted.toLocaleString();
  };

  // ── Live price calculation ───────────────────────────────────────────────
  const range = useMemo<PriceRange>(() => {
    let min = activeSection.base.min || 0;
    let max = activeSection.base.max || 0;

    const t = activeSection.types.find((x) => x.value === type);
    if (t) {
      min += t.min || 0;
      max += t.max || 0;
    }

    if (isWebsite) {
      for (const p of platforms) {
        const obj = website.platforms.find((x) => x.value === p);
        if (obj) {
          min += obj.min || 0;
          max += obj.max || 0;
        }
      }
    }

    for (const f of features) {
      const obj = activeSection.features.find((x) => x.value === f);
      if (obj) {
        min += obj.min || 0;
        max += obj.max || 0;
      }
    }

    if (isWebsite) {
      if (domain) {
        const d = website.optional.find((x) => x.value === "domain");
        if (d) {
          min += d.min;
          max += d.max;
        }
      }
      if (hosting) {
        const h = website.optional.find((x) => x.value === "hosting_first");
        if (h) {
          min += h.min;
          max += h.max;
        }
      }
    } else {
      if (deployment) {
        const d = backend.optional.find((x) => x.value === "deployment");
        if (d) {
          min += d.min;
          max += d.max;
        }
      }
      if (ciCd) {
        const c = backend.optional.find((x) => x.value === "ci_cd");
        if (c) {
          min += c.min;
          max += c.max;
        }
      }
    }

    return { min, max };
  }, [
    activeSection,
    isWebsite,
    website,
    backend,
    type,
    platforms,
    features,
    domain,
    hosting,
    deployment,
    ciCd,
  ]);

  // ── Summary labels ───────────────────────────────────────────────────────
  const selectedTypeLabel =
    activeSection.types.find((item) => item.value === type)?.label ??
    "Not selected";

  const selectedPlatformsLabel = isWebsite
    ? platforms.length > 0
      ? website.platforms
          .filter((item) => platforms.includes(item.value))
          .map((item) => item.label)
          .join(", ")
      : "None selected"
    : "N/A";

  const selectedFeaturesLabel =
    features.length > 0
      ? activeSection.features
          .filter((item) => features.includes(item.value))
          .map((item) => item.label)
          .join(", ")
      : "None selected";

  const selectedAddonsLabel = isWebsite
    ? [domain ? "Domain" : null, hosting ? "Hosting" : null]
        .filter(Boolean)
        .join(", ") || "None selected"
    : [
        deployment ? "Deployment & DevOps" : null,
        ciCd ? "CI/CD Pipeline" : null,
      ]
        .filter(Boolean)
        .join(", ") || "None selected";

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!email) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }

    setIsSubmitting(true);

    const payload: QuotePayload = {
      title,
      serviceCategory,
      type,
      platforms: isWebsite ? platforms : [],
      features,
      domain: isWebsite ? domain : false,
      hosting: isWebsite ? hosting : false,
      deployment: !isWebsite ? deployment : false,
      ciCd: !isWebsite ? ciCd : false,
      budget,
      email,
      phone: phonenumber,
      range: `${fmt(range.min)} - ${fmt(range.max)}`,
      currency,
    };

    try {
      const res = await axios.post("/api/quote", payload);

      if (res.status === 200) {
        onSent({ estimate_id: res.data?.estimate_id, payload });
        setStatus({
          type: "success",
          message: "Quote request sent successfully! Reloading...",
        });
        setTimeout(() => window.location.reload(), 5000);
      }
    } catch (err) {
      console.error("Network error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setStatus({ type: "error", message: "Network error: " + errorMessage });
      setIsSubmitting(false);
    }
  }

  const getPlatformIcon = (value: string) =>
    platformIcons[value.toLowerCase()] || <Smartphone className="w-5 h-5" />;

  if (!hasPricingData) {
    return (
      <div className="max-w-4xl mx-auto p-6 rounded-xl border border-red-200 bg-red-50 text-center text-red-700">
        <h2 className="text-lg font-semibold">Pricing data unavailable</h2>
        <p className="mt-2 text-sm text-slate-700">
          We could not load the quote pricing details. Please refresh the page
          or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ── Currency bar ── */}
        <div className="sticky top-4 z-20">
          <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium">
                Currency: <strong className="text-blue-700">{currency}</strong>
              </span>
              <Button
                type="button"
                size="sm"
                onClick={() => setCurrency(currency === "NGN" ? "USD" : "NGN")}
              >
                Switch to {currency === "NGN" ? "USD" : "NGN"}
              </Button>
            </AlertDescription>
          </Alert>
        </div>

        {/* ── Service category toggle ── */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Service Category
            </CardTitle>
            <CardDescription>
              What kind of project are you planning?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={isWebsite ? "default" : "outline"}
                onClick={() => handleCategoryChange("website")}
                className="flex flex-col items-center gap-2 h-auto py-4 rounded-2xl"
              >
                <Globe className="w-5 h-5" />
                <span className="font-semibold">Website / App</span>
                <span className="hidden md:block text-xs font-normal opacity-80">
                  Frontend &amp; full-stack projects
                </span>
              </Button>
              <Button
                type="button"
                variant={!isWebsite ? "default" : "outline"}
                onClick={() => handleCategoryChange("backend")}
                className="flex flex-col items-center gap-2 h-auto py-4 rounded-2xl"
              >
                <Server className="w-5 h-5" />
                <span className="font-semibold">Backend / API</span>
                <span className="hidden md:block text-xs font-normal opacity-80">
                  APIs, microservices &amp; databases
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {/* ── Project Details ── */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Project Details
                </CardTitle>
                <CardDescription>Tell us about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-3">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                    placeholder={
                      isWebsite
                        ? "e.g., My E-commerce Store"
                        : "e.g., Payments REST API"
                    }
                  />
                </div>

                <div className="space-y-2 mt-2">
                  <Label>
                    {isWebsite ? "Project Type" : "API / Backend Type"}
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activeSection.types.map((t) => {
                      const config = isWebsite
                        ? websiteTypeConfig[t.value]
                        : backendTypeConfig[t.value];
                      const isSelected = type === t.value;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => handleTypeChange(t.value)}
                          className={`flex flex-col items-start gap-1.5 rounded-2xl border-2 p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-white hover:border-primary/50 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={
                              isSelected
                                ? "text-primary-foreground"
                                : "text-primary"
                            }
                          >
                            {config?.icon ?? <FileText className="w-5 h-5" />}
                          </span>
                          <span className="text-sm font-semibold leading-tight">
                            {t.label}
                          </span>
                          {config?.desc && (
                            <span
                              className={`text-xs leading-snug ${isSelected ? "opacity-80" : "text-muted-foreground"}`}
                            >
                              {config.desc}
                            </span>
                          )}
                          <span
                            className={`text-xs font-medium mt-0.5 ${isSelected ? "opacity-75" : "text-slate-500"}`}
                          >
                            {fmt(t.min)} – {fmt(t.max)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── Platforms (website only) ── */}
            {isWebsite && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Platforms
                  </CardTitle>
                  <CardDescription>
                    Choose the platforms you need
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {website.platforms.map((p) => {
                      const isSelected = platforms.includes(p.value);
                      return (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() =>
                            toggle(setPlatforms, platforms, p.value)
                          }
                          className={`flex flex-col items-start gap-1.5 rounded-2xl border-2 p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-white hover:border-primary/50 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={
                              isSelected
                                ? "text-primary-foreground"
                                : "text-primary"
                            }
                          >
                            {getPlatformIcon(p.value)}
                          </span>
                          <span className="text-sm font-semibold leading-tight">
                            {p.label}
                          </span>
                          <span
                            className={`text-xs font-medium mt-0.5 ${isSelected ? "opacity-75" : "text-slate-500"}`}
                          >
                            {p.min === 0 && p.max === 0
                              ? "Included"
                              : `${fmt(p.min)} – ${fmt(p.max)}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ── Features ── */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Puzzle className="w-5 h-5" />
                  {isWebsite ? "Extra Features" : "API Features"}
                </CardTitle>
                <CardDescription>
                  {isWebsite
                    ? "Pre-selected based on your project type — customise as needed"
                    : "Select the capabilities your API needs"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {activeSection.features.map((f) => (
                    <label
                      key={f.value}
                      htmlFor={`feature-${f.value}`}
                      className={`flex items-start gap-3 p-4 border-2 rounded-3xl cursor-pointer transition-all ${
                        features.includes(f.value)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Checkbox
                        id={`feature-${f.value}`}
                        checked={features.includes(f.value)}
                        onCheckedChange={() =>
                          toggle(setFeatures, features, f.value)
                        }
                        className={
                          features.includes(f.value)
                            ? "border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
                            : ""
                        }
                      />
                      <div className="flex-1 space-y-1">
                        <div className="font-semibold">{f.label}</div>
                        <div
                          className={`text-sm ${features.includes(f.value) ? "opacity-80" : "text-muted-foreground"}`}
                        >
                          {f.description}
                        </div>
                        <Badge
                          variant={
                            features.includes(f.value) ? "outline" : "secondary"
                          }
                          className={`mt-2 ${features.includes(f.value) ? "border-primary-foreground/40 text-primary-foreground" : ""}`}
                        >
                          {fmt(f.min)} – {fmt(f.max)}
                        </Badge>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ── Optional Add-ons ── */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Optional Add-ons
                </CardTitle>
                <CardDescription>
                  Additional services you might need
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {isWebsite ? (
                  <>
                    <div className="flex items-center space-x-3 p-3 border rounded-3xl">
                      <Checkbox
                        id="domain"
                        checked={domain}
                        onCheckedChange={(checked) =>
                          setDomain(checked as boolean)
                        }
                      />
                      <label
                        htmlFor="domain"
                        className="flex-1 cursor-pointer font-medium leading-none"
                      >
                        Domain Registration
                        <span className="text-sm text-muted-foreground ml-2">
                          ({fmt(35000)} / year)
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-3xl">
                      <Checkbox
                        id="hosting"
                        checked={hosting}
                        onCheckedChange={(checked) =>
                          setHosting(checked as boolean)
                        }
                      />
                      <label
                        htmlFor="hosting"
                        className="flex-1 cursor-pointer font-medium leading-none"
                      >
                        Web Hosting
                        <span className="text-sm text-muted-foreground ml-2">
                          ({fmt(15000)} first month, {fmt(12000)} monthly)
                        </span>
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    {backend.optional.map((opt) => {
                      const checked =
                        opt.value === "deployment" ? deployment : ciCd;
                      const setter =
                        opt.value === "deployment" ? setDeployment : setCiCd;
                      return (
                        <div
                          key={opt.value}
                          className="flex items-center space-x-3 p-4 border rounded-3xl"
                        >
                          <Checkbox
                            id={opt.value}
                            checked={checked}
                            onCheckedChange={(c) => setter(c as boolean)}
                          />
                          <label
                            htmlFor={opt.value}
                            className="flex-1 cursor-pointer font-medium leading-none"
                          >
                            {opt.label}
                            <span className="text-sm text-muted-foreground ml-2">
                              ({fmt(opt.min)} – {fmt(opt.max)})
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </>
                )}
                <Alert>
                  <AlertDescription className="text-sm">
                    💡 These add-ons are optional — leave unchecked to skip
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* ── Budget ── */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Your Budget
                </CardTitle>
                <CardDescription>
                  What&apos;s your budget for this project?
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3">
                <Input
                  value={budget}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBudget(e.target.value)
                  }
                  placeholder={`e.g. ${currency === "NGN" ? "₦150,000" : "$100"}`}
                  required
                />
              </CardContent>
            </Card>

            {/* ── Contact ── */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>How can we reach you?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    placeholder="e.g. noreply@gmail.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phonenumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPhonenumber(e.target.value)
                    }
                    placeholder="e.g. +2348012345678"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Sidebar summary ── */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle>Quote Summary</CardTitle>
                <CardDescription>
                  Realtime estimate and selection overview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Estimated cost
                  </p>
                  <p className="mt-4 text-2xl font-bold text-slate-900">
                    {fmt(range.min)} – {fmt(range.max)}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Pricing updates automatically as you choose options.
                  </p>
                </div>

                <div className="grid gap-2 text-sm text-slate-600">
                  {[
                    {
                      label: "Service",
                      value: isWebsite ? "Website / App" : "Backend / API",
                    },
                    { label: "Type", value: selectedTypeLabel },
                    ...(isWebsite
                      ? [{ label: "Platforms", value: selectedPlatformsLabel }]
                      : []),
                    { label: "Features", value: selectedFeaturesLabel },
                    { label: "Add-ons", value: selectedAddonsLabel },
                    { label: "Budget", value: budget || "Not provided" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-3 break-words"
                    >
                      <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                        {item.label}
                      </div>
                      <div className="mt-1 font-medium text-slate-900 whitespace-normal break-words text-sm">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="space-y-3 p-2 md:p-4">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Ready to submit
                  </p>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Send your quote request
                  </h2>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-2 md:p-4 text-sm text-slate-700">
                  Your request will be reviewed and you will receive an estimate
                  by email shortly. The quote updates live as you choose
                  options.
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit quote request
                    </>
                  )}
                </Button>
                {status.message && (
                  <Alert
                    variant={
                      status.type === "success" ? "default" : "destructive"
                    }
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{status.message}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Need help?</CardTitle>
                <CardDescription>
                  We&apos;re happy to assist with your project scope.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-2 md:p-4">
                <div className="rounded-2xl bg-white p-2 md:p-4 shadow-sm">
                  <p className="text-sm text-slate-600">
                    If you need help choosing the right package, contact us at{" "}
                    <strong className="text-slate-900">
                      support@webvitech.com
                    </strong>
                    .
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <p>Fast response within 24 hours.</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </form>
    </div>
  );
}
