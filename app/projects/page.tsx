/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Briefcase,
  ExternalLink,
  Github,
  Search,
  X,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  const [search, setSearch]     = useState("");
  const [activeStack, setActiveStack] = useState<string>("All");

  useEffect(() => {
    axios
      .get<Project[]>("/api/projects")
      .then((r) => setProjects(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Build unique stack tags from all projects
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.stack))
  ).sort();

  const filtered = projects.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesStack =
      activeStack === "All" || p.stack.includes(activeStack);
    return matchesSearch && matchesStack;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-16">

        {/* Page hero */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to home
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge variant="secondary" className="mb-3 px-3 py-1">
                  <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold text-xs">
                    Portfolio
                  </span>
                </Badge>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                  All{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Projects
                  </span>
                </h1>
                <p className="text-sm text-slate-500 mt-2 max-w-xl">
                  Every project we&apos;ve built — from startups to enterprise.
                  Browse, filter, and explore our full body of work.
                </p>
              </div>
              {!loading && (
                <p className="text-sm font-semibold text-slate-400 shrink-0">
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "project" : "projects"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8">

          {/* Search + filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects…"
                className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Stack filter chips */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveStack("All")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeStack === "All"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  All
                </button>
                {allTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveStack(tag === activeStack ? "All" : tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeStack === tag
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-52 w-full" />
                  <CardContent className="pt-5 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-xl bg-white"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                      src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
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

                  <CardContent className="pt-5 space-y-3">
                    <div>
                      <h2 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h2>
                      {project.description && (
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      )}
                    </div>
                    {project.stack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveStack(s)}
                            className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-14 h-14 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                <Briefcase className="w-7 h-7 text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                {search || activeStack !== "All" ? "No matches found" : "No projects yet"}
              </p>
              <p className="text-xs text-slate-400 mb-4">
                {search || activeStack !== "All"
                  ? "Try adjusting your search or filter."
                  : "Projects will appear here once they're added."}
              </p>
              {(search || activeStack !== "All") && (
                <button
                  onClick={() => { setSearch(""); setActiveStack("All"); }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
