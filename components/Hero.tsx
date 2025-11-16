"use client";
import { JSX } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

export default function Hero(): JSX.Element {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Animated Badge */}
            <div className="inline-flex animate-fade-in">
              <Badge
                variant="secondary"
                className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 hover:border-blue-300 transition-colors"
              >
                <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Crafting Digital Excellence
                </span>
              </Badge>
            </div>

            {/* Main Heading with staggered animation */}
            <div className="space-y-6">
              <h1 className="text-5xl  md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                <span className="block text-slate-900 animate-slide-up">
                  Transform
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent animate-slide-up delay-100">
                  Your Vision
                </span>
                <span className="block text-slate-900 animate-slide-up delay-200">
                  Into Reality
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl text-slate-600  leading-normal lg:leading-relaxed max-w-xl animate-fade-in delay-300">
              We design and develop exceptional digital experiences that elevate
              your brand and drive measurable results. From concept to launch,
              we&apos;re with you every step.
            </p>

            {/* Feature list */}
            <div className="space-y-3 animate-fade-in delay-400">
              {[
                "Custom Web & Mobile Applications",
                "Enterprise-Grade Solutions",
                "Scalable Cloud Architecture",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in delay-500">
              <Button
                size="lg"
                className="group text-base px-8 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a href="/create-project">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 h-14 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
                asChild
              >
                <a href="#services">Explore Services</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="pt-12 grid grid-cols-3 gap-8 animate-fade-in delay-600">
              {[
                { value: "50+", label: "Projects" },
                { value: "100%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Enhanced Visual */}
          <div className="relative lg:h-[700px] flex items-center justify-center animate-fade-in delay-300">
            {/* Main container */}
            <div className="relative w-full max-w-xl">
              {/* Rotating gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-20 blur-3xl animate-spin-slow" />

              {/* Logo card with glass morphism */}
              <div className="relative z-10 backdrop-blur-sm bg-white/80 rounded-3xl shadow-2xl p-12 border border-white/20 hover:shadow-3xl transition-shadow duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl" />

                <Image
                  width={500}
                  quality={100}
                  height={500}
                  alt="O.V.A WebvicTech"
                  src={"/ovi-logo.png"}
                  className="w-full h-auto relative z-10"
                  priority
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -top-8 -right-8 z-20 backdrop-blur-md bg-white/90 p-6 rounded-2xl shadow-xl border border-white/50 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">
                      Performance
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      Lightning Fast
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 z-20 backdrop-blur-md bg-white/90 p-6 rounded-2xl shadow-xl border border-white/50 animate-float delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">
                      Security
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      Enterprise Grade
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/4 -left-16 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-1/4 -right-16 w-32 h-32 bg-gradient-to-br from-indigo-400/30 to-transparent rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
