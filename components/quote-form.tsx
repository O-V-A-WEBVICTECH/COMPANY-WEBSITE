"use client";
import axios from "axios";
import { useState, useMemo, useEffect, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FaReact,
  FaAndroid,
  FaApple,
  FaChrome,
  FaDesktop,
} from "react-icons/fa";
import { SiFlutter } from "react-icons/si";
import { TbWorld } from "react-icons/tb";

interface PriceRange {
  min: number;
  max: number;
}

interface PricingOption {
  value: string;
  label: string;
  min: number;
  max: number;
}

interface Feature extends PricingOption {
  description: string;
}

interface Pricing {
  website: {
    base: PriceRange;
    types: PricingOption[];
    platforms: PricingOption[];
    features: Feature[];
    optional: PricingOption[];
  };
}

export interface QuotePayload {
  title: string;
  type: string;
  platforms: string[];
  features: string[];
  domain: boolean;
  hosting: boolean;
  budget: string;
  email: string;
  phone: string;
  range: string;
  currency: string;
}

interface QuoteFormProps {
  pricing: Pricing;
  onSent: (data: { estimate_id: string; payload: QuotePayload }) => void;
}

interface Status {
  type: "success" | "error" | "";
  message: string;
}

// Platform icon mapping
const platformIcons: Record<string, React.ReactNode> = {
  web: <TbWorld className="w-5 h-5" />,
  android: <FaAndroid className="w-5 h-5" />,
  ios: <FaApple className="w-5 h-5" />,
  desktop: <FaDesktop className="w-5 h-5" />,
  react: <FaReact className="w-5 h-5" />,
  flutter: <SiFlutter className="w-5 h-5" />,
  pwa: <FaChrome className="w-5 h-5" />,
};

