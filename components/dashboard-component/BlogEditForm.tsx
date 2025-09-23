"use client";
import { FormEvent, JSX, useState, useEffect } from "react";
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
import axios from "axios";
import { Loader2 } from "lucide-react";

interface BlogPosts {
  id: string;
  title: string;
  content: string;
  img: string;
  date?: string;
  status?: string;
  createdAt: string;
  author?: string;
}

interface BlogEditFormProps {
  blogPost: BlogPosts;
  onClose: () => void;
  onUpdate: () => void;
}

export default function BlogEditForm({ blogPost, onClose, onUpdate }: BlogEditFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: blogPost.title,
    content: blogPost.content,
    img: blogPost.img,
    author: blogPost.author || "",
    status: blogPost.status || "Draft",
    date: blogPost.date || new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    setFormData({
      title: blogPost.title,
      content: blogPost.content,
      img: blogPost.img,
      author: blogPost.author || "",
      status: blogPost.status || "Draft",
      date: blogPost.date || new Date().toISOString().split('T')[0]
    });
  }, [blogPost]);

  async function updateBlogPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `/api/posts/${blogPost.id}`,
        formData,
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={updateBlogPost} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
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
          onChange={(e) => handleInputChange("img", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => handleInputChange("author", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleInputChange("status", value)}
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
          onChange={(e) => handleInputChange("date", e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Update Post
        </Button>
      </div>
    </form>
  );
}
