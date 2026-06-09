"use client";
import { JSX } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  Code2,
  Smartphone,
} from "lucide-react";

/* ─── Mini animated score ring ─── */
function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="-rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="url(#scoreGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        className="transition-all duration-1000"
      />
      <defs>
        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Tiny sparkline bar ─── */
function MiniBar({ heights }: { heights: number[] }) {
  return (
    <div className="flex items-end gap-0.5 h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-sm bg-gradient-to-t from-blue-500 to-indigo-400 opacity-80"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default function Hero(): JSX.Element {
  return (
    <section
      id="home"
      className="relative bg-white overflow-hidden lg:min-h-screen lg:flex lg:items-center"
      style={{ minHeight: "100svh" } as React.CSSProperties}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[380px] h-[380px] bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-32 w-[300px] h-[300px] bg-gradient-to-br from-violet-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-0 right-1/3 w-[240px] h-[240px] bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 pb-10 sm:pt-28 sm:pb-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div className="space-y-5 lg:space-y-6">
           

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight animate-slide-up">
              <span className="text-slate-900">Transform </span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Your Vision{" "}
              </span>
              <span className="text-slate-900">Into Reality</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg animate-fade-in delay-200">
              We design and develop exceptional digital experiences that elevate
              your brand and drive measurable results. From concept to launch,
              we&apos;re with you every step.
            </p>

            <div className="space-y-2.5 animate-fade-in delay-300">
              {[
                "Custom Web & Mobile Applications",
                "Enterprise-Grade Solutions",
                "Scalable Cloud Architecture",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 animate-fade-in delay-400">
              <Button
                size="default"
                className="group px-6 h-11 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold"
                asChild
              >
                <a href="/create-project">
                  Start Your Project
                  <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="default"
                variant="outline"
                className="px-6 h-11 rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 text-sm font-semibold"
                asChild
              >
                <a href="#services">Explore Services</a>
              </Button>
            </div>

            <div className="pt-2 grid grid-cols-3 gap-4 border-t border-slate-100 animate-fade-in delay-500">
              {[
                { value: "50+", label: "Projects" },
                { value: "100%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="pt-4 text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: creative UI mockup ── */}
          <div className="hidden md:block relative h-[540px] animate-fade-in delay-300">

            {/* Soft glow behind everything */}
            <div className="absolute inset-10 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-violet-500/10 rounded-3xl blur-2xl" />

            {/* ── Main card: project dashboard mockup ── */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">

                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="flex-1 mx-3 bg-slate-200 rounded-full h-4 flex items-center px-2">
                    <span className="text-[9px] text-slate-400 font-mono truncate">ovawebvictech.com/dashboard</span>
                  </div>
                  {/* Live dot */}
                  <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <div className="p-4 space-y-3">

                  {/* Score row */}
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="relative shrink-0">
                      <ScoreRing score={94} size={72} />
                      <span className="absolute inset-0 flex items-center justify-center text-base font-black text-blue-700">
                        94
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Performance Score</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Last run 2 min ago</p>
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                        <TrendingUp className="w-3 h-3" />
                        +12 from last week
                      </div>
                    </div>
                    <div className="ml-auto">
                      <MiniBar heights={[40, 55, 45, 70, 60, 80, 94]} />
                    </div>
                  </div>

                  {/* Metric rows */}
                  {[
                    { label: "First Contentful Paint", val: "0.8s", pct: 90, color: "bg-emerald-500" },
                    { label: "Largest Contentful Paint", val: "1.4s", pct: 78, color: "bg-blue-500" },
                    { label: "Total Blocking Time",     val: "60ms", pct: 88, color: "bg-indigo-500" },
                    { label: "Speed Index",             val: "1.2s", pct: 85, color: "bg-violet-500" },
                  ].map((m, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-medium">{m.label}</span>
                        <span className="text-[10px] font-bold text-slate-700">{m.val}</span>
                      </div>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${m.color} rounded-full`}
                          style={{ width: `${m.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Service chips */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {[
                      { icon: <Code2 className="w-3 h-3" />, label: "Web Dev" },
                      { icon: <Smartphone className="w-3 h-3" />, label: "Mobile" },
                      { icon: <Shield className="w-3 h-3" />, label: "Security" },
                      { icon: <Zap className="w-3 h-3" />, label: "APIs" },
                      { icon: <Globe className="w-3 h-3" />, label: "Cloud" },
                    ].map((chip, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-md text-[10px] font-semibold text-slate-600 transition-colors cursor-default"
                      >
                        {chip.icon}
                        {chip.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Floating card: active project ── */}
            <div className="absolute top-6 -left-4 z-20 bg-white rounded-xl shadow-xl border border-slate-200 p-3 w-44 animate-float">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <Code2 className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-800 leading-tight">Active Project</p>
                  <p className="text-[9px] text-slate-400 leading-tight">E-commerce Platform</p>
                </div>
              </div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[72%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              </div>
              <p className="text-[9px] text-slate-400 mt-1">72% complete</p>
            </div>

            {/* ── Floating card: client satisfaction ── */}
            <div className="absolute bottom-12 -right-4 z-20 bg-white rounded-xl shadow-xl border border-slate-200 p-3 w-40 animate-float delay-500">
              <p className="text-[10px] text-slate-400 font-medium mb-1">Client Satisfaction</p>
              <div className="flex items-end gap-0.5 h-10">
                {[60, 75, 65, 85, 80, 90, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-indigo-500 to-violet-400"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="text-[10px] font-bold text-indigo-600 mt-1.5">100% this month ✨</p>
            </div>

            {/* ── Floating badge: tech stack ── */}
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 bg-white rounded-xl shadow-xl border border-slate-200 p-3 animate-float delay-300">
              <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide mb-2">Tech Stack</p>
              <div className="space-y-1.5">
                {[
                  { name: "Next.js", color: "bg-slate-800" },
                  { name: "React",   color: "bg-blue-500" },
                  { name: "Node.js", color: "bg-emerald-500" },
                  { name: "AWS",     color: "bg-orange-500" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${t.color} shrink-0`} />
                    <span className="text-[10px] font-semibold text-slate-700">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        .animate-fade-in  { animation: fade-in  0.7s ease-out both; }
        .animate-slide-up { animation: slide-up 0.7s ease-out both; }
        .animate-float    { animation: float 4s ease-in-out infinite; }
        .delay-200  { animation-delay: 0.2s; }
        .delay-300  { animation-delay: 0.3s; }
        .delay-400  { animation-delay: 0.4s; }
        .delay-500  { animation-delay: 0.5s; }
        .delay-700  { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </section>
  );
}
