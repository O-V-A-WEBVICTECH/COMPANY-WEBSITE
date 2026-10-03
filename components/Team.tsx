/* eslint-disable @next/next/no-img-element */
"use client";
import { JSX, useState, useEffect } from "react";
import { TeamMember } from "@/app/admin-dashboard/page";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Github, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

function getMemberStack(position: string = ""): string[] {
  const pos = position.toLowerCase();
  if (pos.includes("frontend") || pos.includes("react") || pos.includes("web") || pos.includes("ui") || pos.includes("design"))
    return ["React", "Next.js", "Tailwind", "TypeScript"];
  if (pos.includes("backend") || pos.includes("full") || pos.includes("node") || pos.includes("database") || pos.includes("engineer"))
    return ["Node.js", "Express", "Prisma", "PostgreSQL"];
  if (pos.includes("mobile") || pos.includes("app") || pos.includes("flutter") || pos.includes("ios") || pos.includes("android"))
    return ["Flutter", "React Native", "Dart", "Firebase"];
  if (pos.includes("devops") || pos.includes("cloud") || pos.includes("infra") || pos.includes("security"))
    return ["AWS", "Docker", "CI/CD", "Kubernetes"];
  return ["Product Dev", "Agile", "API Dev"];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Team(): JSX.Element {
  const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios.get<TeamMember[]>("/api/users/get-team")
      .then((r) => { if (r.status === 200) setTeamMembers(r.data); })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="team" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-blue-600 text-sm font-semibold tracking-wide uppercase mb-3">Our People</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-3">
            Meet the team
          </h2>
          <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
            Developers, designers, and strategists building exceptional digital products together.
          </p>
        </motion.div>

        <div className="border-t border-slate-100 mb-14" />

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden border border-slate-100">
                <Skeleton className="h-60 w-full" />
                <CardContent className="pt-5 space-y-2">
                  <Skeleton className="h-5 w-3/4 mx-auto" />
                  <Skeleton className="h-3 w-1/2 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Team Grid */}
        {!loading && teamMembers && teamMembers.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {teamMembers.map((member) => {
              const skills = member.stack?.length ? member.stack : getMemberStack(member.position || "");
              return (
                <motion.div key={member.id} variants={cardVariants}>
                  <Card className="group overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full">

                    {/* Avatar */}
                    <div className="relative h-56 overflow-hidden bg-slate-50 shrink-0">
                      <img
                        src={
                          member?.image
                            ? member.image
                            : "https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(member.name || "")
                        }
                        alt={member.name || "Team Member"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover overlay with socials */}
                      <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {member.linkedInUrl?.startsWith("http") && (
                          <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 text-white border border-white/20 transition-colors" asChild>
                            <a href={member.linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                          </Button>
                        )}
                        {member.twitterUrl?.startsWith("http") && (
                          <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 text-white border border-white/20 transition-colors" asChild>
                            <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                              <Twitter className="w-3.5 h-3.5" />
                            </a>
                          </Button>
                        )}
                        {member.githubUrl?.startsWith("http") && (
                          <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 text-white border border-white/20 transition-colors" asChild>
                            <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <CardContent className="p-5 flex-1 flex flex-col gap-3">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{member.name}</h3>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-0.5">
                          {member.position}
                        </p>
                      </div>

                      {member.about && (
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{member.about}</p>
                      )}

                      <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                        {skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && (!teamMembers || teamMembers.length === 0) && (
          <motion.div
            className="border border-dashed border-slate-200 rounded-xl py-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-400">Team members will appear here once added.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
}
