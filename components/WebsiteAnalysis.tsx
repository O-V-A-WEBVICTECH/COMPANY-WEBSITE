"use client";
import { JSX, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Search,
  Zap,
  TrendingUp,
  Clock,
  Eye,
  Gauge,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

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
  error?: {
    error: string;
  };
  recommendations: {
    title: string;
    description: string;
    savings: string;
  }[];
};

const metricInfo: Record<string, { label: string; icon: JSX.Element }> = {
  fcp: { label: "First Contentful Paint", icon: <Eye className="w-4 h-4" /> },
  lcp: {
    label: "Largest Contentful Paint",
    icon: <Gauge className="w-4 h-4" />,
  },
  tbt: { label: "Total Blocking Time", icon: <Clock className="w-4 h-4" /> },
  cls: {
    label: "Cumulative Layout Shift",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  si: { label: "Speed Index", icon: <Zap className="w-4 h-4" /> },
};

export default function WebsiteAnalysis(): JSX.Element {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const router = useRouter();

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult(null);
    setShowUpgradePrompt(false);

    try {
      const { data: session } = await authClient.getSession();
      if (!session) {
        alert("You need to be logged in");
        return router.push("/login");
      }

      const res = await axios.get("/api/web-performance", {
        params: { websiteUrl: url },
        withCredentials: true,
      });

      setResult(res.data);
      console.log(session);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error;

        if (
          errorMessage === "Free tier limited to one report. Upgrade for more."
        ) {
          setShowUpgradePrompt(true);
        } else {
          toast.error(errorMessage || "An error occurred during analysis");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleUpgradeClick = () => {
    router.push("/pricing");
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-green-500 to-emerald-500";
    if (score >= 50) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  return (
    <section
      id="analysis"
      className="bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              Performance Analysis
            </span>
          </Badge>

          <h2 className="text-3xl lg:text-4xl md:text-5xl font-bold text-slate-900">
            Analyze Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Website
            </span>
          </h2>

          <p className="text-base lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Get instant insights into your website&apos;s performance, speed,
            and user experience
          </p>
        </div>

        {/* Analysis Card */}
        <Card className="shadow-xl border-2 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl lg:text-2xl">
              <Search className="w-6 h-6  text-blue-600" />
              Website Analysis Tool
            </CardTitle>
            <CardDescription className="text-sm lg:text-base">
              Enter your website URL to receive a comprehensive performance
              report
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Input Form */}
            <form
              onSubmit={handleAnalyze}
              className="flex gap-3 flex-col sm:flex-row"
            >
              <div className="flex-1 relative">
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  type="url"
                  placeholder="https://yourwebsite.com"
                  className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-base"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="px-8 py-4 h-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyze Website
                  </>
                )}
              </Button>
            </form>

            {/* Upgrade Prompt */}
            {showUpgradePrompt && (
              <Alert className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <Zap className="h-5 w-5 text-blue-600" />
                <AlertDescription className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      You&apos;ve reached your free analysis limit
                    </h3>
                    <p className="text-slate-700">
                      Unlock unlimited website analyses, detailed insights, and
                      advanced optimization recommendations with our premium
                      plan.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleUpgradeClick}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Upgrade Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowUpgradePrompt(false)}
                    >
                      Maybe Later
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Results */}
            {result && (
              <div className="space-y-6 animate-fade-in">
                {/* Header with URL */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-600 font-medium">
                      Analysis complete for
                    </p>
                    <p className="text-lg font-semibold text-slate-900 truncate">
                      {result.url}
                    </p>
                  </div>
                </div>

                {/* Performance Score */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Gauge className="w-5 h-5" />
                        Overall Performance
                      </span>
                      <span
                        className={`text-4xl font-bold ${getScoreColor(
                          result.performance
                        )}`}
                      >
                        {result.performance}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getScoreGradient(
                          result.performance
                        )} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${result.performance}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
                      <span>Poor</span>
                      <span>Average</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Core Web Vitals */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Core Web Vitals
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.entries(result.metrics).map(([key, value]) => (
                      <Card
                        key={key}
                        className="border-2 hover:border-blue-300 transition-colors"
                      >
                        <CardContent className="pt-6 text-center space-y-2">
                          <div className="flex justify-center text-blue-600">
                            {metricInfo[key]?.icon}
                          </div>
                          <div className="text-sm font-medium text-slate-600 uppercase">
                            {key}
                          </div>
                          <div className="text-2xl font-bold text-slate-900">
                            {value}
                          </div>
                          <div className="text-xs text-slate-500">
                            {metricInfo[key]?.label}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      Optimization Recommendations
                    </CardTitle>
                    <CardDescription>
                      Actionable insights to improve your website&apos;s
                      performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {result.recommendations.length > 0 ? (
                      <div className="space-y-4">
                        {result.recommendations.map((rec, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-lg border-2 border-slate-200 hover:border-blue-300 transition-colors space-y-2"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <h4 className="font-semibold text-slate-900">
                                {rec.title}
                              </h4>
                              <Badge
                                variant="secondary"
                                className="flex-shrink-0"
                              >
                                {rec.savings}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {rec.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 space-y-2">
                        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                        <p className="text-lg font-semibold text-slate-900">
                          Excellent! No major issues found
                        </p>
                        <p className="text-slate-600">
                          Your website is performing optimally
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Cards */}
        {!result && !loading && (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Analysis",
                description:
                  "Get results in seconds with our advanced performance testing",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Detailed Metrics",
                description:
                  "Core Web Vitals and comprehensive performance indicators",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Actionable Insights",
                description:
                  "Clear recommendations to improve your website's speed",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="border-2 hover:border-blue-300 transition-colors"
              >
                <CardContent className="pt-6 space-y-3 text-center">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
