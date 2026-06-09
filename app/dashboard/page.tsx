/* eslint-disable @next/next/no-img-element */
"use client";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  Globe,
  LogOut,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  Eye,
  Trash2,
  Plus,
  Activity,
  ChevronRight,
  Gauge,
  Crown,
} from "lucide-react";

interface AnalysisReport {
  id: string;
  url: string;
  performance: number;
  createdAt: string;
  metrics: {
    fcp: string;
    lcp: string;
    tbt: string;
    cls: string;
    si: string;
  };
}

interface UserData {
  name: string;
  email: string;
  image: string;
  subscriptions: Subscription[];
  reports: Report[];
}

interface Report {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  url: string;
  performance: number;
  metrics: Record<string, string>;
  recommendations: string;
}

interface Subscription {
  id: string;
  planAmount: number;
  startDate: string;
  nextPaymentDate: string;
  planType: string;
}

const metricLabels: Record<string, { label: string; icon: React.ReactNode }> = {
  fcp: { label: "First Contentful Paint", icon: <Eye className="w-3.5 h-3.5" /> },
  lcp: { label: "Largest Contentful Paint", icon: <Gauge className="w-3.5 h-3.5" /> },
  tbt: { label: "Total Blocking Time", icon: <Clock className="w-3.5 h-3.5" /> },
  cls: { label: "Cumulative Layout Shift", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  si: { label: "Speed Index", icon: <Zap className="w-3.5 h-3.5" /> },
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
      : score >= 50
      ? "bg-amber-100 text-amber-700 ring-amber-200"
      : "bg-red-100 text-red-700 ring-red-200";
  const label = score >= 90 ? "Excellent" : score >= 50 ? "Good" : "Poor";
  return (
    <span className={`inline-flex flex-col items-center px-3 py-1.5 rounded-lg text-xs font-semibold ring-1 ${color}`}>
      <span className="text-base font-bold leading-tight">{score}</span>
      <span className="leading-tight">{label}</span>
    </span>
  );
}

function ScoreBar({ score }: { score: number }) {
  const gradient =
    score >= 90
      ? "from-emerald-500 to-teal-500"
      : score >= 50
      ? "from-amber-400 to-orange-400"
      : "from-red-500 to-rose-500";
  return (
    <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradient} rounded-full transition-all duration-700`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<AnalysisReport | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: session } = await authClient.getSession();
      const res = await axios.get(`/api/users/get-user?userId=${session?.user?.id}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm("Delete this report?")) return;
    setDeletingId(reportId);
    try {
      await fetch(`/api/user/reports/${reportId}`, { method: "DELETE" });
      setUser((prev) =>
        prev ? { ...prev, reports: prev.reports.filter((r) => r.id !== reportId) } : prev
      );
      if (selectedReport?.id === reportId) setSelectedReport(null);
    } catch (error) {
      console.error("Error deleting report:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const isPro = user?.subscriptions?.[0]?.planType === "Pro";
  const avgPerformance =
    user?.reports?.length
      ? Math.round(user.reports.reduce((acc, r) => acc + r.performance, 0) / user.reports.length)
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Top Nav */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">O.V.A</span>
              <span className="text-slate-800 ml-1">WebvicTech</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {!isPro && (
              <Link
                href="/pricing"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Crown className="w-3.5 h-3.5" />
                Upgrade to Pro
              </Link>
            )}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
              <img
                src={user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                alt="avatar"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-xs font-medium text-slate-700 max-w-[120px] truncate">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200 hover:border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 py-6 space-y-6">

        {/* Welcome row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Welcome back, {user?.name?.split(" ")[0] || "there"} 👋
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">Here&apos;s an overview of your performance reports.</p>
          </div>
          <Link
            href="/#analysis"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            New Analysis
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Reports",
              value: user?.reports?.length ?? 0,
              icon: <BarChart3 className="w-5 h-5" />,
              color: "from-blue-500 to-blue-600",
              bg: "bg-blue-50",
              text: "text-blue-600",
            },
            {
              label: "Avg Performance",
              value: `${avgPerformance}%`,
              icon: <TrendingUp className="w-5 h-5" />,
              color: "from-indigo-500 to-indigo-600",
              bg: "bg-indigo-50",
              text: "text-indigo-600",
            },
            {
              label: "Current Plan",
              value: isPro ? "Pro" : "Free",
              icon: <Crown className="w-5 h-5" />,
              color: isPro ? "from-amber-400 to-orange-500" : "from-slate-400 to-slate-500",
              bg: isPro ? "bg-amber-50" : "bg-slate-50",
              text: isPro ? "text-amber-600" : "text-slate-500",
            },
            {
              label: "Sites Tracked",
              value: new Set(user?.reports?.map((r) => r.url)).size,
              icon: <Globe className="w-5 h-5" />,
              color: "from-violet-500 to-purple-600",
              bg: "bg-violet-50",
              text: "text-violet-600",
            },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
              <div className={`${card.bg} ${card.text} p-2 rounded-lg shrink-0`}>
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 font-medium truncate">{card.label}</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Reports list — takes 2 cols */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Analysis History
                </h2>
                <span className="text-xs text-slate-400 font-medium">{user?.reports?.length ?? 0} reports</span>
              </div>

              {!user?.reports?.length ? (
                <div className="px-5 py-16 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-slate-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">No reports yet</p>
                  <p className="text-xs text-slate-400">Run your first website analysis to see results here.</p>
                  <Link
                    href="/#analysis"
                    className="inline-flex items-center gap-1.5 mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Create First Report
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {user.reports.map((report) => (
                    <div
                      key={report.id}
                      className={`px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer group ${
                        selectedReport?.id === report.id ? "bg-blue-50/50" : ""
                      }`}
                      onClick={() => setSelectedReport(report as unknown as AnalysisReport)}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <div className="mt-0.5 w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                            <Globe className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                              {report.url}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                              <ChevronRight className="w-3 h-3" />
                              Click to view details
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <ScoreBadge score={report.performance} />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteReport(report.id);
                            }}
                            disabled={deletingId === report.id}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Delete report"
                          >
                            {deletingId === report.id ? (
                              <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Score bar */}
                      <ScoreBar score={report.performance} />

                      {/* Metric chips */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {Object.entries(report.metrics).map(([key, value]) => (
                          <span
                            key={key}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-medium"
                          >
                            <span className="uppercase font-semibold text-slate-400">{key}</span>
                            <span>{value}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar — profile + detail panel */}
          <div className="space-y-4">

            {/* Profile card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-xl ring-2 ring-slate-100"
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Plan</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    isPro ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                  }`}>
                    {isPro && <Crown className="w-3 h-3" />}
                    {isPro ? "Pro" : "Free"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Reports</span>
                  <span className="text-xs font-semibold text-slate-700">{user?.reports?.length ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Avg Score</span>
                  <span className={`text-xs font-semibold ${
                    avgPerformance >= 90 ? "text-emerald-600" : avgPerformance >= 50 ? "text-amber-600" : "text-red-600"
                  }`}>{avgPerformance}%</span>
                </div>
              </div>

              {!isPro && (
                <Link
                  href="/pricing"
                  className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm"
                >
                  <Crown className="w-3.5 h-3.5" />
                  Upgrade to Pro
                </Link>
              )}
            </div>

            {/* Report detail panel */}
            {selectedReport ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    Report Detail
                  </h3>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">URL</p>
                    <p className="text-sm font-semibold text-slate-800 break-all">{selectedReport.url}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-2">Performance Score</p>
                    <div className="flex items-center gap-3">
                      <span className={`text-3xl font-black ${
                        selectedReport.performance >= 90
                          ? "text-emerald-600"
                          : selectedReport.performance >= 50
                          ? "text-amber-500"
                          : "text-red-600"
                      }`}>
                        {selectedReport.performance}
                      </span>
                      <div className="flex-1">
                        <ScoreBar score={selectedReport.performance} />
                        <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-2">Core Web Vitals</p>
                    <div className="space-y-2">
                      {Object.entries(selectedReport.metrics).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2 text-slate-600">
                            {metricLabels[key]?.icon}
                            <span className="text-xs font-medium">{metricLabels[key]?.label || key.toUpperCase()}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Quick tips card when no report selected */
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Quick Tips
                </h3>
                <div className="space-y-2.5">
                  {[
                    { icon: <Zap className="w-3.5 h-3.5 text-amber-500" />, tip: "Aim for a performance score above 90" },
                    { icon: <Globe className="w-3.5 h-3.5 text-blue-500" />, tip: "Track multiple sites to compare" },
                    { icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />, tip: "Click any report to see full details" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0">{item.icon}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
