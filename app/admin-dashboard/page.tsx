/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  FolderOpen,
  FileText,
  Github,
  Linkedin,
  Twitter,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  ExternalLink,
  Calendar,
  User,
  ChevronRight,
} from "lucide-react";
import TeamForm from "@/components/dashboard-component/TeamForm";
import TeamEditForm from "@/components/dashboard-component/TeamEditForm";
import ProjectForm from "@/components/dashboard-component/ProjectForm";
import ProjectEditForm from "@/components/dashboard-component/ProjectEditForm";
import BlogForm from "@/components/dashboard-component/BlogForm";
import BlogEditForm from "@/components/dashboard-component/BlogEditForm";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  repoUrl?: string;
  image?: string;
  stack: string[];
}

export interface BlogPosts {
  id: string;
  title: string;
  content: string;
  img: string;
  date?: string;
  status?: string;
  createdAt: string;
  author?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  githubUrl?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  image?: string;
  about?: string;
  position?: string;
  stack?: string[];
}

interface AdminUser {
  name: string;
  email: string;
  image?: string;
  role?: string;
}

type Tab = "overview" | "projects" | "blog" | "team";

const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderOpen className="w-4 h-4" />,
  },
  { id: "team", label: "Team", icon: <Users className="w-4 h-4" /> },
];

