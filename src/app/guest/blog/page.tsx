"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Folder, Clock } from "lucide-react";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import LoginModal from "@/components/auth/LoginModal";
import { blogPostsData } from "@/data/blogs";

export default function BlogListingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Life Style", "Fashion", "Business"];

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return blogPostsData;
    return blogPostsData.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 w-full">
        <nav className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Blog</span>
        </nav>
      </div>

      {/* Main Blog Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex-1 w-full space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Blog
        </h1>

        {/* Category Filter Pills (Matches Screenshot) */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold transition cursor-pointer ${activeCategory === cat
                  ? "bg-[#00a99d] text-white shadow-2xs"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts 3-Column Grid (Matches Screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                <Link href={`/blog/${post.categorySlug}/${post.slug}`} className="block w-full h-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <Link href={`/blog/${post.categorySlug}/${post.slug}`}>
                    <h2 className="text-base font-bold text-gray-900 line-clamp-2 hover:text-[#1963d8] leading-snug transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Meta: Category & Date */}
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-2 mb-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveCategory(post.category)}
                      className="flex items-center gap-1 hover:text-[#1963d8] transition cursor-pointer"
                    >
                      <Folder className="w-3.5 h-3.5 text-gray-400 stroke-[1.5]" />
                      <span>{post.category}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400 stroke-[1.5]" />
                      <span>{post.time}</span>
                    </div>
                  </div>

                  {/* Snippet */}
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
