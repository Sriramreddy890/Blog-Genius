"use client";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useAppData, blogCategories } from "@/context/AppContext";
import { Filter, Search, Sparkles, SlidersHorizontal, BookOpen } from "lucide-react";
import React, { useState } from "react";

const Blogs = () => {
  const { toggleSidebar } = useSidebar();
  const { loading, blogLoading, blogs, searchQuery, setSearchQuery, category, setCategory } = useAppData();

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 py-16 px-4">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[200px] bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI-Driven Publishing & Microservice Architecture</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Discover Articles Powered by <span className="gradient-text">BlogGenius AI</span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            Explore curated articles, technical deep dives, and creative writing generated with real-time AI assistance.
          </p>

          {/* Quick Search Box */}
          <div className="max-w-xl mx-auto mt-8 flex items-center gap-2 p-2 rounded-2xl glass-panel border border-slate-800 focus-within:border-indigo-500/50 transition-all shadow-xl">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs by title or keyword..."
              className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm px-2 py-1.5"
            />
            <Button
              onClick={toggleSidebar}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs px-3 py-2 flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Quick Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCategory("")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                category === ""
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All Articles
            </button>
            {blogCategories?.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  category === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Container */}
      <div className="container mx-auto max-w-7xl px-4 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              <span>{category ? `${category} Articles` : "Latest Publications"}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Real-time reader feed served via Redis Cache & Postgres</p>
          </div>
        </div>

        {loading || blogLoading ? (
          <Loading />
        ) : (
          <div>
            {(!blogs || blogs.length === 0) && (
              <div className="text-center py-20 glass-panel rounded-3xl border border-slate-800 max-w-md mx-auto">
                <Sparkles className="w-12 h-12 text-indigo-400 mx-auto animate-bounce mb-3" />
                <h3 className="text-xl font-bold text-white">No Articles Found</h3>
                <p className="text-slate-400 text-sm mt-2 px-6">
                  Be the first author to publish a blog post using AI generation!
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {blogs &&
                blogs.map((e: any, i: number) => (
                  <BlogCard
                    key={i}
                    image={e.image}
                    title={e.title}
                    desc={e.description}
                    id={e.id}
                    time={e.created_at || e.create_at}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
