import { JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Smartphone, Cloud, Palette, Shield, Zap } from "lucide-react";

export default function Features(): JSX.Element {
  const services = [
    {
      title: "Web Development",
      icon: <Code2 className="w-8 h-8" />,
      description:
        "Custom web applications built with modern frameworks like React, Next.js, and Vue. Scalable, fast, and SEO-optimized.",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Progressive Web Apps",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="w-8 h-8" />,
      description:
        "Native and cross-platform mobile apps for iOS and Android. Built with React Native, Flutter, and Swift.",
      features: ["iOS & Android", "Cross-Platform", "Native Performance"],
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Cloud Solutions",
      icon: <Cloud className="w-8 h-8" />,
      description:
        "Scalable cloud infrastructure and deployment. AWS, Azure, and Google Cloud expertise for enterprise needs.",
      features: ["Auto-Scaling", "Load Balancing", "DevOps Integration"],
      color: "from-violet-500 to-pink-500",
    },
    {
      title: "UI/UX Design",
      icon: <Palette className="w-8 h-8" />,
      description:
        "Beautiful, intuitive interfaces that users love. From wireframes to high-fidelity prototypes and design systems.",
      features: ["User Research", "Prototyping", "Design Systems"],
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Security & Performance",
      icon: <Shield className="w-8 h-8" />,
      description:
        "Enterprise-grade security audits and performance optimization. Keep your applications secure and lightning-fast.",
      features: ["Security Audits", "Performance Testing", "Code Reviews"],
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "API Development",
      icon: <Zap className="w-8 h-8" />,
      description:
        "Robust RESTful and GraphQL APIs. Microservices architecture for scalable backend systems.",
      features: ["REST APIs", "GraphQL", "Microservices"],
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="px-4 py-2">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              Our Services
            </span>
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            What We{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Build
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From concept to deployment, we deliver end-to-end solutions that
            transform your business and engage your users
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden border-2 hover:border-slate-300 transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <CardHeader className="relative">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>

                <CardTitle className="text-2xl font-bold text-slate-900">
                  {service.title}
                </CardTitle>

                <CardDescription className="text-base text-slate-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs font-medium bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Hover arrow indicator */}
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6 text-lg">
            Need something custom? We&apos;ve got you covered.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/create-website"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start a Project
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
