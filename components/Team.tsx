/* eslint-disable @next/next/no-img-element */
"use client";
import { JSX } from "react";
import { useState, useEffect } from "react";
import { TeamMember } from "@/app/admin-dashboard/page";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Github, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function getMemberStack(position: string = ""): string[] {
  const pos = position.toLowerCase();
  if (pos.includes("frontend") || pos.includes("react") || pos.includes("web") || pos.includes("ui") || pos.includes("design")) {
    return ["React", "Next.js", "Tailwind CSS", "TypeScript"];
  }
  if (pos.includes("backend") || pos.includes("full") || pos.includes("node") || pos.includes("database") || pos.includes("engineer")) {
    return ["Node.js", "Express", "Prisma", "PostgreSQL"];
  }
  if (pos.includes("mobile") || pos.includes("app") || pos.includes("flutter") || pos.includes("ios") || pos.includes("android")) {
    return ["Flutter", "React Native", "Dart", "Firebase"];
  }
  if (pos.includes("devops") || pos.includes("cloud") || pos.includes("infra") || pos.includes("security")) {
    return ["AWS", "Docker", "CI/CD", "Kubernetes"];
  }
  return ["Product Dev", "Agile", "API Dev"];
}

export default function Team(): JSX.Element {
  const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getTeams() {
    try {
      setLoading(true);
      const response = await axios.get<TeamMember[]>("/api/users/get-team");
      if (response.status === 200) setTeamMembers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <section
      id="team"
      className="pb-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Meet the{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dream Team
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto">
            Talented developers, designers, and strategists working together to build exceptional digital experiences.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden border border-slate-200">
                <Skeleton className="h-64 w-full" />
                <CardContent className="pt-6 space-y-3">
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Team Grid */}
        {!loading && teamMembers && teamMembers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => {
              const skills = member.stack && member.stack.length > 0 ? member.stack : getMemberStack(member.position || "");
              return (
                <Card
                  key={member.id}
                  className="group overflow-hidden border border-slate-200 hover:border-blue-400/80 transition-all duration-300 hover:shadow-xl bg-white flex flex-col h-full"
                >
                  {/* Circular Avatar Container */}
                  <div className="pt-8 pb-3 flex justify-center bg-gradient-to-b from-slate-50 to-white relative shrink-0">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-lg group-hover:border-blue-100/50 transition-all duration-300 shrink-0">
                      <img
                        src={
                          member?.image
                            ? member.image
                            : "https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(member.name || "")
                        }
                        alt={member.name || "Team Member"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-5 pt-1 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-center">
                      <div>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mt-0.5">
                          {member.position}
                        </p>
                      </div>

                      {member.about ? (
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {member.about}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          Passionate builder of next-generation digital products.
                        </p>
                      )}
                    </div>

                    {/* Skills & Socials footer */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider text-center mb-1.5">Core Tech Stack</p>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-[9px] font-medium bg-slate-100 text-slate-600 border border-slate-200/40"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Social Links Row */}
                      {(member.linkedInUrl || member.twitterUrl || member.githubUrl) && (
                        <div className="flex justify-center gap-1.5 pt-1 border-t border-slate-100/60">
                          {member.linkedInUrl && member.linkedInUrl.startsWith("http") && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-7 h-7 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                              asChild
                            >
                              <a href={member.linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                          )}
                          {member.twitterUrl && member.twitterUrl.startsWith("http") && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-7 h-7 rounded-full hover:bg-sky-50 text-slate-400 hover:text-sky-500 transition-colors"
                              asChild
                            >
                              <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <Twitter className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                          )}
                          {member.githubUrl && member.githubUrl.startsWith("http") && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                              asChild
                            >
                              <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && (!teamMembers || teamMembers.length === 0) && (
          <Card className="border-2 border-dashed border-slate-300 bg-slate-50">
            <CardContent className="pt-12 pb-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-200 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No Team Members Yet
                </h3>
                <p className="text-slate-600">
                  Team members will appear here once they&apos;re added
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bottom CTA */}
        {/* {!loading && teamMembers && teamMembers.length > 0 && (
          <div className="mt-16 text-center">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 inline-block">
              <CardContent className="pt-8 pb-8 px-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Want to Join Our Team?
                </h3>
                <p className="text-slate-600 mb-6 max-w-md">
                  We&apos;re always looking for talented individuals to join our
                  growing team
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  asChild
                >
                  <a href="/careers">View Open Positions</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        )} */}
      </div>
    </section>
  );
}
