/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Mock data
const initialProjects = [
  {
    id: 1,
    title: "Website Redesign",
    description:
      "Complete overhaul of company website with modern design and improved UX",
    url: "https://company-website.com",
    img: "/modern-website-design.png",
    stack: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: 2,
    title: "Mobile App",
    description:
      "Cross-platform mobile application for iOS and Android with real-time features",
    url: "https://github.com/company/mobile-app",
    img: "/mobile-app-interface.png",
    stack: ["React Native", "Firebase", "Redux", "Node.js"],
  },
  {
    id: 3,
    title: "Marketing Campaign",
    description:
      "Digital marketing campaign with social media integration and analytics tracking",
    url: "https://marketing.company.com",
    img: "/marketing-dashboard.png",
    stack: ["Google Analytics", "Facebook Ads", "Mailchimp", "WordPress"],
  },
];

const initialBlogPosts = [
  {
    id: 1,
    title: "Company Growth in 2024",
    content:
      "This year has been remarkable for our company. We've expanded our team by 50% and launched three major products that have revolutionized how our customers work. Our revenue has grown by 200% and we've established partnerships with industry leaders.",
    img: "/company-growth-chart.jpg",
    author: "John Doe",
    status: "Published",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "New Product Launch",
    content:
      "We're excited to announce the launch of our latest product - a revolutionary platform that combines AI with user-friendly design. This product has been in development for over a year and represents the future of our industry.",
    img: "/product-launch.png",
    author: "Jane Smith",
    status: "Draft",
    date: "2024-01-20",
  },
  {
    id: 3,
    title: "Industry Insights",
    content:
      "The tech industry is evolving rapidly, and staying ahead requires constant innovation. In this post, we explore the latest trends, emerging technologies, and what they mean for businesses like ours.",
    img: "/technology-trends-analysis.jpg",
    author: "Mike Johnson",
    status: "Review",
    date: "2024-01-25",
  },
];

const initialTeamMembers = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    about:
      "Experienced leader with 15+ years in tech industry. Passionate about innovation and team building.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "CTO",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    about:
      "Full-stack developer and technology strategist. Loves building scalable systems and mentoring developers.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
    },
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Marketing Director",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    about:
      "Creative marketing professional with expertise in digital campaigns and brand strategy.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/mikejohnson",
      twitter: "https://twitter.com/mikejohnson",
    },
  },
];

