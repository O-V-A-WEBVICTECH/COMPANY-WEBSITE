"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FormEvent, JSX, useRef, useState, useEffect } from "react";
import axios from "axios";
import { Loader2, ImagePlus, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

interface Project {
  id: string; name: string; description: string; link: string; repoUrl?: string; image?: string; stack: string[];
}
interface ProjectEditFormProps {
  project: Project; onClose: () => void; onUpdate: () => void;
}

export default function ProjectEditForm({ project, onClose, onUpdate }: ProjectEditFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [stack, setStack] = useState<string[]>(project.stack || []);
  const [stackInput, setStackInput] = useState(project.stack?.join(", ") || "");
  const [formData, setFormData] = useState({ name: project.name, description: project.description, link: project.link, repoUrl: project.repoUrl || "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(project.image || null);
  const [removedImage, setRemovedImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({ name: project.name, description: project.description, link: project.link, repoUrl: project.repoUrl || "" });
    setStack(project.stack || []);
    setStackInput(project.stack?.join(", ") || "");
    setSelectedFile(null);
    setImagePreview(project.image || null);
    setRemovedImage(false);
  }, [project]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setRemovedImage(false);
  }

  function clearImage() {
    setSelectedFile(null);
    setImagePreview(null);
    setRemovedImage(true);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function updateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      let imageUrl: string | undefined = removedImage ? undefined : (project.image || undefined);
      if (selectedFile) {
        const result = await uploadToCloudinary(selectedFile, "webvictech/projects");
        imageUrl = result.secure_url;
      }
      const res = await axios.patch(`/api/projects?projectId=${project.id}`, { ...formData, stack, image: imageUrl }, { withCredentials: true });
      if (res.status === 200) { toast.success("Project updated"); onUpdate(); onClose(); }
    } catch { toast.error("Update failed"); }
    finally { setLoading(false); }
  }

  const handleInputChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStackInput(e.target.value);
    setStack(e.target.value.split(",").map((i) => i.trim()).filter(Boolean));
  };

  return (
    <form onSubmit={updateProject} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="pe-name" className="text-sm font-semibold text-slate-700">Project Title <span className="text-red-500">*</span></Label>
        <Input id="pe-name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pe-description" className="text-sm font-semibold text-slate-700">Description <span className="text-red-500">*</span></Label>
        <Textarea id="pe-description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Brief description..." rows={3} required
          className="border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-slate-700">
          Project Image
          {selectedFile && <span className="ml-2 text-xs font-normal text-slate-400">(will upload on save)</span>}
        </Label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" id="pe-img-file" onChange={handleFileChange} />
        {imagePreview ? (
          <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 group">
            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
            {!selectedFile && project.image && imagePreview === project.image && (
              <div className="absolute top-3 left-3 text-[11px] font-semibold bg-slate-800/70 text-white px-2 py-0.5 rounded-full">Current</div>
            )}
            {selectedFile && (
              <div className="absolute top-3 left-3 text-[11px] font-semibold bg-blue-600/90 text-white px-2 py-0.5 rounded-full">New — will upload on save</div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <button type="button" onClick={clearImage}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
            <label htmlFor="pe-img-file"
              className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer shadow transition-colors">
              <Upload className="w-3.5 h-3.5" /> Replace
            </label>
          </div>
        ) : (
          <label htmlFor="pe-img-file"
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
        <Label htmlFor="pe-repoUrl" className="text-sm font-semibold text-slate-700">GitHub URL</Label>
        <Input id="pe-repoUrl" type="url" value={formData.repoUrl} onChange={(e) => handleInputChange("repoUrl", e.target.value)}
          placeholder="https://github.com/username/repo"
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pe-link" className="text-sm font-semibold text-slate-700">Live URL <span className="text-red-500">*</span></Label>
        <Input id="pe-link" type="url" value={formData.link} onChange={(e) => handleInputChange("link", e.target.value)}
          placeholder="https://example.com" required
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-slate-700">Tech Stack</Label>
        <Input placeholder="React, Node.js, PostgreSQL…" value={stackInput} onChange={handleStackChange}
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        {stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {stack.map((item) => (
              <span key={item} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">{item}</span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-1">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-11 font-semibold border-slate-200 hover:bg-slate-50">Cancel</Button>
        <Button type="submit" disabled={loading}
          className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-all">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />{selectedFile ? "Uploading & saving…" : "Saving…"}</> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
