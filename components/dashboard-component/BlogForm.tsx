"use client";
import { FormEvent, JSX, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface BlogFormProps {
  onSuccess?: () => void;
}

export default function BlogForm({ onSuccess }: BlogFormProps): JSX.Element {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function createBlogPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const content = formData.get("content");
    const img = formData.get("img");
    const date = formData.get("date");

    const formDetails = {
      title,
      content,
      img,
      date,
      status,
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/post", formDetails, {
        withCredentials: true,
      });
      if (response.status === 201) {
        if (onSuccess) onSuccess();
        return toast.success("new blog post added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong,please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={createBlogPost} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input name="title" id="title" required />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your blog post content here..."
          rows={4}
          required
        />
      </div>
      <div>
        <Label htmlFor="img">Featured Image URL</Label>
        <Input
          name="img"
          id="img"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      {/* <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" required />
      </div> */}
      <div>
        <Label htmlFor="status">Status</Label>
        <Select onValueChange={(value) => setStatus(value)}>
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
        <Input name="date" id="date" type="date" required />
      </div>
      <Button disabled={loading} type="submit" className="w-full">
        Create Post{" "}
        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
      </Button>
    </form>
  );
}
