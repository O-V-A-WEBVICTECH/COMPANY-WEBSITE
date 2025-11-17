/* eslint-disable @next/next/no-img-element */
"use client";
import { JSX } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  Github,
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function Portfolio(): JSX.Element {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Web Apps", "Mobile Apps", "E-commerce", "SaaS"];

  async function getProjects() {
    try {
      setLoading(true);
      const response = await axios.get<Project[]>(
        "/api/projects/get-portfolio"
      );
      if (response.status === 200) setProjects(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  const filteredProjects = projects?.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="portfolio" className="pb-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 space-y-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Briefcase className="w-4 h-4 mr-2" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              Our Work
            </span>
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our latest work and see how we&apos;ve helped businesses
            transform their digital presence with innovative solutions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  : "hover:border-blue-300 hover:bg-blue-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="pt-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && filteredProjects && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, 6).map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl bg-white"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src={
                      project.image ||
                      `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80`
                    }
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Action Buttons on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.liveUrl && (
                      <Button
                        size="icon"
                        className="w-12 h-12 rounded-full bg-white hover:bg-blue-600 hover:text-white shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                        asChild
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Live Site"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="icon"
                        className="w-12 h-12 rounded-full bg-white hover:bg-slate-800 hover:text-white shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                        asChild
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View on GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Category Badge */}
                  <Badge className="absolute top-4 right-4 bg-white/95 text-blue-700 border-0 shadow-lg">
                    {project.category}
                  </Badge>
                </div>

                {/* Content */}
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && (!filteredProjects || filteredProjects.length === 0) && (
          <Card className="border-2 border-dashed border-slate-300 bg-slate-50">
            <CardContent className="pt-12 pb-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-200 rounded-full flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No Projects Found
                </h3>
                <p className="text-slate-600">
                  {activeCategory === "All"
                    ? "Projects will appear here once they're added"
                    : `No projects found in ${activeCategory} category`}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* View All Button */}
        {!loading && filteredProjects && filteredProjects.length > 0 && (
          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              asChild
            >
              <Link href="/portfolio">
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <p className="mt-4 text-slate-600">
              Explore our complete portfolio of {projects?.length || 0}+
              successful projects
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
