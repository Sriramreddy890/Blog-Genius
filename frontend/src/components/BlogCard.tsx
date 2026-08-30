import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import { Calendar, ArrowUpRight, Sparkles } from "lucide-react";
import moment from "moment";

interface BlogCardProps {
  image: string;
  title: string;
  desc: string;
  id: string;
  time: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  desc,
  id,
  time,
}) => {
  return (
    <Link href={`/blog/${id}`} className="group block">
      <Card className="glass-panel card-hover-glow overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:border-purple-500/40">
        {/* Thumbnail Image Container */}
        <div className="relative w-full h-[210px] overflow-hidden bg-slate-950">
          <img
            src={image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
          
          {/* AI Badge Overlay */}
          <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-500/30 text-[11px] font-semibold text-purple-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>AI Article</span>
          </div>

          {/* Action Arrow Icon */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-md flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-slate-700">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>{moment(time).format("MMM DD, YYYY")}</span>
            </div>
            
            <h2 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1 leading-snug">
              {title}
            </h2>
            
            <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {desc ? desc.replace(/<[^>]*>?/gm, "").slice(0, 90) : "Discover detailed insights and AI-assisted content..."}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Read Article</span>
            <span>→</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
