"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KnowledgeContentItem } from "./types";
import { getContentBySlug, INITIAL_KNOWLEDGE_CONTENTS } from "./helpCenterData";
import KnowledgeContentForm from "./KnowledgeContentForm";

export default function EditKnowledgeContentView() {
  const params = useParams();
  const slugParam = (params?.slug as string) || "";
  const decodedSlug = decodeURIComponent(slugParam);

  const [content, setContent] = useState<KnowledgeContentItem | null | undefined>(undefined);

  useEffect(() => {
    if (!decodedSlug) return;
    const found =
      getContentBySlug(decodedSlug) ||
      INITIAL_KNOWLEDGE_CONTENTS.find((c) => c.slug === decodedSlug);
    setContent(found || null);
  }, [decodedSlug]);

  if (content === undefined) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center text-gray-500 text-xs">
        Loading content data for slug:{" "}
        <span className="font-mono text-purple-700">{decodedSlug}</span>...
      </div>
    );
  }

  if (content === null) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center space-y-4">
        <h2 className="text-lg font-medium text-gray-800">Content Not Found</h2>
        <p className="text-sm text-gray-500">
          No knowledge base content was found matching the slug &quot;{decodedSlug}&quot;.
        </p>
        <Link
          href="/admin/admin-panel/help-center/knowledge-base"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00a65a] text-white text-xs rounded-[3px] hover:bg-[#008d4c]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Knowledge Base</span>
        </Link>
      </div>
    );
  }

  return <KnowledgeContentForm mode="edit" initialContent={content} />;
}