export default function Dashboard() {
  const [projects, setProjects] = useState(initialProjects);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [activeTab, setActiveTab] = useState("projects");

  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);

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

  const ProjectForm = ({
    project,
    onSave,
  }: {
    project?: any;
    onSave: (data: any) => void;
  }) => {
    const [formData, setFormData] = useState(
      project || {
        title: "",
        description: "",
        url: "",
        img: "",
        stack: [],
      }
    );
    const [stackInput, setStackInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
      setProjectDialogOpen(false);
      setEditingProject(null);
    };

    const addStackItem = () => {
      if (stackInput.trim() && !formData.stack.includes(stackInput.trim())) {
        setFormData({
          ...formData,
          stack: [...formData.stack, stackInput.trim()],
        });
        setStackInput("");
      }
    };

    const removeStackItem = (item: string) => {
      setFormData({
        ...formData,
        stack: formData.stack.filter((s: string) => s !== item),
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Brief description of the project..."
            rows={3}
            required
          />
        </div>
        <div>
          <Label htmlFor="url">Project URL</Label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://example.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="img">Project Image URL</Label>
          <Input
            id="img"
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <Label>Tech Stack</Label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                placeholder="Add technology (e.g., React, Node.js)"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addStackItem())
                }
              />
              <Button type="button" onClick={addStackItem} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.stack.map((item: string) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeStackItem(item)}
                    className="ml-1 text-xs hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full">
          {project ? "Update Project" : "Create Project"}
        </Button>
      </form>
    );
  };

  const BlogForm = ({
    post,
    onSave,
  }: {
    post?: any;
    onSave: (data: any) => void;
  }) => {
    const [formData, setFormData] = useState(
      post || {
        title: "",
        content: "",
        img: "",
        author: "",
        status: "Draft",
        date: new Date().toISOString().split("T")[0],
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
      setPostDialogOpen(false);
      setEditingPost(null);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Write your blog post content here..."
            rows={4}
            required
          />
        </div>
        <div>
          <Label htmlFor="img">Featured Image URL</Label>
          <Input
            id="img"
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          {post ? "Update Post" : "Create Post"}
        </Button>
      </form>
    );
  };

  const TeamForm = ({
    member,
    onSave,
  }: {
    member?: any;
    onSave: (data: any) => void;
  }) => {
    const [formData, setFormData] = useState(
      member || {
        name: "",
        position: "",
        img: "",
        about: "",
        socialLinks: {
          linkedin: "",
          twitter: "",
          github: "",
        },
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
      setMemberDialogOpen(false);
      setEditingMember(null);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="img">Profile Image URL</Label>
          <Input
            id="img"
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <Label htmlFor="about">About</Label>
          <Textarea
            id="about"
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            placeholder="Brief description about this team member..."
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label>Social Links</Label>
          <div className="space-y-2">
            <Input
              placeholder="LinkedIn URL"
              value={formData.socialLinks.linkedin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: {
                    ...formData.socialLinks,
                    linkedin: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Twitter URL"
              value={formData.socialLinks.twitter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: {
                    ...formData.socialLinks,
                    twitter: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="GitHub URL"
              value={formData.socialLinks.github}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: {
                    ...formData.socialLinks,
                    github: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          {member ? "Update Member" : "Add Member"}
        </Button>
      </form>
    );
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setProjectDialogOpen(true);
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setPostDialogOpen(true);
  };

  const handleEditMember = (member: any) => {
    setEditingMember(member);
    setMemberDialogOpen(true);
  };

  const handleSaveProject = (data: any) => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...data, id: editingProject.id } : p
        )
      );
    } else {
      const newProject = { ...data, id: Date.now() };
      setProjects([...projects, newProject]);
    }
  };

  const handleSavePost = (data: any) => {
    if (editingPost) {
      setBlogPosts(
        blogPosts.map((p) =>
          p.id === editingPost.id ? { ...data, id: editingPost.id } : p
        )
      );
    } else {
      const newPost = { ...data, id: Date.now() };
      setBlogPosts([...blogPosts, newPost]);
    }
  };

  const handleSaveMember = (data: any) => {
    if (editingMember) {
      setTeamMembers(
        teamMembers.map((m) =>
          m.id === editingMember.id ? { ...data, id: editingMember.id } : m
        )
      );
    } else {
      const newMember = { ...data, id: Date.now() };
      setTeamMembers([...teamMembers, newMember]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">
              Company Dashboard
            </h1>
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
                open={projectDialogOpen}
                onOpenChange={setProjectDialogOpen}
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
                        ? "Update project details."
                        : "Add a new project to your dashboard."}
                    </DialogDescription>
                  </DialogHeader>
                  <ProjectForm
                    project={editingProject}
                    onSave={handleSaveProject}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProject(project)}
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
                      {project.img && (
                        <img
                          src={project.img || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      {project.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full bg-transparent"
                        >
                          <a
                            href={project.url}
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
                        ? "Update blog post details."
                        : "Add a new blog post to your dashboard."}
                    </DialogDescription>
                  </DialogHeader>
                  <BlogForm post={editingPost} onSave={handleSavePost} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
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
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setBlogPosts(
                              blogPosts.filter((p) => p.id !== post.id)
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
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
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {post.date}
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
                open={memberDialogOpen}
                onOpenChange={setMemberDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => setEditingMember(null)}
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
                        ? "Update team member details."
                        : "Add a new team member to your dashboard."}
                    </DialogDescription>
                  </DialogHeader>
                  <TeamForm member={editingMember} onSave={handleSaveMember} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <Card
                  key={member.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={
                              member.img ||
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
                          onClick={() => handleEditMember(member)}
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
                        {member.socialLinks?.linkedin && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {member.socialLinks?.twitter && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={member.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {member.socialLinks?.github && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={member.socialLinks.github}
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
