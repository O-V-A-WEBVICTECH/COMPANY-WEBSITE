"use client";
import { FormEvent, JSX, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, ImagePlus, X, Upload, CheckCircle2 } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

interface BlogFormProps {
  onSuccess?: () => void;
}

export default function BlogForm({ onSuccess }: BlogFormProps): JSX.Element {
  const [status, setStatus] = useState("Draft");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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
      toast.error("Image upload failed — try again");
      setImagePreview(null);
    } finally { setUploading(false); }
  }

  function clearImage() {
    setImagePreview(null);
    setImageUrl("");
    setUploadDone(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function createBlogPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (uploading) { toast.warning("Wait for the image to finish uploading"); return; }
    const fd = new FormData(event.currentTarget);
    setLoading(true);
    try {
      const res = await axios.post("/api/post", {
        title: fd.get("title"),
        content: fd.get("content"),
        img: imageUrl || undefined,
        date: fd.get("date"),
        status,
      }, { withCredentials: true });
      if (res.status === 201) { toast.success("Blog post created"); if (onSuccess) onSuccess(); }
    } catch { toast.error("Something went wrong — try again"); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={createBlogPost} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="b-title" className="text-sm font-semibold text-slate-700">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input name="title" id="b-title" required placeholder="Post title…"
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="b-content" className="text-sm font-semibold text-slate-700">
          Content <span className="text-red-500">*</span>
        </Label>
        <Textarea id="b-content" name="content" placeholder="Write your blog post content here..." rows={5} required
          className="border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" />
      </div>

      {/* Featured Image */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-slate-700">Featured Image</Label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" id="b-img-file" onChange={handleFileChange} />
        {imagePreview ? (
          <div className="relative rounded-xl overflow-hidden border-2 border-blue-200">
            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
            {uploading && (
              <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <span className="text-white text-sm font-semibold">Uploading…</span>
              </div>
            )}
            {uploadDone && !uploading && (
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
              </div>
            )}
            <button type="button" onClick={clearImage}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
            {!uploading && (
              <label htmlFor="b-img-file"
                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer shadow transition-colors">
                <Upload className="w-3.5 h-3.5" /> Replace
              </label>
            )}
          </div>
        ) : (
          <label htmlFor="b-img-file"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-all group">
            <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <ImagePlus className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold">Click to upload featured image</p>
              <p className="text-xs -mt-1 text-slate-400">PNG, JPG, WebP up to 10MB</p>
            </div>
          </label>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="b-status" className="text-sm font-semibold text-slate-700">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="b-status" className="h-10 border-slate-200">
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
          <Label htmlFor="b-date" className="text-sm font-semibold text-slate-700">
            Date <span className="text-red-500">*</span>
          </Label>
          <Input name="date" id="b-date" type="date" required
            className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
      </div>

      <Button type="submit" disabled={loading || uploading}
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-all">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Publishing…</>
          : uploading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Uploading image…</>
          : "Create Post"}
      </Button>
    </form>
  );
}
