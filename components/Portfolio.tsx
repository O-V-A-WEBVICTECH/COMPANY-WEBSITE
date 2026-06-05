/* eslint-disable @next/next/no-img-element */
"use client";
import { JSX, useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, ExternalLink, Github } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description?: string;
  image?: string;
  stack: string[];
  link?: string;
  repoUrl?: string;
}

export default function Portfolio(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Project[]>("/api/projects")
      .then((r) => setProjects(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featured = projects.slice(0, 3);

  return (
    <section id="portfolio" className="pb-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="text-center mb-12 space-y-3">
         
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            A selection of recent work — see how we&apos;ve helped businesses
            transform their digital presence.
          </p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-52 w-full" />
                <CardContent className="pt-5 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Featured grid — max 3 */}
        {!loading && featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-xl bg-white"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Hover action buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View live site"
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="pt-5 space-y-3">
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  {project.stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((s, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 border-blue-100 text-xs"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && featured.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Projects will appear here once they&apos;re added.</p>
          </div>
        )}

        {/* View all CTA — always visible */}
        {!loading && (
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all group"
            >
              See All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            {projects.length > 0 && (
              <p className="mt-3 text-xs text-slate-400">
                {projects.length}+ projects in our portfolio
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
