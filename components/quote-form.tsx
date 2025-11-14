"use client";
import axios from "axios";
import { useState, useMemo, FormEvent, ChangeEvent } from "react";

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
}

interface ApiResponse {
  success: boolean;
  estimate_id?: string;
  message?: string;
}

interface QuoteFormProps {
  pricing: Pricing;
  onSent: (data: { estimate_id: string; payload: QuotePayload }) => void;
}

interface Status {
  type: "success" | "error" | "";
  message: string;
}

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

  const toggle = (
    arrSetter: React.Dispatch<React.SetStateAction<string[]>>,
    arr: string[],
    value: string
  ): void => {
    if (arr.includes(value)) arrSetter(arr.filter((a) => a !== value));
    else arrSetter([...arr, value]);
  };

  // Compute total cost range
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

  const fmt = (n: number): string => "₦" + n.toLocaleString();

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!email) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }

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
        }, 3000);
      }
    } catch (err) {
      console.error("Network error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setStatus({ type: "error", message: "Network error: " + errorMessage });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium">Project name</label>
        <input
          className="mt-1 border p-2 w-full rounded"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </div>

      <div>
        <label className="block font-medium">Project Type</label>
        <select
          className="mt-1 border p-2 w-full rounded"
          value={type}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setType(e.target.value)
          }
        >
          {pricing.website.types.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label} — {fmt(t.min)} - {fmt(t.max)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Platforms</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {pricing.website.platforms.map((p) => (
            <button
              type="button"
              key={p.value}
              className={`px-3 py-1 rounded ${
                platforms.includes(p.value)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => toggle(setPlatforms, platforms, p.value)}
            >
              {p.label} ({fmt(p.min)} - {fmt(p.max)})
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium">Extra Features</label>
        <div className="grid md:grid-cols-2 gap-2 mt-2">
          {pricing.website.features.map((f) => (
            <label
              key={f.value}
              className="flex items-center gap-2 p-2 border rounded"
            >
              <input
                type="checkbox"
                checked={features.includes(f.value)}
                onChange={() => toggle(setFeatures, features, f.value)}
              />
              <div>
                <div className="font-semibold">{f.label}</div>
                <div className="text-sm text-gray-500">{f.description}</div>
              </div>
              <div className="ml-auto font-medium">
                {fmt(f.min)} - {fmt(f.max)}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Optional Add-ons</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="domain"
              checked={domain}
              onChange={() => setDomain(!domain)}
            />
            <span>Domain (₦35,000 / year)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hosting"
              checked={hosting}
              onChange={() => setHosting(!hosting)}
            />
            <span>Hosting (₦15,000 first month, ₦12,000 monthly)</span>
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          These add-ons are optional — leave unchecked to skip.
        </p>
      </div>

      <div>
        <label className="block font-medium">Your Budget</label>
        <input
          className="mt-1 border p-2 w-full rounded"
          value={budget}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBudget(e.target.value)
          }
          placeholder="e.g. ₦150,000"
          required
        />
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="text-sm lg:text-lg font-semibold text-gray-700">
            Estimated total
          </div>
          <div className="text-sm lg:text-xl font-bold">
            {fmt(range.min)} - {fmt(range.max)}
          </div>
        </div>
      </div>

      <div>
        <label className="block font-medium">Your Email (required)</label>
        <input
          type="email"
          className="mt-1 border p-2 w-full rounded"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="e.g. noreply@gmail.com"
          required
        />
      </div>

      <div>
        <label className="block font-medium">
          Your phone number (required)
        </label>
        <input
          type="tel"
          className="mt-1 border p-2 w-full rounded"
          value={phonenumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPhonenumber(e.target.value)
          }
          placeholder="e.g. +2348012345678"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>

      {status.message && (
        <p
          className={`text-sm mt-2 text-center ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
