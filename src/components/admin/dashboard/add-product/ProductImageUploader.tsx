"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, AlertCircle, X, Check } from "lucide-react";

export interface UploadedImage {
  id: string;
  url: string;
  isMain: boolean;
  name: string;
}

interface ProductImageUploaderProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
}

export default function ProductImageUploader({
  images,
  onImagesChange,
}: ProductImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newImages: UploadedImage[] = Array.from(fileList).map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      isMain: images.length === 0 && idx === 0,
      name: file.name,
    }));

    onImagesChange([...images, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const setMainImage = (id: string) => {
    onImagesChange(
      images.map((img) => ({
        ...img,
        isMain: img.id === id,
      }))
    );
  };

  const removeImage = (id: string) => {
    const filtered = images.filter((img) => img.id !== id);
    if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
      filtered[0].isMain = true;
    }
    onImagesChange(filtered);
  };

  return (
    <div className="space-y-3">
      <label className="block text-[15px] font-semibold text-[#333]">
        Images
      </label>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-[4px] py-12 px-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-[#00a99d] bg-teal-50/20"
            : "border-[#e2e8f0] bg-[#fafbfc] hover:bg-[#f7fafc]"
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          {/* Cloud with arrow up outline icon */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#94a3b8]">
            <UploadCloud className="w-12 h-12 stroke-[1.2]" />
          </div>
          <div className="text-sm text-[#718096]">
            Drag and drop images here or{" "}
            <span className="text-[#00a99d] underline font-medium">
              Browse Files
            </span>
          </div>
        </div>
      </div>

      {/* Preview Grid if any images uploaded */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative group aspect-square rounded border overflow-hidden bg-gray-50 ${
                img.isMain ? "ring-2 ring-[#00a99d]" : "border-gray-200"
              }`}
            >
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-full object-cover"
              />
              {/* Delete button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(img.id);
                }}
                className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {/* Main Badge/Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMainImage(img.id);
                }}
                className={`absolute bottom-1 left-1 text-[11px] px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
                  img.isMain
                    ? "bg-[#00a99d] text-white"
                    : "bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-[#00a99d]"
                }`}
              >
                {img.isMain && <Check className="w-3 h-3" />}
                Main
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info Notice (Persis Screenshot 1) */}
      <div className="flex items-center gap-2 text-xs text-[#8c94a0] pt-1">
        <AlertCircle className="w-4 h-4 shrink-0 text-[#8c94a0]" />
        <span>
          You can click on the &quot;Main&quot; button on the images to select the main image of your product
        </span>
      </div>
    </div>
  );
}
