"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { List } from "lucide-react";
import HelpCenterArticleForm from "./HelpCenterArticleForm";
import { HelpArticle } from "./types";
import {
  getArticleBySlug,
  INITIAL_HELP_ARTICLES,
} from "./helpCenterData";

export default function EditArticleView() {
  const params = useParams();
  const slugParam = (params?.slug as string) || "";
  const decodedSlug = decodeURIComponent(slugParam);

  const [article, setArticle] = useState<HelpArticle | null | undefined>(undefined);

  useEffect(() => {
    if (!decodedSlug) return;
    const found =
      getArticleBySlug(decodedSlug) ||
      INITIAL_HELP_ARTICLES.find((a) => a.slug === decodedSlug);
    setArticle(found || null);
  }, [decodedSlug]);

  if (article === undefined) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center text-gray-500 text-xs">
        Loading article data for slug:{" "}
        <span className="font-mono text-purple-700">{decodedSlug}</span>...
      </div>
    );
  }

  if (article === null) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          Article Not Found
        </h2>
        <p className="text-xs text-gray-500 mb-5">
          No Help Center article found with the slug:{" "}
          <span className="font-mono text-red-600 font-semibold">{decodedSlug}</span>
        </p>
        <Link
          href="/admin/admin-panel/help-center"
          className="px-4 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs rounded-[3px] inline-flex items-center gap-1.5 transition-colors"
        >
          <List className="w-4 h-4" />
          <span>Back to Help Center</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <HelpCenterArticleForm mode="edit" initialArticle={article} />
    </div>
  );
}
