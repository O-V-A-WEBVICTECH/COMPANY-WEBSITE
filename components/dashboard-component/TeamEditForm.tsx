"use client";
import { FormEvent, JSX, useRef, useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { Loader2, ImagePlus, X, Upload, CheckCircle2, Github, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

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
  stack?: string[];
}

interface TeamEditFormProps {
  teamMember: TeamMember;
  onClose: () => void;
  onUpdate: () => void;
}

export default function TeamEditForm({ teamMember, onClose, onUpdate }: TeamEditFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: teamMember.name,
    email: teamMember.email,
    position: teamMember.position || "",
    about: teamMember.about || "",
    githubUrl: teamMember.githubUrl || "",
    twitterUrl: teamMember.twitterUrl || "",
    linkedInUrl: teamMember.linkedInUrl || "",
    stack: teamMember.stack?.join(', ') || "",
  });
  const [imageUrl, setImageUrl] = useState(teamMember.image || "");
  const [imagePreview, setImagePreview] = useState<string | null>(teamMember.image || null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(!!teamMember.image);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({
      name: teamMember.name,
      email: teamMember.email,
      position: teamMember.position || "",
      about: teamMember.about || "",
      githubUrl: teamMember.githubUrl || "",
      twitterUrl: teamMember.twitterUrl || "",
      linkedInUrl: teamMember.linkedInUrl || "",
      stack: teamMember.stack?.join(', ') || "",
    });
    setImageUrl(teamMember.image || "");
    setImagePreview(teamMember.image || null);
    setUploadDone(!!teamMember.image);
  }, [teamMember]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setUploadDone(false);
    setImageUrl("");
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, "webvictech/team");
      setImageUrl(result.secure_url);
      setUploadDone(true);
      toast.success("Photo uploaded");
    } catch {
      toast.error("Upload failed — try again");
      setImagePreview(teamMember.image || null);
      setImageUrl(teamMember.image || "");
    } finally { setUploading(false); }
  }

  function clearImage() {
    setImagePreview(null);
    setImageUrl("");
    setUploadDone(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function updateTeamMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (uploading) { toast.warning("Wait for the image to finish uploading"); return; }
    setLoading(true);
    try {
      const payload = {
        ...formData,
        stack: formData.stack ? formData.stack.split(',').map(s => s.trim()).filter(s => s) : [],
        image: imageUrl || undefined
      };
      const res = await axios.patch(
        `/api/users?teamId=${teamMember.id}`,
        payload,
        { withCredentials: true }
      );
      if (res.status === 200) { toast.success("Member updated"); onUpdate(); onClose(); }
    } catch { toast.error("Update failed"); }
    finally { setLoading(false); }
  }

  const handleInputChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={updateTeamMember} className="space-y-5">
      {/* Profile Photo */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold text-slate-700">Profile Photo</Label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" id="tme-img-file" onChange={handleFileChange} />
        {imagePreview ? (
          <div className="relative rounded-xl overflow-hidden border-2 border-blue-200">
            <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover object-top" />
            {uploading && (
              <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <span className="text-white text-sm font-semibold">Uploading…</span>
              </div>
            )}
            {uploadDone && !uploading && (
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {imageUrl === teamMember.image ? "Current photo" : "Uploaded"}
              </div>
            )}
            <button type="button" onClick={clearImage}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
            {!uploading && (
              <label htmlFor="tme-img-file"
                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer shadow transition-colors">
                <Upload className="w-3.5 h-3.5" /> Replace
              </label>
            )}
          </div>
        ) : (
          <label htmlFor="tme-img-file"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-all group">
            <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <ImagePlus className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold">Upload profile photo</p>
            </div>
          </label>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="tme-name" className="text-sm font-semibold text-slate-700">Name <span className="text-red-500">*</span></Label>
          <Input id="tme-name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required
            className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tme-position" className="text-sm font-semibold text-slate-700">Position <span className="text-red-500">*</span></Label>
          <Input id="tme-position" value={formData.position} onChange={(e) => handleInputChange("position", e.target.value)} required
            className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tme-email" className="text-sm font-semibold text-slate-700">Email <span className="text-red-500">*</span></Label>
        <Input id="tme-email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tme-about" className="text-sm font-semibold text-slate-700">About</Label>
        <Textarea id="tme-about" value={formData.about} onChange={(e) => handleInputChange("about", e.target.value)}
          placeholder="Brief bio..." rows={3}
          className="border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tme-stack" className="text-sm font-semibold text-slate-700">Tech Stack (comma separated)</Label>
        <Input id="tme-stack" value={formData.stack} onChange={(e) => handleInputChange("stack", e.target.value)}
          placeholder="e.g. React, Node.js, TypeScript"
          className="h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-slate-700">Social Links</Label>
        <div className="relative">
          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input value={formData.linkedInUrl} onChange={(e) => handleInputChange("linkedInUrl", e.target.value)}
            placeholder="LinkedIn URL" className="pl-9 h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <div className="relative">
          <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input value={formData.twitterUrl} onChange={(e) => handleInputChange("twitterUrl", e.target.value)}
            placeholder="Twitter / X URL" className="pl-9 h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
        <div className="relative">
          <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input value={formData.githubUrl} onChange={(e) => handleInputChange("githubUrl", e.target.value)}
            placeholder="GitHub URL" className="pl-9 h-10 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <Button type="button" variant="outline" onClick={onClose}
          className="flex-1 h-11 font-semibold border-slate-200 hover:bg-slate-50">Cancel</Button>
        <Button type="submit" disabled={loading || uploading}
          className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-all">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving…</>
            : uploading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Uploading…</>
            : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
