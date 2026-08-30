"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Wand2, CheckCircle2, Image as ImageIcon, Loader2 } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import axios from "axios";
import {
  author_service,
  blogCategories,
  useAppData,
} from "@/context/AppContext";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { fetchBlogs } = useAppData();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    image: File | null;
    blogcontent: string;
  }>({
    title: "",
    description: "",
    category: "",
    image: null,
    blogcontent: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fromDataToSend = new FormData();
    fromDataToSend.append("title", formData.title);
    fromDataToSend.append("description", formData.description);
    fromDataToSend.append("blogcontent", formData.blogcontent);
    fromDataToSend.append("category", formData.category);

    if (formData.image) {
      fromDataToSend.append("file", formData.image);
    }

    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${author_service}/api/v1/blog/new`,
        fromDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setFormData({
        title: "",
        description: "",
        category: "",
        image: null,
        blogcontent: "",
      });
      setContent("");
      setTimeout(() => {
        fetchBlogs();
      }, 4000);
    } catch (error) {
      toast.error("Error while adding blog");
    } finally {
      setLoading(false);
    }
  };

  const [aiTitle, setAiTitle] = useState(false);
  const aiTitleResponse = async () => {
    try {
      setAiTitle(true);
      const { data } = await axios.post(`${author_service}/api/v1/ai/title`, {
        text: formData.title,
      });
      setFormData((prev) => ({ ...prev, title: data }));
    } catch (error) {
      toast.error("Problem while fetching from AI");
    } finally {
      setAiTitle(false);
    }
  };

  const [aiDescripiton, setAiDescription] = useState(false);
  const aiDescriptionResponse = async () => {
    try {
      setAiDescription(true);
      const { data } = await axios.post(
        `${author_service}/api/v1/ai/descripiton`,
        {
          title: formData.title,
          description: formData.description,
        }
      );
      setFormData((prev) => ({ ...prev, description: data }));
    } catch (error) {
      toast.error("Problem while fetching from AI");
    } finally {
      setAiDescription(false);
    }
  };

  const [aiBlogLoading, setAiBlogLoading] = useState(false);
  const aiBlogResponse = async () => {
    try {
      setAiBlogLoading(true);
      const { data } = await axios.post(`${author_service}/api/v1/ai/blog`, {
        blog: formData.blogcontent,
      });
      setContent(data.html);
      setFormData((prev) => ({ ...prev, blogcontent: data.html }));
    } catch (error: any) {
      toast.error("Problem while fetching from AI");
    } finally {
      setAiBlogLoading(false);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing your story...",
      height: 400,
      theme: "dark",
      style: {
        background: "#0f172a",
        color: "#f8fafc",
      },
    }),
    []
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Authoring Studio</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Create a New Article</h1>
          <p className="text-slate-400 text-sm mt-1">
            Leverage Google Gemini AI to refine your titles, generate meta summaries, and polish grammar.
          </p>
        </div>

        <Card className="glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl bg-slate-900/80">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-200 font-semibold text-sm">Article Title</Label>
                  {formData.title && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={aiTitleResponse}
                      disabled={aiTitle}
                      className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs flex items-center gap-1.5"
                    >
                      {aiTitle ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                      <span>Enhance Title with AI</span>
                    </Button>
                  )}
                </div>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a catchy blog title..."
                  className="bg-slate-950/80 border-slate-800 text-white rounded-xl focus:border-purple-500/50"
                  required
                />
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-200 font-semibold text-sm">Summary Description</Label>
                  {formData.title && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={aiDescriptionResponse}
                      disabled={aiDescripiton}
                      className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs flex items-center gap-1.5"
                    >
                      {aiDescripiton ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                      <span>Generate AI Summary</span>
                    </Button>
                  )}
                </div>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief summary of your article..."
                  className="bg-slate-950/80 border-slate-800 text-white rounded-xl focus:border-indigo-500/50"
                  required
                />
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <Label className="text-slate-200 font-semibold text-sm">Topic Category</Label>
                <Select
                  onValueChange={(value: string) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="bg-slate-950/80 border-slate-800 text-slate-200 rounded-xl">
                    <SelectValue
                      placeholder={formData.category || "Select a category"}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                    {blogCategories?.map((cat, idx) => (
                      <SelectItem key={idx} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-slate-200 font-semibold text-sm flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-purple-400" />
                  <span>Cover Image</span>
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-slate-950/80 border-slate-800 text-slate-400 rounded-xl cursor-pointer"
                />
              </div>

              {/* Editor Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-slate-200 font-semibold text-sm">Article Body Content</Label>
                  <Button
                    type="button"
                    size="sm"
                    onClick={aiBlogResponse}
                    disabled={aiBlogLoading}
                    className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    {aiBlogLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                    <span>Polish Grammar & AI Draft</span>
                  </Button>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-800">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => {
                      setContent(newContent);
                      setFormData((prev) => ({ ...prev, blogcontent: newContent }));
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-2xl shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 border border-purple-400/20 transition-all duration-300 hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Publishing Article...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Publish Blog Article</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddBlog;
