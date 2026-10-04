/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Briefcase, ExternalLink, Github } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  description?: string;
  image?: string;
  stack: string[];
  link?: string;
  repoUrl?: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    axios.get<Project[]>("/api/projects")
      .then((r) => setProjects(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16">

        {/* ── Page header ── */}
        <div className="border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-12">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-4">Portfolio</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-4">
                All projects
              </h1>
              <p className="text-slate-500 text-base max-w-xl leading-relaxed">
                Every project we&apos;ve built from startups to enterprise. Browse, filter, and explore our full body of work.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-slate-100">
                  <Skeleton className="h-52 w-full" />
                  <div className="p-5 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {!loading && filtered.length > 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {filtered.map((project, idx) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <div className="group bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full">

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/50 transition-colors duration-300" />

                      {/* Index */}
                      <span className="absolute top-3 left-3 text-[10px] font-black text-slate-500 bg-white/90 rounded-md px-2 py-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Action buttons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Live site"
                            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-slate-900 hover:text-white transition-colors">
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 gap-2">
                      <h2 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h2>
                      {project.description && (
                        <p className="text-xs text-slate-500 leading-relaxed">{project.description}</p>
                      )}
                      {project.stack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-100">
                          {project.stack.map((s, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="border border-dashed border-slate-200 rounded-xl py-24 text-center">
              <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-600 mb-1">No projects yet</p>
              <p className="text-xs text-slate-400">Projects will appear here once they&apos;re added.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
