"use client";
import { JSX, useState } from "react";

type Result = {
  performance: number;
  security: number;
  seo: number;
  accessibility: number;
  issues: { title: string; severity: "high" | "medium" | "low" }[];
};

export default function WebsiteAnalysis(): JSX.Element {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  function simulateAnalysis(target: string): Result {
    // Simple deterministic pseudo-random based on string length
    const seed = target.length;
    const performance = Math.min(95, 60 + ((seed * 7) % 36));
    const security = Math.min(94, 50 + ((seed * 5) % 44));
    const seo = Math.min(98, 65 + ((seed * 3) % 34));
    const accessibility = Math.min(90, 55 + ((seed * 4) % 36));

    const issues = [];
    if (performance < 80)
      issues.push({
        title: "Large images without compression",
        severity: "high" as const,
      });
    if (security < 80)
      issues.push({
        title: "Missing security headers (CSP)",
        severity: "medium" as const,
      });
    if (seo < 85)
      issues.push({
        title: "Missing meta description",
        severity: "low" as const,
      });
    if (accessibility < 80)
      issues.push({
        title: "Insufficient color contrast",
        severity: "medium" as const,
      });
    if (issues.length === 0)
      issues.push({
        title: "No major issues detected",
        severity: "low" as const,
      });

    return { performance, security, seo, accessibility, issues };
  }

  async function handleAnalyze(e?: React.FormEvent) {
    e?.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult(null);
    // mimic network delay
    setTimeout(() => {
      const res = simulateAnalysis(url);
      setResult(res);
      setLoading(false);
    }, 700);
  }

  return (
    <section
      id="analysis"
      className="py-20 bg-gradient-to-br from-sky-50 to-sky-100"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-2">Website Analysis with AI</h2>
          <p className="text-slate-600 mb-6">
            Enter your website URL to get a free comprehensive analysis
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
              className="px-6 py-3 rounded-full bg-blue-800 bg-qwen text-white font-semibold disabled:opacity-50"
            >
              {loading ? (
                "Analyzing..."
              ) : (
                <>
                  <i className="fas fa-search mr-2"></i> Analyze Website
                </>
              )}
            </button>
          </form>

          {result && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">
                Analysis Results for{" "}
                <span className="text-blue-600">{url}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-slate-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold">Performance</div>
                    <div className="text-xl font-bold">
                      {result.performance}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${result.performance}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold">Security</div>
                    <div className="text-xl font-bold">{result.security}%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: `${result.security}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold">SEO</div>
                    <div className="text-xl font-bold">{result.seo}%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${result.seo}%` }}
                    />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold">Accessibility</div>
                    <div className="text-xl font-bold">
                      {result.accessibility}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      style={{ width: `${result.accessibility}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Issues Detected</h4>
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${
                          issue.severity === "high"
                            ? "bg-red-500"
                            : issue.severity === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium">{issue.title}</div>
                        <div className="text-sm text-slate-500">
                          Severity: {issue.severity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="text-blue-600 text-2xl">
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <div>
                    <h4 className="text-blue-800 font-bold">
                      Want to fix these issues automatically?
                    </h4>
                    <p className="text-blue-700">
                      Our AI can automatically resolve these issues for you.
                      Upgrade to a paid plan to get instant fixes.
                    </p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Upgrade to Fix Issues
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
