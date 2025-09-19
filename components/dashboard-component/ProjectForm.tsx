import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FormEvent, JSX } from "react";

export default function ProjectForm(): JSX.Element {
  async function createNewProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={createNewProject} className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          //   value={formData.title}
          //   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the project..."
          rows={3}
          required
        />
      </div>
      <div>
        <Label htmlFor="url">Project URL</Label>
        <Input id="url" type="url" placeholder="https://example.com" required />
      </div>
      <div>
        <Label htmlFor="img">Project Image URL</Label>
        <Input id="img" placeholder="https://example.com/image.jpg" />
      </div>
      <div>
        <Label>Tech Stack</Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            {/* <Input
              placeholder="Add technology (e.g., React, Node.js)"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addStackItem())
              }
            /> */}
            <Button type="button" variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* {formData.stack.map((item: string) => (
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
            ))} */}
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  );
}
