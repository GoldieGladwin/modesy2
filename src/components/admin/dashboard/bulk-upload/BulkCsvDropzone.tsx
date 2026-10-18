"use client";

import React, { useRef, useState } from "react";
import { FileText, X } from "lucide-react";

interface BulkCsvDropzoneProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  error?: boolean;
}

export default function BulkCsvDropzone({
  file,
  onFileSelect,
  error = false,
}: BulkCsvDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.name.endsWith(".csv") ||
        droppedFile.type === "text/csv" ||
        droppedFile.type === "application/vnd.ms-excel"
      ) {
        onFileSelect(droppedFile);
      } else {
        alert("Please upload a valid CSV file (.csv)");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className="block text-[12px] font-semibold text-[#333] mb-1.5">
        CSV File
      </label>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Dropzone container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border border-dashed rounded-[4px] py-8 px-4 flex flex-col items-center justify-center transition-all ${
          isDragging
            ? "border-[#00a99d] bg-teal-50/30"
            : error
            ? "border-[#f05023] bg-red-50/10"
            : "border-[#d2d6de] bg-[#fafafa] hover:bg-[#f6f6f6]"
        }`}
      >
        {!file ? (
          <>
            {/* Custom Cloud Icon matching screenshot */}
            <div className="w-10 h-8 flex items-center justify-center">
              <svg width="36" height="28" viewBox="0 0 48 38" fill="none">
                <path
                  d="M38.5 15.5C37.5 7.5 30.5 2 22 2C15 2 9 6.5 7.5 13C3 14 0 18 0 23C0 28.5 4.5 33 10 33H38C43.5 33 48 28.5 48 23C48 18.5 44 14.5 38.5 15.5Z"
                  fill="#94a3b8"
                />
                <path
                  d="M24 11L16 20H21V28H27V20H32L24 11Z"
                  fill="white"
                />
              </svg>
            </div>

            <p className="text-xs text-[#718096] mt-2 select-none">
              Drag and drop file here or
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-2.5 bg-white border border-[#cbd5e0] hover:bg-gray-50 text-[#4a5568] px-4 py-1.5 rounded-[3px] text-xs font-medium transition cursor-pointer shadow-2xs"
            >
              Browse Files
            </button>
          </>
        ) : (
          /* File Selected View */
          <div className="flex items-center gap-3 bg-white border border-[#e2e8f0] rounded-[4px] px-4 py-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded bg-teal-50 text-[#00a99d] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-gray-800 truncate max-w-xs sm:max-w-md">
                {file.name}
              </p>
              <p className="text-[11px] text-gray-500">
                {(file.size / 1024).toFixed(1)} KB &bull; Ready to upload
              </p>
            </div>
            <button
              type="button"
              onClick={() => onFileSelect(null)}
              className="ml-3 text-gray-400 hover:text-red-500 transition cursor-pointer p-1"
              title="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
