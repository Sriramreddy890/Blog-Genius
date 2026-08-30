"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CircleUserRoundIcon, LogIn, Menu, X, Sparkles, PenSquare, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppData } from "@/context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, isAuth } = useAppData();

  return (
    <nav className="sticky top-0 z-50 glass-nav shadow-lg border-b border-slate-800/80">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
        {/* Brand Logo */}
        <Link href={"/blogs"} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              BlogGenius <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">AI</span>
            </span>
          </div>
        </Link>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <Button
            variant={"ghost"}
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white hover:bg-slate-800/60"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href={"/blogs"}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
          >
            Explore Blogs
          </Link>

          {isAuth && (
            <>
              <Link
                href={"/blog/saved"}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors duration-200"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Saved</span>
              </Link>

              <Link href={"/blog/new"}>
                <Button className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-md shadow-purple-500/20 flex items-center gap-2 border border-purple-400/20 transition-all duration-300 hover:scale-105">
                  <PenSquare className="w-4 h-4" />
                  <span>Create Post</span>
                </Button>
              </Link>
            </>
          )}

          {!loading && (
            <div>
              {isAuth ? (
                <Link
                  href={"/profile"}
                  className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all duration-200"
                >
                  <CircleUserRoundIcon className="w-5 h-5" />
                </Link>
              ) : (
                <Link href={"/login"}>
                  <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl text-sm flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-800/80 bg-slate-900/95 backdrop-blur-xl",
          isOpen ? "max-h-60 opacity-100 py-4 px-6" : "max-h-0 opacity-0 py-0 px-6"
        )}
      >
        <div className="flex flex-col space-y-4 text-slate-300">
          <Link
            href={"/blogs"}
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium hover:text-indigo-400 transition-colors"
          >
            Explore Blogs
          </Link>

          {isAuth && (
            <>
              <Link
                href={"/blog/saved"}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium hover:text-indigo-400 transition-colors flex items-center gap-2"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Saved Blogs</span>
              </Link>
              <Link
                href={"/blog/new"}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-purple-400 flex items-center gap-2"
              >
                <PenSquare className="w-4 h-4" />
                <span>Create New Post</span>
              </Link>
            </>
          )}

          {!loading && (
            <div className="pt-2 border-t border-slate-800">
              {isAuth ? (
                <Link
                  href={"/profile"}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium flex items-center gap-2 text-slate-200"
                >
                  <CircleUserRoundIcon className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
              ) : (
                <Link
                  href={"/login"}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium flex items-center gap-2 text-indigo-400"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
