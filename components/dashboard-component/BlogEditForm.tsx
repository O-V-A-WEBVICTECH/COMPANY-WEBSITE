"use client";
import { FormEvent, JSX, useRef, useState, useEffect } from "react";
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
import { Loader2, ImagePlus, X, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import Image from "next/image";

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

export default function BlogEditForm({
  blogPost,
  onClose,
  onUpdate,
}: BlogEditFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: blogPost.title,
    content: blogPost.content,
    author: blogPost.author || "",
    status: blogPost.status || "Draft",
    date: blogPost.date || new Date().toISOString().split("T")[0],
  });
  const [imageUrl, setImageUrl] = useState(blogPost.img || "");
  const [imagePreview, setImagePreview] = useState<string | null>(
    blogPost.img || null,
  );
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(!!blogPost.img);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({
      title: blogPost.title,
      content: blogPost.content,
      author: blogPost.author || "",
      status: blogPost.status || "Draft",
      date: blogPost.date || new Date().toISOString().split("T")[0],
    });
    setImageUrl(blogPost.img || "");
    setImagePreview(blogPost.img || null);
    setUploadDone(!!blogPost.img);
  }, [blogPost]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setUploadDone(false);
    setImageUrl("");
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, "webvictech/blog");
      setImageUrl(result.secure_url);
      setUploadDone(true);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed — try again");
      setImagePreview(blogPost.img || null);
      setImageUrl(blogPost.img || "");
    } finally {
      setUploading(false);
    }
  }

  function clearImage() {
    setImagePreview(null);
    setImageUrl("");
    setUploadDone(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function updateBlogPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (uploading) {
      toast.warning("Wait for the image to finish uploading");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.patch(
        `/api/posts?postId=${blogPost.id}`,
        { ...formData, img: imageUrl || undefined },
        { withCredentials: true },
      );
      if (res.status === 200) {
        toast.success("Post updated");
        onUpdate();
        onClose();
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={updateBlogPost} className="space-y-5">
      <div className="space-y-1.5">
        <Label
          htmlFor="be-title"
          className="text-sm font-semibold text-slate-700"
        >
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="be-title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="be-content"
          className="text-sm font-semibold text-slate-700"
        >
          Content <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="be-content"
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          placeholder="Write your blog post content here..."
          rows={5}
          required
          className="border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
        />
      </div>

      {/* Featured Image */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-slate-700">
          Featured Image
        </Label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          id="be-img-file"
          onChange={handleFileChange}
        />
        {imagePreview ? (
          <div className="relative rounded-xl overflow-hidden border-2 border-blue-200">
            <Image
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <span className="text-white text-sm font-semibold">
                  Uploading…
                </span>
              </div>
            )}
            {uploadDone && !uploading && (
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {imageUrl === blogPost.img ? "Current image" : "Uploaded"}
              </div>
            )}
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            {!uploading && (
              <label
                htmlFor="be-img-file"
                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer shadow transition-colors"
              >
                <Upload className="w-3.5 h-3.5" /> Replace
              </label>
            )}
          </div>
        ) : (
          <label
            htmlFor="be-img-file"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-all group"
          >
            <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <ImagePlus className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold">
                Click to upload featured image
              </p>
              <p className="text-xs -mt-1 text-slate-400">
                PNG, JPG, WebP up to 10MB
              </p>
            </div>
          </label>
        )}
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="be-author"
          className="text-sm font-semibold text-slate-700"
        >
          Author
        </Label>
        <Input
          id="be-author"
          value={formData.author}
          onChange={(e) => handleInputChange("author", e.target.value)}
          placeholder="Author name"
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="be-status"
            className="text-sm font-semibold text-slate-700"
          >
            Status
          </Label>
          <Select
            value={formData.status}
            onValueChange={(v) => handleInputChange("status", v)}
          >
            <SelectTrigger id="be-status" className="h-10 border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label
            htmlFor="be-date"
            className="text-sm font-semibold text-slate-700"
          >
            Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="be-date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            required
            className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1 h-11 font-semibold border-slate-200 hover:bg-slate-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || uploading}
          className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Saving…
            </>
          ) : uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Uploading…
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