/* ── Empty state ── */
function Empty({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

/* ── Stat card ── */

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPosts | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [projectLoading, setProjectLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [teamLoading, setTeamLoading] = useState(false);

  const router = useRouter();

  /* ── data fetchers ── */
  const getProjects = async () => {
    setProjectLoading(true);
    try {
      const r = await axios.get<Project[]>("/api/projects");
      setProjects(r.data);
    } catch (e) {
      console.error(e);
    } finally {
      setProjectLoading(false);
    }
  };
  const getBlogPosts = async () => {
    setPostLoading(true);
    try {
      const r = await axios.get<BlogPosts[]>("/api/posts");
      setBlogPosts(r.data);
    } catch (e) {
      console.error(e);
    } finally {
      setPostLoading(false);
    }
  };
  const getTeams = async () => {
    setTeamLoading(true);
    try {
      const r = await axios.get<TeamMember[]>("/api/users/get-team");
      setTeamMembers(r.data);
    } catch (e) {
      console.error(e);
    } finally {
      setTeamLoading(false);
    }
  };

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data?.user) setAdminUser(data.user as AdminUser);
    });
    getProjects();
    getBlogPosts();
    getTeams();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/") },
    });
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setProjectLoading(true);
    try {
      await axios.delete(`/api/projects?projectId=${id}`);
      toast.success("Project deleted");
      getProjects();
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setProjectLoading(false);
    }
  };
  const deleteBlogPost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    setPostLoading(true);
    try {
      await axios.delete(`/api/post?postId=${id}`);
      toast.success("Post deleted");
      getBlogPosts();
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setPostLoading(false);
    }
  };
  const deleteTeamMember = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    setTeamLoading(true);
    try {
      await axios.delete(`/api/users?teamId=${id}`);
      toast.success("Member removed");
      getTeams();
    } catch {
      toast.error("Failed to remove member");
    } finally {
      setTeamLoading(false);
    }
  };

  /* ── sidebar content ── */
  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`${mobile ? "w-full" : "w-60 shrink-0"} flex flex-col h-full`}
    >
      {/* Logo */}
      <div className="px-5 h-16 flex items-center border-b border-slate-100 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            WebvicTech
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === item.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {item.icon}
            {item.label}
            {activeTab === item.id && (
              <ChevronRight className="w-3.5 h-3.5 ml-auto" />
            )}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 pb-4 border-t border-slate-100 pt-4 shrink-0">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 mb-2">
          <img
            src={
              adminUser?.image ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${adminUser?.name}`
            }
            alt="avatar"
            className="w-8 h-8 rounded-full ring-2 ring-white shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {adminUser?.name}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {adminUser?.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Desktop sidebar ── */}
      <div className="hidden lg:flex flex-col w-60 bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col lg:hidden transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 shrink-0">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            WebvicTech
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <Sidebar mobile />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-5 sm:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900 capitalize">
                {activeTab === "overview" ? "Dashboard Overview" : activeTab}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                WebvicTech Admin Panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-5 sm:px-8 py-6 space-y-6">
          {/* ── Overview ── */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Premium Welcome Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
                {/* Decorative glowing gradient blur elements */}
                <div className="absolute right-[-10%] top-[-30%] w-72 h-72 rounded-full bg-blue-500/10 blur-[80px]" />
                <div className="absolute left-[30%] bottom-[-50%] w-80 h-80 rounded-full bg-indigo-500/15 blur-[100px]" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Platform Status: Active
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                      Welcome back, {adminUser?.name || "Administrator"}!
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                      Here is an overview of the WebvicTech platform. Manage
                      your projects, update your team, and track your online
                      presence.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl shrink-0">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                        Current Date
                      </p>
                      <p className="text-xs font-semibold">
                        {new Date().toLocaleDateString(undefined, {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="group bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {projects.length}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Total Projects Showcase
                    </p>
                  </div>
                </div>

                <div className="group bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {teamMembers.length}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Team Members
                    </p>
                  </div>
                </div>

                <div className="group bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">100%</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      API Server Health
                    </p>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Recent Projects */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-slate-900">
                          Recent Projects
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          Your latest work portfolio entries
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("projects")}
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Manage Projects <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {projects.length === 0 ? (
                      <Empty
                        icon={<FolderOpen className="w-6 h-6" />}
                        label="No projects added yet"
                      />
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {projects.slice(0, 4).map((p) => (
                          <div
                            key={p.id}
                            className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors group/row"
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-150">
                                {p.image ? (
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover group-hover/row:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <FolderOpen className="w-5 h-5 text-slate-400" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-800 truncate group-hover/row:text-blue-600 transition-colors">
                                  {p.name}
                                </p>
                                <p className="text-xs text-slate-400 truncate max-w-sm sm:max-w-md">
                                  {p.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="hidden sm:flex gap-1">
                                {p.stack.slice(0, 2).map((s) => (
                                  <Badge
                                    key={s}
                                    variant="secondary"
                                    className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border-none shrink-0"
                                  >
                                    {s}
                                  </Badge>
                                ))}
                              </div>
                              {p.link && (
                                <a
                                  href={p.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="View Project"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Quick Actions & Team Preview */}
                <div className="space-y-6">
                  {/* Quick Actions Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      <button
                        onClick={() => {
                          setEditingProject(null);
                          setProjectDialogOpen(true);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-150 hover:border-blue-500 hover:bg-blue-50/20 text-left text-sm font-semibold text-slate-800 transition-all group"
                      >
                        <span className="flex items-center gap-2.5">
                          <Plus className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                          Add Project
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          setEditingMember(null);
                          setMemberDialogOpen(true);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-150 hover:border-indigo-500 hover:bg-indigo-50/20 text-left text-sm font-semibold text-slate-800 transition-all group"
                      >
                        <span className="flex items-center gap-2.5">
                          <Plus className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                          Add Team Member
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <Link
                        href="/"
                        className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-150 hover:border-slate-400 hover:bg-slate-50 text-left text-sm font-semibold text-slate-800 transition-all group"
                      >
                        <span className="flex items-center gap-2.5">
                          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:scale-110 transition-transform" />
                          View Main Website
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Team Preview Card */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Active Team
                      </h3>
                      <button
                        onClick={() => setActiveTab("team")}
                        className="text-xs text-indigo-600 hover:underline font-semibold"
                      >
                        Manage
                      </button>
                    </div>
                    {teamMembers.length === 0 ? (
                      <Empty
                        icon={<Users className="w-5 h-5 text-slate-400" />}
                        label="No team members"
                      />
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {teamMembers.slice(0, 3).map((member) => (
                          <div
                            key={member.id}
                            className="p-4 flex items-center gap-3"
                          >
                            <Avatar className="w-8 h-8 shrink-0">
                              <AvatarImage
                                src={
                                  member.image ||
                                  `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`
                                }
                              />
                              <AvatarFallback className="text-[10px]">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-800 truncate">
                                {member.name}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">
                                {member.position || "Team Member"}
                              </p>
                            </div>
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                              title="Active"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Projects ── */}
          {activeTab === "projects" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Projects
                  </h2>
                  <p className="text-xs text-slate-500">
                    {projects.length} total
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingProject(null);
                    setProjectDialogOpen(true);
                  }}
                  className="gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </Button>
              </div>

              {projects.length === 0 && !projectLoading ? (
                <Empty
                  icon={<FolderOpen className="w-6 h-6" />}
                  label="No projects yet — add your first one"
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">
                            {project.name}
                          </h3>
                          <div className="flex gap-1 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingProject(project);
                                setProjectDialogOpen(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProject(project.id)}
                              disabled={projectLoading}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        {project.description && (
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {project.stack.map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="text-[10px]"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                          >
                            <ExternalLink className="w-3 h-3" /> View live
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Blog ── */}
          {activeTab === "blog" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Blog Posts
                  </h2>
                  <p className="text-xs text-slate-500">
                    {blogPosts.length} total
                  </p>
                </div>
                <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => setEditingPost(null)}
                      className="gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Plus className="w-4 h-4" /> Add Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingPost ? "Edit Post" : "New Blog Post"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingPost
                          ? "Update post details"
                          : "Write a new blog post"}
                      </DialogDescription>
                    </DialogHeader>
                    {editingPost ? (
                      <BlogEditForm
                        blogPost={editingPost}
                        onClose={() => setEditingPost(null)}
                        onUpdate={() => {
                          setEditingPost(null);
                          getBlogPosts();
                        }}
                      />
                    ) : (
                      <BlogForm
                        onSuccess={() => {
                          setPostDialogOpen(false);
                          getBlogPosts();
                        }}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </div>

              {blogPosts.length === 0 && !postLoading ? (
                <Empty
                  icon={<FileText className="w-6 h-6" />}
                  label="No blog posts yet — write your first one"
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {blogPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      {post.img && (
                        <img
                          src={post.img}
                          alt={post.title}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight">
                            {post.title}
                          </h3>
                          <div className="flex gap-1 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingPost(post);
                                setPostDialogOpen(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteBlogPost(post.id)}
                              disabled={postLoading}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        {post.content && (
                          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                            {post.content}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          {post.author && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </span>
                          )}
                          {post.createdAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Team ── */}
          {activeTab === "team" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Team Members
                  </h2>
                  <p className="text-xs text-slate-500">
                    {teamMembers.length} members
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingMember(null);
                    setMemberDialogOpen(true);
                  }}
                  className="gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Member
                </Button>
              </div>

              {teamMembers.length === 0 && !teamLoading ? (
                <Empty
                  icon={<Users className="w-6 h-6" />}
                  label="No team members yet"
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-11 h-11 shrink-0">
                            <AvatarImage
                              src={
                                member.image ||
                                `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`
                              }
                            />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">
                              {member.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {member.position}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setEditingMember(member);
                              setMemberDialogOpen(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteTeamMember(member.id)}
                            disabled={teamLoading}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {member.about && (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                          {member.about}
                        </p>
                      )}

                      <p className="text-[11px] text-slate-400 mb-3">
                        {member.email}
                      </p>

                      <div className="flex gap-1">
                        {member.linkedInUrl && (
                          <a
                            href={member.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.twitterUrl && (
                          <a
                            href={member.twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-500 transition-colors"
                          >
                            <Twitter className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.githubUrl && (
                          <a
                            href={member.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Global Dialogs for Quick Actions */}
          <Dialog
            open={projectDialogOpen || editingProject !== null}
            onOpenChange={(open) => {
              setProjectDialogOpen(open);
              if (!open) setEditingProject(null);
            }}
          >
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? "Edit Project" : "New Project"}
                </DialogTitle>
                <DialogDescription>
                  {editingProject
                    ? "Update project details"
                    : "Add a new project to your portfolio"}
                </DialogDescription>
              </DialogHeader>
              {editingProject ? (
                <ProjectEditForm
                  project={editingProject}
                  onClose={() => setEditingProject(null)}
                  onUpdate={() => {
                    setEditingProject(null);
                    getProjects();
                  }}
                />
              ) : (
                <ProjectForm
                  onSuccess={() => {
                    setProjectDialogOpen(false);
                    getProjects();
                  }}
                />
              )}
            </DialogContent>
          </Dialog>

          <Dialog
            open={memberDialogOpen || editingMember !== null}
            onOpenChange={(open) => {
              setMemberDialogOpen(open);
              if (!open) setEditingMember(null);
            }}
          >
            <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? "Edit Member" : "Add Team Member"}
                </DialogTitle>
                <DialogDescription>
                  {editingMember
                    ? "Update member details"
                    : "Add a new team member"}
                </DialogDescription>
              </DialogHeader>
              {editingMember ? (
                <TeamEditForm
                  teamMember={editingMember}
                  onClose={() => setEditingMember(null)}
                  onUpdate={() => {
                    setEditingMember(null);
                    getTeams();
                  }}
                />
              ) : (
                <TeamForm
                  onSuccess={() => {
                    setMemberDialogOpen(false);
                    getTeams();
                  }}
                />
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
