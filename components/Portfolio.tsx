/* eslint-disable @next/next/no-img-element */
"use client";
import { JSX, useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, Briefcase, ExternalLink, Github } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  description?: string;
  image?: string;
  stack: string[];
  link?: string;
  repoUrl?: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Portfolio(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Project[]>("/api/projects")
      .then((r) => setProjects(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featured = projects.slice(0, 3);

  return (
    <section id="portfolio" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-blue-600 text-sm font-semibold tracking-wide uppercase mb-3">Our Work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-3">
            Featured projects
          </h2>
          <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
            A selection of recent work — see how we&apos;ve helped businesses transform their digital presence.
          </p>
        </motion.div>

        <div className="border-t border-slate-200 mb-14" />

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-white border border-slate-100">
                <Skeleton className="h-52 w-full" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && featured.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {featured.map((project, idx) => (
              <motion.div key={project.id} variants={cardVariants}>
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

                    {/* Action buttons on hover */}
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
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-xs text-slate-500 leading-relaxed">{project.description}</p>
                    )}
                    {project.stack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-100">
                        {project.stack.slice(0, 4).map((s, i) => (
                          <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
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

        {/* Empty */}
        {!loading && featured.length === 0 && (
          <div className="border border-dashed border-slate-200 rounded-xl py-20 text-center">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-400">Projects will appear here once they&apos;re added.</p>
          </div>
        )}

        {/* CTA */}
        {!loading && (
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            {projects.length > 0 && (
              <p className="text-sm text-slate-400">{projects.length}+ projects in our portfolio</p>
            )}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors group"
            >
              See All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
