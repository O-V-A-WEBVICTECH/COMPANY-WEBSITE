"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FormEvent, JSX, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ImagePlus, Loader2, X, Upload } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

interface ProjectFormProps {
  onSuccess?: () => void;
}

export default function ProjectForm({ onSuccess }: ProjectFormProps): JSX.Element {
  const [stack, setStack] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function clearImage() {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function createNewProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    setSubmitting(true);
    try {
      let imageUrl: string | undefined;
      if (selectedFile) {
        const result = await uploadToCloudinary(selectedFile, "webvictech/projects");
        imageUrl = result.secure_url;
      }
      const res = await axios.post(
        "/api/projects",
        { name: fd.get("name"), description: fd.get("description"), link: fd.get("link"), repoUrl: fd.get("repoUrl"), stack, image: imageUrl },
        { withCredentials: true }
      );
      if (res.status === 201) { toast.success("Project created"); if (onSuccess) onSuccess(); }
    } catch { toast.error("Something went wrong"); }
    finally { setSubmitting(false); }
  }

  function handleStackChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStackInput(e.target.value);
    setStack(e.target.value.split(",").map((i) => i.trim()).filter(Boolean));
  }

  return (
    <form onSubmit={createNewProject} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="p-title" className="text-sm font-semibold text-slate-700">
          Project Title <span className="text-red-500">*</span>
        </Label>
        <Input name="name" id="p-title" required placeholder="My Awesome Project"
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="p-description" className="text-sm font-semibold text-slate-700">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea id="p-description" name="description" placeholder="Brief description of the project..." rows={3} required
          className="border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" />
      </div>

      {/* Image picker — preview only, upload happens on submit */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-slate-700">
          Project Image
          {selectedFile && <span className="ml-2 text-xs font-normal text-slate-400">(will upload on save)</span>}
        </Label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" id="p-img-file" onChange={handleFileChange} />
        {imagePreview ? (
          <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 group">
            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <button type="button" onClick={clearImage}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
            <label htmlFor="p-img-file"
              className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer shadow transition-colors">
              <Upload className="w-3.5 h-3.5" /> Replace
            </label>
          </div>
        ) : (
          <label htmlFor="p-img-file"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-all group">
            <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <ImagePlus className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold">Click to select image</p>
              <p className="text-xs -mt-1">PNG, JPG, WebP up to 10MB</p>
            </div>
          </label>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="p-repoUrl" className="text-sm font-semibold text-slate-700">GitHub URL</Label>
        <Input name="repoUrl" id="p-repoUrl" type="url" placeholder="https://github.com/username/repo"
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="p-link" className="text-sm font-semibold text-slate-700">
          Live URL <span className="text-red-500">*</span>
        </Label>
        <Input name="link" id="p-link" type="url" required placeholder="https://yourproject.com"
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-slate-700">Tech Stack</Label>
        <Input placeholder="React, Node.js, PostgreSQL…  (comma-separated)" value={stackInput} onChange={handleStackChange}
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        {stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {stack.map((item) => (
              <span key={item} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">{item}</span>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" disabled={submitting}
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-all">
        {submitting
          ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />{selectedFile ? "Uploading & saving…" : "Creating…"}</>
          : "Create Project"}
      </Button>
    </form>
  );
}
