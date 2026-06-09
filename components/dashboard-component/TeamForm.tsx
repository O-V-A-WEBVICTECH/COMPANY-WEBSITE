"use client";
import { FormEvent, JSX, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { Loader2, ImagePlus, X, Upload, Github, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

interface TeamFormProps { onSuccess?: () => void; }

export default function TeamForm({ onSuccess }: TeamFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  async function createNewMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    setLoading(true);
    try {
      let imageUrl: string | undefined;
      if (selectedFile) {
        const result = await uploadToCloudinary(selectedFile, "webvictech/team");
        imageUrl = result.secure_url;
      }
      const stackString = fd.get("stack") as string;
      const stack = stackString ? stackString.split(',').map(s => s.trim()).filter(s => s) : [];

      const res = await axios.post("/api/users/create-user", {
        name: fd.get("name"), email: fd.get("email"), position: fd.get("position"),
        about: fd.get("about"), linkedInUrl: fd.get("linkedInUrl"), twitterUrl: fd.get("xUrl"),
        githubUrl: fd.get("githubUrl"), image: imageUrl, stack,
      }, { withCredentials: true });
      if (res.status === 201) { toast.success("Team member added"); if (onSuccess) onSuccess(); }
    } catch { toast.error("Something went wrong"); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={createNewMember} className="space-y-5">
      {/* Photo picker */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-slate-700">
          Profile Photo
          {selectedFile && <span className="ml-2 text-xs font-normal text-slate-400">(will upload on save)</span>}
        </Label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" id="tm-img-file" onChange={handleFileChange} />
        {imagePreview ? (
          <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 group">
            <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover object-top" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <button type="button" onClick={clearImage}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
            <label htmlFor="tm-img-file"
              className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer shadow transition-colors">
              <Upload className="w-3.5 h-3.5" /> Replace
            </label>
          </div>
        ) : (
          <label htmlFor="tm-img-file"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-all group">
            <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <ImagePlus className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold">Select profile photo</p>
            </div>
          </label>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="tm-name" className="text-sm font-semibold text-slate-700">Name <span className="text-red-500">*</span></Label>
          <Input id="tm-name" name="name" required placeholder="John Doe"
            className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tm-position" className="text-sm font-semibold text-slate-700">Position <span className="text-red-500">*</span></Label>
          <Input id="tm-position" name="position" required placeholder="Frontend Engineer"
            className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tm-email" className="text-sm font-semibold text-slate-700">Email <span className="text-red-500">*</span></Label>
        <Input id="tm-email" name="email" type="email" required placeholder="john@example.com"
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tm-about" className="text-sm font-semibold text-slate-700">About</Label>
        <Textarea id="tm-about" name="about" placeholder="Brief bio about this team member..." rows={3}
          className="border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tm-stack" className="text-sm font-semibold text-slate-700">Tech Stack (comma separated)</Label>
        <Input id="tm-stack" name="stack" placeholder="e.g. React, Node.js, TypeScript"
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-slate-700">Social Links</Label>
        <div className="relative">
          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input name="linkedInUrl" placeholder="LinkedIn URL" className="pl-9 h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <div className="relative">
          <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input name="xUrl" placeholder="Twitter / X URL" className="pl-9 h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <div className="relative">
          <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input name="githubUrl" placeholder="GitHub URL" className="pl-9 h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
      </div>

      <Button type="submit" disabled={loading}
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-all">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />{selectedFile ? "Uploading & saving…" : "Adding member…"}</> : "Add Team Member"}
      </Button>
    </form>
  );
}
