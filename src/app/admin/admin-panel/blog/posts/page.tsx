"use client";

import React, { useState, useMemo } from "react";
import BlogPostHeader from "@/components/admin/blog/posts/BlogPostHeader";
import BlogPostFilterBar from "@/components/admin/blog/posts/BlogPostFilterBar";
import BlogPostTable from "@/components/admin/blog/posts/BlogPostTable";
import { INITIAL_BLOG_POSTS } from "@/components/admin/blog/posts/mockData";
import { BlogPost } from "@/components/admin/blog/posts/types";

export default function AdminBlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [pageSize, setPageSize] = useState<number>(15);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");

  const handleFilterSubmit = () => {
    setAppliedSearch(searchTerm);
  };

  const handleAddPost = () => {
    alert("Add Post modal or editor will open here.");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (post: BlogPost) => {
    const newTitle = window.prompt("Edit Post Title:", post.title);
    if (newTitle && newTitle.trim()) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, title: newTitle.trim() } : p))
      );
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesLang =
        selectedLanguage === "All" ||
        p.language.toLowerCase() === selectedLanguage.toLowerCase();
      const matchesSearch =
        !appliedSearch.trim() ||
        p.title.toLowerCase().includes(appliedSearch.trim().toLowerCase()) ||
        p.category.toLowerCase().includes(appliedSearch.trim().toLowerCase());
      return matchesLang && matchesSearch;
    });
  }, [posts, selectedLanguage, appliedSearch]);

  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, pageSize);
  }, [filteredPosts, pageSize]);

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto font-sans text-[#333]">
      {/* 1. Page Header with Add Post Button */}
      <BlogPostHeader onAddPost={handleAddPost} />

      {/* 2. White Card Container */}
      <div className="bg-white border border-[#d2d6de] rounded-[4px] p-5 sm:p-6 shadow-xs">
        {/* Filter Bar */}
        <BlogPostFilterBar
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterSubmit={handleFilterSubmit}
        />

        {/* Table */}
        <BlogPostTable
          posts={displayedPosts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
