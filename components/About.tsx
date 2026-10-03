/* eslint-disable @next/next/no-img-element */
"use client";
import { JSX, useRef, useEffect } from "react";
import { Users, Award, Code2, Rocket, Heart, ArrowRight, CheckCircle2, Target, Eye } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, target]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function About(): JSX.Element {
  const stats = [
    { value: "150+", label: "Projects Delivered", icon: <Rocket className="w-4 h-4" /> },
    { value: "50+",  label: "Happy Clients",       icon: <Users  className="w-4 h-4" /> },
    { value: "100%", label: "Satisfaction Rate",   icon: <Award  className="w-4 h-4" /> },
    { value: "5+",   label: "Years Experience",    icon: <Code2  className="w-4 h-4" /> },
  ];

  const values = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: "Quality First",
      description: "We never compromise on code quality, design, or user experience.",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Client-Centric",
      description: "Your success is our success. We're partners in your digital journey.",
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Innovation Driven",
      description: "We stay ahead with the latest technologies and best practices.",
    },
  ];

  const highlights = [
    "Nigeria's #1 rated software agency",
    "End-to-end product delivery",
    "Dedicated post-launch support",
    "Agile, transparent process",
  ];

  return (
    <section id="about" className="relative overflow-hidden">

      {/* ── WHO WE ARE — dark ── */}
      <div className="relative bg-slate-950 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-5">
                <p className="text-blue-400 text-sm font-semibold tracking-wide uppercase">Who We Are</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
                  We don&apos;t just build software.
                  <br />
                  <span className="text-blue-400">We build futures.</span>
                </h2>
                <p className="text-slate-400 text-base leading-relaxed max-w-lg">
                  O.V.A WebvicTech INT&apos; SERVICE LIMITED is Nigeria&apos;s most trusted tech agency — turning ambitious ideas into scalable, production-ready digital products that drive real growth.
                </p>
              </div>

              <ul className="space-y-3">
                {highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 text-sm text-slate-300"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    {h}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="/create-project"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start a Project <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-slate-300 text-sm font-semibold hover:bg-white/5 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Our Team at Work"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium text-white/80">Active across Lagos, Abuja & beyond</span>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -top-4 -right-4 bg-slate-900 border border-white/10 rounded-xl p-4 w-44 shadow-xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                    <Target className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white">Mission</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Empowering businesses with software that accelerates growth.
                </p>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-slate-900 border border-white/10 rounded-xl p-4 w-44 shadow-xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                    <Eye className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white">Vision</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  The most trusted digital product studio, globally.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── STATS — white ── */}
      <div className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {stats.map((stat, idx) => {
              const match = stat.value.match(/^(\d+)(.*)$/);
              const num = match ? parseInt(match[1]) : 0;
              const suffix = match ? match[2] : stat.value;
              return (
                <motion.div
                  key={idx}
                  className="px-8 py-4 first:pl-0 last:pr-0 flex flex-col gap-1"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                >
                  <span className="text-4xl md:text-5xl font-black text-slate-900 tabular-nums">
                    <CountUp target={num} suffix={suffix} />
                  </span>
                  <span className="text-sm text-slate-400 font-medium">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── PRINCIPLES — slate-50 ── */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-600 text-sm font-semibold tracking-wide uppercase mb-3">Principles</p>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
              The values that guide everything we do.
            </h3>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-slate-100 rounded-xl p-8 group hover:border-blue-100 hover:shadow-sm transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                  {value.icon}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{value.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── CTA — dark ── */}
      <div className="bg-slate-950 text-white border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <div className="space-y-2 max-w-xl">
              <h3 className="text-3xl md:text-4xl font-black text-white">
                Ready to build something amazing?
              </h3>
              <p className="text-slate-400 text-sm">
                Let&apos;s discuss your project and bring your vision to life with the right team behind you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <motion.a
                href="/create-project"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-slate-300 text-sm font-semibold hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
