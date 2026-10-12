"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { Folder, Clock } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";
import { blogPostsData } from "@/data/blogs";

interface BlogDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { category, slug } = use(params);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // Find post by slug
  const post = blogPostsData.find((p) => p.slug === slug || p.slug === decodeURIComponent(slug));

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex-1">
        <h1 className="text-2xl font-bold text-gray-800">Article Not Found</h1>
        <Link href="/guest/blog" className="mt-4 inline-block text-[#00a99d] hover:underline text-sm font-semibold">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  // Related posts (excluding current)
  const relatedPosts = blogPostsData
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  // Latest posts for sidebar
  const latestPosts = blogPostsData.slice(0, 3);

  const tagsList = [
    "eco friendly",
    "everyday fashion",
    "personal branding",
    "lifestyle",
    "fashion tips",
    "footwear",
    "gift ideas",
    "self care",
    "comfort",
    "ethical shopping",
  ];

  return (
    <div className="w-full">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 w-full">
        <nav className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span>/</span>
          <Link href="/guest/blog" className="hover:text-[#00a99d]">
            Blog
          </Link>
          <span>/</span>
          <Link
            href={`/guest/blog?category=${encodeURIComponent(post.category)}`}
            className="hover:text-[#00a99d]"
          >
            {post.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN: MAIN ARTICLE ================= */}
          <article className="lg:col-span-8 bg-white border border-gray-200 rounded-sm p-6 sm:p-8 space-y-6">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-gray-400 pb-2 border-b border-gray-100">
              <Link
                href={`/guest/blog?category=${encodeURIComponent(post.category)}`}
                className="flex items-center gap-1 hover:text-[#1963d8] transition"
              >
                <Folder className="w-3.5 h-3.5 text-gray-400" />
                <span>{post.category}</span>
              </Link>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{post.time}</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden rounded-xs">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle Watermark overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-white/40 font-extrabold text-4xl sm:text-6xl tracking-widest drop-shadow-md">
                  Modesy
                </span>
              </div>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed pt-2">
              {post.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Article Tags */}
            <div className="pt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[11px] rounded transition cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Social Share Bar */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-gray-700 tracking-wider">SHARE</span>
              <button
                type="button"
                onClick={() => alert("Share to Facebook")}
                className="px-3.5 py-1.5 bg-[#3b5998] hover:bg-[#324b80] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Facebook</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Share to X")}
                className="px-3.5 py-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>𝕏</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Share to WhatsApp")}
                className="px-3.5 py-1.5 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Share to Pinterest")}
                className="px-3.5 py-1.5 bg-[#cb2027] hover:bg-[#b01c22] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Pinterest</span>
              </button>
            </div>

            {/* Related Posts */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
                Related Posts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    className="border border-gray-200 rounded-sm overflow-hidden flex flex-col hover:shadow-sm transition"
                  >
                    <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                      <Link href={`/guest/blog/${rel.categorySlug}/${rel.slug}`}>
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        />
                      </Link>
                    </div>
                    <div className="p-3 space-y-1.5">
                      <Link href={`/guest/blog/${rel.categorySlug}/${rel.slug}`}>
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-2 hover:text-[#1963d8]">
                          {rel.title}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rel.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Folder className="w-3 h-3" />
                          {rel.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="pt-8 border-t border-gray-100 space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-2 inline-block">
                  Comments
                </span>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Comment submitted!"); }} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <textarea
                  placeholder="Comment"
                  rows={4}
                  required
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
                ></textarea>

                {/* Cloudflare Turnstile simulation box */}
                <div className="w-full max-w-[240px] bg-white border border-gray-300 rounded p-2 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px]">
                      ✓
                    </div>
                    <span className="text-xs font-medium text-gray-700">Success!</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-800">CLOUDFLARE</span>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded transition cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </article>

          {/* ================= RIGHT COLUMN: SIDEBAR ================= */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 1. Latest Posts */}
            <div className="bg-white border border-gray-200 rounded-sm p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
                Latest Posts
              </h3>
              <div className="space-y-4">
                {latestPosts.map((lp) => (
                  <div key={lp.id} className="space-y-1.5 group">
                    <Link
                      href={`/guest/blog/${lp.categorySlug}/${lp.slug}`}
                      className="block aspect-[16/10] bg-gray-100 overflow-hidden rounded-xs"
                    >
                      <img
                        src={lp.image}
                        alt={lp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </Link>
                    <Link href={`/guest/blog/${lp.categorySlug}/${lp.slug}`}>
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-2 group-hover:text-[#1963d8] transition">
                        {lp.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lp.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Folder className="w-3 h-3" />
                        {lp.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Tags Cloud */}
            <div className="bg-white border border-gray-200 rounded-sm p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {tagsList.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[11px] rounded-xs cursor-pointer transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
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
