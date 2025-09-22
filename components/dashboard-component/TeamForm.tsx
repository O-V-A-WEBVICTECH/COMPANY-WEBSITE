"use client";
import { FormEvent, JSX, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function TeamForm(): JSX.Element {
  const [loading, setloading] = useState<boolean>(false);
  async function createNewMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;
    const image = formData.get("image") as string;
    const xUrl = formData.get("xUrl") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const linkedInUrl = formData.get("linkedInUrl") as string;

    try {
      setloading(true);
      const response = await axios.post(
        "/api/users/create-user",
        {
          name,
          email,
          position,
          image,
          xUrl,
          githubUrl,
          linkedInUrl,
        },
        {
          withCredentials: true,
        }
      );

      console.log("response:", response);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  return (
    <form onSubmit={createNewMember} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="name">Eamil</Label>
        <Input id="email" name="email" required />
      </div>
      <div>
        <Label htmlFor="position">Position</Label>
        <Input id="position" name="position" required />
      </div>
      <div>
        <Label htmlFor="img">Profile Image URL</Label>
        <Input
          id="image"
          name="image"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          name="about"
          placeholder="Brief description about this team member..."
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label>Social Links</Label>
        <div className="space-y-2">
          <Input placeholder="LinkedIn URL" name="linkedInUrl" />
          <Input placeholder="Twitter URL" name="Xurl" />
          <Input placeholder="GitHub URL" name="githubUrl" />
        </div>
      </div>
      <Button disabled={loading} type="submit" className="w-full">
        Add Member
        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
      </Button>
    </form>
  );
}