export default function QuoteForm({ pricing, onSent }: QuoteFormProps) {
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>(pricing.website.types[0].value);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [domain, setDomain] = useState<boolean>(false);
  const [hosting, setHosting] = useState<boolean>(false);
  const [budget, setBudget] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [status, setStatus] = useState<Status>({ type: "", message: "" });
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [exchangeRate, setExchangeRate] = useState<number>(1600);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    value: string
  ): void => {
    if (arr.includes(value)) arrSetter(arr.filter((a) => a !== value));
    else arrSetter([...arr, value]);
  };

  const convertPrice = (ngnPrice: number): number => {
    if (currency === "USD") {
      return Math.round(ngnPrice / exchangeRate);
    }
    return ngnPrice;
  };

  const fmt = (n: number): string => {
    const convertedAmount = convertPrice(n);
    if (currency === "USD") {
      return "$" + convertedAmount.toLocaleString();
    }
    return "₦" + convertedAmount.toLocaleString();
  };

  const range = useMemo<PriceRange>(() => {
    let min = pricing.website.base.min || 0;
    let max = pricing.website.base.max || 0;

    const t = pricing.website.types.find((x) => x.value === type);
    if (t) {
      min += t.min || 0;
      max += t.max || 0;
    }

    for (const p of platforms) {
      const obj = pricing.website.platforms.find((x) => x.value === p);
      if (obj) {
        min += obj.min || 0;
        max += obj.max || 0;
      }
    }

    for (const f of features) {
      const obj = pricing.website.features.find((x) => x.value === f);
      if (obj) {
        min += obj.min || 0;
        max += obj.max || 0;
      }
    }

    if (domain) {
      const d = pricing.website.optional.find((x) => x.value === "domain");
      if (d) {
        min += d.min;
        max += d.max;
      }
    }
    if (hosting) {
      const h = pricing.website.optional.find(
        (x) => x.value === "hosting_first"
      );
      if (h) {
        min += h.min;
        max += h.max;
      }
    }

    return { min, max };
  }, [pricing, type, platforms, features, domain, hosting]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!email) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }

    setIsSubmitting(true);

    const payload: QuotePayload = {
      title,
      type,
      platforms,
      features,
      domain,
      hosting,
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

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      console.error("Network error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setStatus({ type: "error", message: "Network error: " + errorMessage });
      setIsSubmitting(false);
    }
  }

  // Get icon for platform or return default
  const getPlatformIcon = (value: string) => {
    return (
      platformIcons[value.toLowerCase()] || <Smartphone className="w-5 h-5" />
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Currency Toggle - Sticky */}
        <div className="sticky top-4 z-10">
          <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <AlertDescription className="flex items-center justify-between">
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

        {/* Project Details Section */}
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
          <CardContent className="space-y-4 p-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g., My E-commerce Store"
              />
            </div>

            <div className="space-y-2 mt-2">
              <Label htmlFor="project-type">Project Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="project-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pricing.website.types.map((t) => (
                    <SelectItem
                      className="w-full"
                      key={t.value}
                      value={t.value}
                    >
                      <div className="flex items-start flex-col gap-1">
                        <div className="font-medium">{t.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {fmt(t.min)} - {fmt(t.max)}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Platforms Section with Icons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Platforms
            </CardTitle>
            <CardDescription>Select the platforms you need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-y-3 flex-col">
              {pricing.website.platforms.map((p) => (
                <Button
                  type="button"
                  key={p.value}
                  variant={platforms.includes(p.value) ? "default" : "outline"}
                  onClick={() => toggle(setPlatforms, platforms, p.value)}
                  className="flex w-full flex-col items-center h-auto py-4 gap-2"
                >
                  {getPlatformIcon(p.value)}
                  <div className="text-center">
                    <div className="font-medium text-sm">{p.label}</div>
                    <div className="text-xs opacity-80 mt-1">
                      {fmt(p.min)} - {fmt(p.max)}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Puzzle className="w-5 h-5" />
              Extra Features
            </CardTitle>
            <CardDescription>
              Choose additional features for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {pricing.website.features.map((f) => (
                <label
                  key={f.value}
                  htmlFor={`feature-${f.value}`}
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    features.includes(f.value)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Checkbox
                    id={`feature-${f.value}`}
                    checked={features.includes(f.value)}
                    onCheckedChange={() =>
                      toggle(setFeatures, features, f.value)
                    }
                  />
                  <div className="flex-1 space-y-1">
                    <div className="font-semibold">{f.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {f.description}
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      {fmt(f.min)} - {fmt(f.max)}
                    </Badge>
                  </div>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Optional Add-ons Section */}
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
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Checkbox
                id="domain"
                checked={domain}
                onCheckedChange={(checked) => setDomain(checked as boolean)}
              />
              <label
                htmlFor="domain"
                className="flex-1 cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Domain Registration
                <span className="text-sm text-muted-foreground ml-2">
                  ({fmt(35000)} / year)
                </span>
              </label>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Checkbox
                id="hosting"
                checked={hosting}
                onCheckedChange={(checked) => setHosting(checked as boolean)}
              />
              <label
                htmlFor="hosting"
                className="flex-1 cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Web Hosting
                <span className="text-sm text-muted-foreground ml-2">
                  ({fmt(15000)} first month, {fmt(12000)} monthly)
                </span>
              </label>
            </div>

            <Alert>
              <AlertDescription className="text-sm">
                💡 These add-ons are optional — leave unchecked to skip
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Budget Section */}
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
          <CardContent>
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

        {/* Estimated Total - Sticky Bottom */}
        <div className="sticky bottom-4 z-10">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <div className="text-sm  text-center opacity-90">
                    Estimated Project Cost
                  </div>
                  <div className="text-xl lg:text-3xl font-bold mt-1">
                    {fmt(range.min)} - {fmt(range.max)}
                  </div>
                </div>
                <div className="text-sm opacity-90 text-center md:text-right">
                  Final pricing may vary based on
                  <br />
                  specific requirements
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information Section */}
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

        {/* Submit Button */}
        <div className="flex flex-col items-center gap-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Quote Request
              </>
            )}
          </Button>

          {status.message && (
            <Alert
              variant={status.type === "success" ? "default" : "destructive"}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}
