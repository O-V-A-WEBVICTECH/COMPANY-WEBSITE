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
        <div className="text-center mb-5 md:mb-16 space-y-4">
          {/* <Badge variant="secondary" className="px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              Our Team
            </span>
          </Badge> */}

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Meet the{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dream Team
            </span>
          </h2>

          <p className="text-sm text-slate-600 max-w-3xl mx-auto">
            Talented developers, designers, and strategists working together to
            build exceptional digital experiences
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
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
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="group overflow-hidden border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-xl bg-white"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                  <img
                    src={
                      member?.image
                        ? `${member.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
                        : "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                          member.name
                    }
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Social Links - Show on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-lg"
                      asChild
                    >
                      <a href="#" aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-lg"
                      asChild
                    >
                      <a href="#" aria-label="Twitter">
                        <Twitter className="w-4 h-4 text-sky-500" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-lg"
                      asChild
                    >
                      <a href="#" aria-label="GitHub">
                        <Github className="w-4 h-4 text-slate-700" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="pt-3 text-center space-y-3">
                  <div>
                    <h3 className="font-bold text-base md:text-xl text-slate-900 mb-1">
                      {member.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200"
                    >
                      {member.position}
                    </Badge>
                  </div>

                  {member.about && (
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {member.about}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
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
