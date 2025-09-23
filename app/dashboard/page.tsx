/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Calendar,
  User,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import TeamForm from "@/components/dashboard-component/TeamForm";
import TeamEditForm from "@/components/dashboard-component/TeamEditForm";
import ProjectForm from "@/components/dashboard-component/ProjectForm";
import ProjectEditForm from "@/components/dashboard-component/ProjectEditForm";
import BlogForm from "@/components/dashboard-component/BlogForm";
import BlogEditForm from "@/components/dashboard-component/BlogEditForm";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import axios from "axios";

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
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPosts[] | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);
  const [activeTab, setActiveTab] = useState("projects");

  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState<boolean>(false);
  const [memberDialogOpen, setMemberDialogOpen] = useState<boolean>(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPosts | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  async function getProjects() {
    try {
      const response = await axios.get<Project[]>("/api/projects");
      if (response.status === 200) return setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTeams() {
    try {
      const response = await axios.get<TeamMember[]>("/api/users/get-users");
      if (response.status === 200) return setTeamMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBlogPosts() {
    try {
      const response = await axios.get<BlogPosts[]>("/api/posts");
      if (response.status === 200) return setBlogPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "published":
        return "bg-green-100 text-green-800";
      case "in progress":
      case "review":
        return "bg-blue-100 text-blue-800";
      case "planning":
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  useEffect(() => {
    getBlogPosts();
    getProjects();
    getTeams();
  }, []);

  function handleUpdateProject() {
    setEditingProject(null);
    getProjects();
  }

  function handleUpdatePost() {
    setEditingPost(null);
    getBlogPosts();
  }

  function handleUpdateMember() {
    setEditingMember(null);
    getTeams();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header with Logout */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <span className="font-bold text-xl text-foreground">Dashboard</span>
          <Button variant="destructive" onClick={handleSignOut}>
            Logout
          </Button>
        </div>
      </header>
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* <h1 className="text-2xl font-bold text-foreground">Dashboard</h1> */}
            <nav className="flex space-x-4">
              <Button
                variant={activeTab === "projects" ? "default" : "ghost"}
                onClick={() => setActiveTab("projects")}
                className="flex items-center gap-2"
              >
                <FolderOpen className="h-4 w-4" />
                Projects
              </Button>
              <Button
                variant={activeTab === "blog" ? "default" : "ghost"}
                onClick={() => setActiveTab("blog")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Blog
              </Button>
              <Button
                variant={activeTab === "team" ? "default" : "ghost"}
                onClick={() => setActiveTab("team")}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Team
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Projects Section */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">Projects</h2>
              <Dialog
                open={projectDialogOpen || editingProject !== null}
                onOpenChange={(open) => {
                  setProjectDialogOpen(open);
                  if (!open) setEditingProject(null);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => setEditingProject(null)}
                  >
                    <Plus className="h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? "Edit Project" : "Create New Project"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProject
                        ? "Update the project details below"
                        : "Add a new project to your dashboard"}
                    </DialogDescription>
                  </DialogHeader>
                  {editingProject ? (
                    <ProjectEditForm
                      project={editingProject}
                      onClose={() => setEditingProject(null)}
                      onUpdate={handleUpdateProject}
                    />
                  ) : (
                    <ProjectForm
                      onSuccess={() => setProjectDialogOpen(false)}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects?.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project?.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingProject(project);
                            setProjectDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setProjects(
                              projects.filter((p) => p.id !== project.id)
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project?.image && (
                        <img
                          src={project?.image || "/placeholder.svg"}
                          alt={project?.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      {project?.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full bg-transparent"
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project
                          </a>
                        </Button>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {project.stack.map((tech: string) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Blog Section */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">Blog Posts</h2>
              <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => setEditingPost(null)}
                  >
                    <Plus className="h-4 w-4" />
                    Add Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingPost
                        ? "Update the blog post details below"
                        : "Add a new blog post to your dashboard"}
                    </DialogDescription>
                  </DialogHeader>
                  {editingPost ? (
                    <BlogEditForm
                      blogPost={editingPost}
                      onClose={() => setEditingPost(null)}
                      onUpdate={handleUpdatePost}
                    />
                  ) : (
                    <BlogForm onSuccess={() => setPostDialogOpen(false)} />
                  )}
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts?.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingPost(post);
                            setPostDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setBlogPosts(
                              blogPosts?.filter((p) => p.id !== post.id)
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* <Badge className={getStatusColor(post?.status)}>
                      {post.status}
                    </Badge> */}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {post.img && (
                        <img
                          src={post.img || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      )}
                      {post.content && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {post.content}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {post?.author}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {post?.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Team Section */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">
                Team Members
              </h2>
              <Dialog
                open={memberDialogOpen || editingMember !== null}
                onOpenChange={(open) => {
                  setMemberDialogOpen(open);
                  if (!open) setEditingMember(null);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => setEditingPost(null)}
                  >
                    <Plus className="h-4 w-4" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingMember ? "Edit Team Member" : "Add Team Member"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingMember
                        ? "Update the team member details below"
                        : "Add a new team member to your dashboard"}
                    </DialogDescription>
                  </DialogHeader>
                  {editingMember ? (
                    <TeamEditForm
                      teamMember={editingMember}
                      onClose={() => setEditingMember(null)}
                      onUpdate={handleUpdateMember}
                    />
                  ) : (
                    <TeamForm onSuccess={() => setMemberDialogOpen(false)} />
                  )}
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers?.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={
                              member?.image ||
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
                        <div>
                          <CardTitle className="text-lg">
                            {member.name}
                          </CardTitle>
                          <CardDescription>{member.position}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingMember(member);
                            setMemberDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setTeamMembers(
                              teamMembers.filter((m) => m.id !== member.id)
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {member.about && (
                        <p className="text-sm text-muted-foreground">
                          {member.about}
                        </p>
                      )}
                      <div className="flex gap-2">
                        {member?.linkedInUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={member?.linkedInUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {member?.twitterUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={member?.twitterUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {member?.githubUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={member?.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
