"use client";
import { FormEvent, JSX, useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface TeamMember {
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

interface TeamEditFormProps {
  teamMember: TeamMember;
  onClose: () => void;
  onUpdate: () => void;
}

export default function TeamEditForm({
  teamMember,
  onClose,
  onUpdate,
}: TeamEditFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: teamMember.name,
    email: teamMember.email,
    position: teamMember.position || "",
    image: teamMember.image || "",
    about: teamMember.about || "",
    githubUrl: teamMember.githubUrl || "",
    twitterUrl: teamMember.twitterUrl || "",
    linkedInUrl: teamMember.linkedInUrl || "",
  });

  useEffect(() => {
    setFormData({
      name: teamMember.name,
      email: teamMember.email,
      position: teamMember.position || "",
      image: teamMember.image || "",
      about: teamMember.about || "",
      githubUrl: teamMember.githubUrl || "",
      twitterUrl: teamMember.twitterUrl || "",
      linkedInUrl: teamMember.linkedInUrl || "",
    });
  }, [teamMember]);

  console.log(teamMember);

  async function updateTeamMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        `/api/users?teamId=${teamMember.id}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 201) {
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

  return (
    <form onSubmit={updateTeamMember} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          name="position"
          value={formData.position}
          onChange={(e) => handleInputChange("position", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="image">Profile Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={(e) => handleInputChange("image", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          name="about"
          value={formData.about}
          onChange={(e) => handleInputChange("about", e.target.value)}
          placeholder="Brief description about this team member..."
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label>Social Links</Label>
        <div className="space-y-2">
          <Input
            placeholder="LinkedIn URL"
            name="linkedInUrl"
            value={formData.linkedInUrl}
            onChange={(e) => handleInputChange("linkedInUrl", e.target.value)}
          />
          <Input
            placeholder="Twitter URL"
            name="twitterUrl"
            value={formData.twitterUrl}
            onChange={(e) => handleInputChange("twitterUrl", e.target.value)}
          />
          <Input
            placeholder="GitHub URL"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={(e) => handleInputChange("githubUrl", e.target.value)}
          />
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
          Update Member
        </Button>
      </div>
    </form>
  );
}
