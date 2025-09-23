"use client";
import { JSX, useState } from "react";
import axios from "axios";

type ApiResponse = {
  url: string;
  performance: number;
  metrics: {
    fcp: string;
    lcp: string;
    tbt: string;
    cls: string;
    si: string;
  };
  recommendations: {
    title: string;
    description: string;
    savings: string;
  }[];
};

export default function WebsiteAnalysis(): JSX.Element {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  async function handleAnalyze(e?: React.FormEvent) {
    e?.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.get<ApiResponse>("/api/web-performance", {
        params: { websiteUrl: url },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Error fetching analysis", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="analysis"
      className="py-20 bg-gradient-to-br from-sky-50 to-sky-100"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-2">Website Analysis</h2>
          <p className="text-slate-600 mb-6">
            Enter your website URL to get a free performance analysis
          </p>

          <form
            className="flex gap-3 flex-col md:flex-row"
            onSubmit={handleAnalyze}
          >
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              placeholder="https://yourwebsite.com"
              className="flex-1 p-3 rounded-full border border-slate-200 focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-full bg-blue-800 text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Website"}
            </button>
          </form>

          {result && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">
                Analysis Results for{" "}
                <span className="text-blue-600">{result.url}</span>
              </h3>

              {/* Performance Score */}
              <div className="p-4 rounded-lg bg-slate-50 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">Performance</div>
                  <div className="text-xl font-bold">{result.performance}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      result.performance >= 90
                        ? "bg-green-600"
                        : result.performance >= 50
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                    style={{ width: `${result.performance}%` }}
                  />
                </div>
              </div>

              {/* Core Web Vitals */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {Object.entries(result.metrics).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 rounded-lg bg-slate-50 text-center"
                  >
                    <div className="font-semibold uppercase">{key}</div>
                    <div className="text-lg font-bold">{value}</div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Recommendations</h4>
                <ul className="list-disc list-inside space-y-2">
                  {result.recommendations.length > 0 ? (
                    result.recommendations.map((rec, idx) => (
                      <li key={idx}>
                        <div className="font-medium">{rec.title}</div>
                        <div className="text-sm text-slate-500">
                          {rec.description} —{" "}
                          <span className="text-blue-600">{rec.savings}</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No major recommendations 🎉</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
