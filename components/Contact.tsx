"use client";
import { JSX, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

const contactInfo = [
  { icon: MapPin, label: "Address",       value: "No.7 Adedosu St, Ikeja, Lagos" },
  { icon: Phone,  label: "Phone",         value: "+2349136600887" },
  { icon: Mail,   label: "Email",         value: "o.v.a.webvictech@gmail.com" },
  { icon: Clock,  label: "Working Hours", value: "Mon – Fri, 8:00 AM – 6:00 PM" },
];

export default function Contact(): JSX.Element {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  }

  return (
    <section id="contact" className="bg-white">

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-4">
            Get in touch
          </h2>
          <p className="text-slate-500 text-base max-w-xl leading-relaxed">
            Have a project in mind or just want to say hello? Fill in the form and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left — contact details */}
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">Let&apos;s talk</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Whether you want to discuss a project, ask about our services, or just explore options we&apos;re here.
                </p>
              </div>

              <ul className="space-y-6">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={i}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-sm text-slate-800 font-medium">{item.value}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <p className="text-sm text-slate-500">
                  We typically respond within <span className="text-slate-800 font-medium">24 hours</span> on business days.
                </p>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {status === "sent" ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Message sent!</h4>
                    <p className="text-slate-500 text-sm">Thanks — we&apos;ll get back to you soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Name</label>
                      <input
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                    <input
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      required
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors min-h-[140px] resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
