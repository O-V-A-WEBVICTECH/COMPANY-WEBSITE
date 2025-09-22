"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FormEvent, JSX, useState } from "react";
import axios from "axios";

export default function ProjectForm(): JSX.Element {
  const [stack, setStack] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState(""); // for the raw input value

  async function createNewProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const description = formData.get("description");
    const link = formData.get("link");
    const repoUrl = formData.get("repoUrl");
    try {
      const response = await axios.post(
        "/api/projects",
        { name, description, link, repoUrl, stack },
        {
          withCredentials: true,
        }
      );
      console.log("response:", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setStackInput(input);
    const arr = input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setStack(arr);
  }

  return (
    <form onSubmit={createNewProject} className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title</Label>
        <Input name="name" id="title" required />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Brief description of the project..."
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="giturl">Github Url</Label>
        <Input
          name="repoUrl"
          id="giturl"
          type="url"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <Label htmlFor="url">Project URL</Label>
        <Input
          name="link"
          id="url"
          type="url"
          placeholder="https://example.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="img">Project Image URL</Label>
        <Input
          name="image"
          id="img"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label>Tech Stack</Label>
        <div className="space-y-2">
          <Input
            placeholder="Separate with commas (e.g., React, Node.js)"
            value={stackInput}
            onChange={handleChange}
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

      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  );
}
