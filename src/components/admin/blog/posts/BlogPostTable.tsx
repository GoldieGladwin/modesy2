"use client";

import React from "react";
import Image from "next/image";
import { BlogPost } from "./types";
import BlogPostRowOptions from "./BlogPostRowOptions";

interface BlogPostTableProps {
  posts: BlogPost[];
  onEdit?: (post: BlogPost) => void;
  onDelete?: (id: number) => void;
}

export default function BlogPostTable({
  posts,
  onEdit,
  onDelete,
}: BlogPostTableProps) {
  if (posts.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 bg-white border border-gray-100 rounded-[4px]">
        No blog posts found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-[#333333] text-[14px] font-semibold">
            <th className="py-3 px-3.5 w-14 font-semibold">Id</th>
            <th className="py-3 px-3.5 font-semibold">Title</th>
            <th className="py-3 px-3.5 font-semibold">Language</th>
            <th className="py-3 px-3.5 font-semibold">Category</th>
            <th className="py-3 px-3.5 font-semibold">Date</th>
            <th className="py-3 px-3.5 font-semibold">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-[13px] text-[#555555]">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-[#fbfcfd] transition-colors">
              <td className="py-3.5 px-3.5 text-[#6c757d]">{post.id}</td>
              <td className="py-3.5 px-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 relative rounded-[2px] overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-normal text-[#333333] hover:text-[#007bff] cursor-pointer transition-colors max-w-md line-clamp-2">
                    {post.title}
                  </span>
                </div>
              </td>
              <td className="py-3.5 px-3.5 whitespace-nowrap">{post.language}</td>
              <td className="py-3.5 px-3.5 whitespace-nowrap">{post.category}</td>
              <td className="py-3.5 px-3.5 text-[#777777] whitespace-nowrap text-[12.5px]">
                {post.date}
              </td>
              <td className="py-3.5 px-3.5 whitespace-nowrap">
                <BlogPostRowOptions
                  post={post}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
