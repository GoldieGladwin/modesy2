"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronDown, Sparkles, Loader2 } from "lucide-react";

interface AiContentGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  onGenerate: (content: {
    title?: string;
    shortDescription: string;
    description: string;
  }) => void;
}

export default function AiContentGeneratorModal({
  isOpen,
  onClose,
  initialTopic = "",
  onGenerate,
}: AiContentGeneratorModalProps) {
  const [tone, setTone] = useState<string>("Neutral");
  const [lengthOfText, setLengthOfText] = useState<string>("Medium");
  const [topic, setTopic] = useState<string>(initialTopic);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync initial topic when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialTopic && !topic) {
        setTopic(initialTopic);
      }
      setError(null);
    }
  }, [isOpen, initialTopic]);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please describe the topic for content generation.");
      return;
    }

    setError(null);
    setIsGenerating(true);

    // Simulate AI generation with smart contextual templates based on inputs
    setTimeout(() => {
      const topicClean = topic.trim();

      // Tailored short description based on tone
      let shortDesc = "";
      if (tone === "Professional") {
        shortDesc = `Designed to meet high industry standards, this ${topicClean} offers dependable performance, refined aesthetics, and premium construction.`;
      } else if (tone === "Luxury") {
        shortDesc = `An exquisite expression of timeless luxury and artisan craftsmanship, meticulously created for the discerning connoisseur of ${topicClean}.`;
      } else if (tone === "Casual" || tone === "Enthusiastic") {
        shortDesc = `Add instant flair and charm to your everyday wardrobe with our delightful ${topicClean}, crafted for all-day comfort and easy styling!`;
      } else {
        shortDesc = `Made from soft lightweight materials, this ${topicClean} is perfect for versatile everyday use, combining practical comfort with effortless style.`;
      }

      // Detailed rich description based on length
      let descParagraphs = "";
      if (lengthOfText === "Short") {
        descParagraphs = `<p>The <strong>${topicClean}</strong> is a wonderful choice for enhancing your daily routine with personality and reliable quality. Made with carefully selected materials, it blends comfort and style seamlessly.</p>
<p>Whether worn casually or paired for formal occasions, its timeless design ensures it remains a versatile favorite in your collection.</p>`;
      } else if (lengthOfText === "Long") {
        descParagraphs = `<p>The <strong>${topicClean}</strong> is a delightful way to elevate any outfit with a burst of vibrancy and personality. Made from soft, lightweight materials, each piece is engineered for effortless layering and year-round elegance.</p>
<p>Featuring unique patterns, tailored finishes, and an array of eye-catching tones, it is ideal for adding a polished touch to both casual and formal ensembles. Whether you prefer minimalist aesthetics, bold geometric designs, or classic artistic accents, there is a style to match your distinct individuality.</p>
<p>Versatile and easy to style, it can be styled in multiple creative ways to suit any occasion. Embrace everyday sophistication with unmatched comfort, durable craftsmanship, and contemporary flair designed to stand the test of time.</p>
<p><strong>Care Instructions:</strong> Gently hand wash or spot clean with mild detergent to preserve fabric softness and color brilliance.</p>`;
      } else {
        // Medium length (Exact style from Modesy screenshot)
        descParagraphs = `<p>The <strong>${topicClean}</strong> is a delightful way to elevate any outfit with a burst of vibrancy and personality. Made from soft, lightweight materials, this piece is perfect for layering throughout the seasons.</p>
<p>Each item features unique patterns and an array of eye-catching colors, making them ideal for adding a touch of style to both casual and formal looks. Whether you prefer bold florals, geometric designs, or abstract prints, it effortlessly complements your individual taste.</p>
<p>Versatile and easy to style, this accessory blends comfort and fashion effortlessly for every fashion-forward wearer.</p>`;
      }

      onGenerate({
        title: topicClean,
        shortDescription: shortDesc,
        description: descParagraphs,
      });

      setIsGenerating(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
      {/* Modal Dialog Card (Persis Screenshot) */}
      <div
        className="w-full max-w-[620px] bg-white rounded-[4px] shadow-2xl overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
          <h2 className="text-[15px] font-semibold text-[#333]">
            AI Content Generator
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleGenerate} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-[3px]">
              {error}
            </div>
          )}

          {/* Row 1: Tone/Style & Length of Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tone/Style */}
            <div>
              <label className="block text-xs font-semibold text-[#555] mb-1.5">
                Tone/Style <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full h-[36px] px-3 pr-8 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none focus:border-[#0084ff] transition-colors cursor-pointer"
                >
                  <option value="Neutral">Neutral</option>
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
                  <option value="Enthusiastic">Enthusiastic</option>
                  <option value="Creative">Creative</option>
                  <option value="Persuasive">Persuasive</option>
                  <option value="Informative">Informative</option>
                  <option value="Luxury">Luxury</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Length of Text */}
            <div>
              <label className="block text-xs font-semibold text-[#555] mb-1.5">
                Length of Text <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={lengthOfText}
                  onChange={(e) => setLengthOfText(e.target.value)}
                  className="w-full h-[36px] px-3 pr-8 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] bg-white appearance-none outline-none focus:border-[#0084ff] transition-colors cursor-pointer"
                >
                  <option value="Short">Short</option>
                  <option value="Medium">Medium</option>
                  <option value="Long">Long</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Topic */}
          <div>
            <label className="block text-xs font-semibold text-[#555] mb-1.5">
              Topic <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (error) setError(null);
              }}
              placeholder="E.g. Handmade leather bags or sustainable fashion..."
              className="w-full p-3 border border-[#d2d6de] rounded-[3px] text-xs text-[#555] placeholder-gray-400 outline-none focus:border-[#0084ff] transition-colors resize-y leading-relaxed"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Briefly describe what you want the article to be about.
            </p>
          </div>

          {/* Footer Centered Button (Persis Screenshot) */}
          <div className="flex justify-center pt-3">
            <button
              type="submit"
              disabled={isGenerating}
              className="h-[36px] px-5 bg-[#0d6efd] hover:bg-[#0b5ed7] disabled:opacity-70 text-white text-xs font-semibold rounded-[3px] shadow-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Content...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
