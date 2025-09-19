import { FormEvent, JSX } from "react";
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

export default function BlogForm(): JSX.Element {
  async function createBlogPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={createBlogPost} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" required />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your blog post content here..."
          rows={4}
          required
        />
      </div>
      <div>
        <Label htmlFor="img">Featured Image URL</Label>
        <Input id="img" placeholder="https://example.com/image.jpg" />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" required />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select>
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
        <Input id="date" type="date" required />
      </div>
      <Button type="submit" className="w-full">
        Create Post
      </Button>
    </form>
  );
}
