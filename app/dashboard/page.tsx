/* eslint-disable @next/next/no-img-element */
"use client";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useState, useEffect } from "react";

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
  metrics: string;
  recommendations: string;
}

interface Subscription {
  id: string;
  planAmount: number;
  startDate: string;
  nextPaymentDate: string;
  planType: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<AnalysisReport | null>(
    null
  );

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: session } = await authClient.getSession();
      const res = await axios.get(
        `/api/users/get-user?userId=${session?.user?.id}`
      );
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Mock data for demonstration
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/sign-out");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      await fetch(`/api/user/reports/${reportId}`, { method: "DELETE" });
      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        return {
          ...prevUser,
          reports: prevUser.reports?.filter((r) => r.id !== reportId) || [],
        };
      });
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleUpgrade = () => {
    window.location.href = "/pricing";
  };

  const handleNewAnalysis = () => {
    window.location.href = "/#analysis";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleUpgrade}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {user?.subscriptions[0].planType === "free"
                  ? "Upgrade to Pro"
                  : "Manage Plan"}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    user?.image ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-slate-600">{user?.email}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Plan
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user?.subscriptions[0]?.planType === "Pro"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user?.subscriptions[0]?.planType === "Pro"
                      ? "Pro"
                      : "Free"}
                  </span>
                </div>

                {user?.subscriptions[0]?.planType === "free" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Reports Used</span>
                      {/* <span className="font-semibold text-slate-900">
                        {user?.reportsUsed} / {user?.reportsLimit}
                      </span> */}
                    </div>
                    {/* <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            (user?.reportsUsed / user?.reportsLimit) * 100
                          }%`,
                        }}
                      />
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total Reports</span>
                  <span className="font-bold text-slate-900">
                    {user?.reports?.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">
                    Avg Performance
                  </span>
                  <span className="font-bold text-slate-900">
                    {user && user?.reports?.length > 0
                      ? Math.round(
                          user.reports.reduce(
                            (acc, r) => acc + r.performance,
                            0
                          ) / user?.reports.length
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Member Since</span>
                  <span className="font-bold text-slate-900">Nov 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm p-6 mb-6 text-white">
              <h2 className="text-xl font-bold mb-2">Ready to analyze?</h2>
              {/* <p className="text-blue-100 mb-4">
                {user?.subscriptions.planType === "free"
                  ? `You have ${
                      user.reportsLimit - user.reportsUsed
                    } analysis remaining on your free plan.`
                  : "Analyze unlimited websites with your Pro plan!"}
              </p> */}
              <button
                onClick={handleNewAnalysis}
                className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
              >
                New Analysis
              </button>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-slate-900">
                  Analysis History
                </h2>
              </div>

              {user?.reports.length === 0 ? (
                <div className="p-12 text-center">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
                  <p className="text-slate-600 mb-4">No analysis reports yet</p>
                  <button
                    onClick={handleNewAnalysis}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Create Your First Report
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {user?.reports.map((report) => (
                    <div
                      key={report.id}
                      className="p-6 hover:bg-gray-50 transition cursor-pointer"
                      // onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1 hover:text-blue-600">
                            {report.url}
                          </h3>
                          {/* <p className="text-sm text-slate-500">
                            {formatDate(report.createdAt)}
                          </p> */}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">
                              {report.performance}%
                            </div>
                            <div
                              className={`text-xs font-semibold ${
                                report.performance >= 90
                                  ? "text-green-600"
                                  : report.performance >= 50
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {report.performance >= 90
                                ? "Excellent"
                                : report.performance >= 50
                                ? "Good"
                                : "Poor"}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteReport(report.id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(report.metrics).map(([key, value]) => (
                          <div
                            key={key}
                            className="text-center p-2 bg-gray-100 rounded"
                          >
                            <div className="text-xs font-semibold text-slate-600 uppercase">
                              {key}
                            </div>
                            <div className="text-sm font-bold text-slate-900">
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  {selectedReport.url}
                </h2>
                <p className="text-sm text-slate-500">
                  {formatDate(selectedReport.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Performance Score */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Performance Score
                </h3>
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-slate-900">
                    {selectedReport.performance}%
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all ${
                          selectedReport.performance >= 90
                            ? "bg-green-600"
                            : selectedReport.performance >= 50
                            ? "bg-yellow-500"
                            : "bg-red-600"
                        }`}
                        style={{ width: `${selectedReport.performance}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">
                  Core Web Vitals
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedReport.metrics).map(
                    ([key, value]) => (
                      <div key={key} className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm font-semibold text-slate-600 uppercase mb-1">
                          {key}
                        </div>
                        <div className="text-2xl font-bold text-slate-900">
                          {value}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
