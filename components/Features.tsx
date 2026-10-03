"use client";
import { JSX } from "react";
import { Code2, Smartphone, Cloud, Palette, Shield, Zap, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    icon: Code2,
    description:
      "Custom web applications built with React, Next.js, and Vue. Scalable, fast, and SEO-optimized for real-world performance.",
    features: ["Responsive Design", "SEO Optimization", "Progressive Web Apps"],
    number: "01",
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    description:
      "Native and cross-platform mobile apps for iOS and Android built with React Native and Flutter.",
    features: ["iOS & Android", "Cross-Platform", "Native Performance"],
    number: "02",
  },
  {
    title: "Cloud Solutions",
    icon: Cloud,
    description:
      "Scalable infrastructure on AWS, Azure, and Google Cloud. DevOps, CI/CD and auto-scaling for enterprise workloads.",
    features: ["Auto-Scaling", "Load Balancing", "DevOps Integration"],
    number: "03",
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    description:
      "Interfaces your users will love. From discovery and wireframes through to pixel-perfect, accessible design systems.",
    features: ["User Research", "Prototyping", "Design Systems"],
    number: "04",
  },
  {
    title: "Security & Performance",
    icon: Shield,
    description:
      "Enterprise-grade audits and optimizations to keep your product fast, secure, and production-ready.",
    features: ["Security Audits", "Performance Testing", "Code Reviews"],
    number: "05",
  },
  {
    title: "API Development",
    icon: Zap,
    description:
      "Robust RESTful and GraphQL APIs with microservices architecture built for scale and reliability.",
    features: ["REST APIs", "GraphQL", "Microservices"],
    number: "06",
  },
];

export default function Features(): JSX.Element {
  return (
    <section id="services" aria-label="Services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-4">Services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-4">
            What we do
          </h2>
          <p className="text-slate-500 text-base max-w-xl leading-relaxed">
            We design, build, and scale products that solve real problems — from prototypes to production.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                className="group relative bg-white hover:bg-slate-950 transition-colors duration-300 p-8 flex flex-col gap-6"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Top row: number + icon */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-300 tabular-nums group-hover:text-white/20 transition-colors">{service.number}</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Title + description */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed transition-colors duration-200">
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((f, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 group-hover:bg-white/10 group-hover:text-slate-300 transition-colors duration-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors duration-200 mt-auto"
                >
                  Get started
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-slate-500 text-sm">
            Need something custom?{" "}
            <span className="text-slate-700 font-medium">We&apos;ve got you covered.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.a
              href="/create-project"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start a Project <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
