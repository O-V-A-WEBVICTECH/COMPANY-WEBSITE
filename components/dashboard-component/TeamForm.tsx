import { FormEvent, JSX } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";

export default function TeamForm(): JSX.Element {
  async function createNewMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/create-user",
        { name, email }
      );
      console.log("response:", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={createNewMember} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="position">Position</Label>
        <Input id="position" name="position" required />
      </div>
      <div>
        <Label htmlFor="img">Profile Image URL</Label>
        <Input
          id="img"
          name="img"
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
          <Input
            placeholder="LinkedIn URL"
            //   value={formData.socialLinks.linkedin}
            //   onChange={(e) =>
            //     setFormData({
            //       ...formData,
            //       socialLinks: {
            //         ...formData.socialLinks,
            //         linkedin: e.target.value,
            //       },
            //     })
            //   }
          />
          <Input
            placeholder="Twitter URL"
            //   value={formData.socialLinks.twitter}
            //   onChange={(e) =>
            //     setFormData({
            //       ...formData,
            //       socialLinks: {
            //         ...formData.socialLinks,
            //         twitter: e.target.value,
            //       },
            //     })
            //   }
          />
          <Input
            placeholder="GitHub URL"
            //   value={formData.socialLinks.github}
            //   onChange={(e) =>
            //     setFormData({
            //       ...formData,
            //       socialLinks: {
            //         ...formData.socialLinks,
            //         github: e.target.value,
            //       },
            //     })
            //   }
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Add Member
      </Button>
    </form>
  );
}
