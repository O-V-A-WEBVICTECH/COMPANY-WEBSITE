"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FormEvent, JSX, useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  repoUrl?: string;
  image?: string;
  stack: string[];
}

interface ProjectEditFormProps {
  project: Project;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ProjectEditForm({
  project,
  onClose,
  onUpdate,
}: ProjectEditFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [stack, setStack] = useState<string[]>(project.stack || []);
  const [stackInput, setStackInput] = useState(project.stack?.join(", ") || "");
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    link: project.link,
    repoUrl: project.repoUrl || "",
    image: project.image || "",
  });

  useEffect(() => {
    setFormData({
      name: project.name,
      description: project.description,
      link: project.link,
      repoUrl: project.repoUrl || "",
      image: project.image || "",
    });
    setStack(project.stack || []);
    setStackInput(project.stack?.join(", ") || "");
  }, [project]);

  async function updateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        `/api/projects?projectId=${project.id}`,
        { ...formData, stack },
        { withCredentials: true }
      );

      if (response.status === 200) {
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setStackInput(input);
    const arr = input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setStack(arr);
  };

  return (
    <form onSubmit={updateProject} className="space-y-4">
      <div>
        <Label htmlFor="name">Project Title</Label>
        <Input
          name="name"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Brief description of the project..."
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="repoUrl">Github URL</Label>
        <Input
          name="repoUrl"
          id="repoUrl"
          type="url"
          value={formData.repoUrl}
          onChange={(e) => handleInputChange("repoUrl", e.target.value)}
          placeholder="https://github.com/username/repo"
        />
      </div>

      <div>
        <Label htmlFor="link">Project URL</Label>
        <Input
          name="link"
          id="link"
          type="url"
          value={formData.link}
          onChange={(e) => handleInputChange("link", e.target.value)}
          placeholder="https://example.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="image">Project Image URL</Label>
        <Input
          name="image"
          id="image"
          value={formData.image}
          onChange={(e) => handleInputChange("image", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label>Tech Stack</Label>
        <div className="space-y-2">
          <Input
            placeholder="Separate with commas (e.g., React, Node.js)"
            value={stackInput}
            onChange={handleStackChange}
          />

          <div className="flex flex-wrap gap-2">
            {stack.map((item: string) => (
              <span
                key={item}
                className="px-2 py-1 rounded bg-gray-200 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Update Project
        </Button>
      </div>
    </form>
  );
}
