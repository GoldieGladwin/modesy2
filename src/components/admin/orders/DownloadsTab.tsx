'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { DownloadCloud, Star, ChevronDown, Check } from 'lucide-react';
import { DownloadItem } from './types';

interface DownloadsTabProps {
  downloads: DownloadItem[];
}

export default function DownloadsTab({ downloads: initialDownloads }: DownloadsTabProps) {
  const [downloads, setDownloads] = useState<DownloadItem[]>(initialDownloads);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(initialDownloads[0]?.id || null);
  const [hoverRating, setHoverRating] = useState<{ [id: string]: number }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRate = (id: string, rating: number, title: string) => {
    setDownloads((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating } : item))
    );
    showToast(`Thank you! You rated "${title}" with ${rating} stars.`);
  };

  // Real file download trigger
  const handleDownloadMainFiles = (item: DownloadItem) => {
    setOpenDropdownId(null);
    showToast(`Downloading Main File(s) for "${item.title}"...`);

    // Create a real downloadable text/zip blob for the customer
    const content = `Modesy Marketplace - Digital Product Package\n==========================================\nProduct: ${item.title}\nSeller: ${item.seller}\nLicense: Regular License\nDate: ${new Date().toLocaleDateString()}\nStatus: Verified\n\nThank you for purchasing on Modesy Marketplace!`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-main-files.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCertificate = (item: DownloadItem) => {
    setOpenDropdownId(null);
    showToast(`Downloading License Certificate for "${item.title}"...`);

    const productSlug = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const productUrl = `https://modesy.codingest.net/${productSlug}-39`;
    const purchaseCode =
      item.licenseKey || '6ab206c3e12127-30361188-323655-239483';

    // Exact text format matching user's Notepad screenshot
    const certificateContent = `MODESY LICENSE CERTIFICATE
==================================================

Product:
${item.title}

Product URL:
${productUrl}

Seller:
${item.seller}

Buyer:
Admin

Purchase Code:
${purchaseCode}
`;

    const blob = new Blob([certificateContent], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `license_certificate_${productSlug}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 min-w-0" ref={dropdownRef}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-600 text-white text-xs font-medium rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Downloads List matching Screenshot */}
      <div className="space-y-4">
        {downloads.map((item) => {
          const currentStars = hoverRating[item.id] !== undefined ? hoverRating[item.id] : item.rating;
          const isDropdownOpen = openDropdownId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-[4px] p-5 transition-all hover:border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)] relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Thumbnail & Title */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] shrink-0 rounded-[3px] border border-gray-100 overflow-hidden relative bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="92px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-xs sm:text-[13px] leading-tight truncate hover:text-[#00a99d] cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {item.seller}
                    </p>
                  </div>
                </div>

                {/* Rating Widget matching Screenshot */}
                <div className="shrink-0 flex flex-col sm:items-start min-w-[150px]">
                  <span className="text-gray-600 text-xs font-normal mb-1">
                    Rate this product:
                  </span>
                  <div
                    className="flex items-center gap-1"
                    onMouseLeave={() =>
                      setHoverRating((prev) => {
                        const copy = { ...prev };
                        delete copy[item.id];
                        return copy;
                      })
                    }
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRate(item.id, star, item.title)}
                        onMouseEnter={() =>
                          setHoverRating((prev) => ({ ...prev, [item.id]: star }))
                        }
                        className="cursor-pointer transition-transform hover:scale-110 p-0.5"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= currentStars
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download Button with Dropdown matching Screenshot */}
                <div className="shrink-0 relative">
                  <button
                    type="button"
                    onClick={() => setOpenDropdownId(isDropdownOpen ? null : item.id)}
                    className={`w-full sm:w-[145px] md:w-[150px] px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition ${
                      isDropdownOpen ? 'rounded-t-[3px]' : 'rounded-[3px]'
                    }`}
                  >
                    <DownloadCloud className="w-4 h-4 stroke-[2.2]" />
                    <span>Download</span>
                    <ChevronDown className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>

                  {/* Dropdown Menu attached below button matching screenshot */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full w-full sm:w-[145px] md:w-[150px] bg-white border border-gray-200 border-t-0 rounded-b-[3px] shadow-lg z-30 py-1 text-xs animate-in fade-in duration-100">
                      <button
                        type="button"
                        onClick={() => handleDownloadMainFiles(item)}
                        className="w-full text-left px-3.5 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition font-medium cursor-pointer block"
                      >
                        Main File(s)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadCertificate(item)}
                        className="w-full text-left px-3.5 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00a99d] transition font-medium cursor-pointer block border-t border-gray-50"
                      >
                        License Certificate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {downloads.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-[4px] p-12 text-center text-gray-500">
            <p className="text-sm">No digital downloads available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
