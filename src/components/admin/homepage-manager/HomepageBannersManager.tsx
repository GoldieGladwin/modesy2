"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  ArrowUpDown,
  X,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { ModesyBannerItem } from "@/types/uliladmin";

interface Props {
  onNotify?: (msg: string) => void;
  onEditBanner?: (banner: ModesyBannerItem) => void;
}

const INITIAL_BANNERS: ModesyBannerItem[] = [
  {
    id: 5,
    imageUrl: "/uploads/banners/block_68b02a364b90c6-71529931.webp",
    url: "https://modesy.codingest.net/shoes",
    language: "English",
    order: 2,
    width: "33.33%",
    location: "New Arrivals",
  },
  {
    id: 4,
    imageUrl: "/uploads/banners/block_68b02a59a1d144-08234125.webp",
    url: "https://modesy.codingest.net/clothing/womens-clothing",
    language: "English",
    order: 3,
    width: "33.33%",
    location: "New Arrivals",
  },
  {
    id: 3,
    imageUrl: "/uploads/banners/block_68b02a364b90c6-71529931.webp",
    url: "https://modesy.codingest.net/home-living",
    language: "English",
    order: 1,
    width: "33.33%",
    location: "New Arrivals",
  },
  {
    id: 2,
    imageUrl: "/uploads/banners/block_68b02a59a1d144-08234125.webp",
    url: "https://modesy.codingest.net/jewelry-accessories",
    language: "English",
    order: 2,
    width: "50%",
    location: "Special Offers",
  },
  {
    id: 1,
    imageUrl: "/uploads/banners/block_68b02a364b90c6-71529931.webp",
    url: "https://modesy.codingest.net/clothing",
    language: "English",
    order: 1,
    width: "50%",
    location: "Special Offers",
  },
];

export default function HomepageBannersManager({ onNotify, onEditBanner }: Props) {
  const [banners, setBanners] = useState<ModesyBannerItem[]>(INITIAL_BANNERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<ModesyBannerItem | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Form states matching Screenshot 1
  const [language, setLanguage] = useState("English");
  const [bannerUrl, setBannerUrl] = useState("");
  const [order, setOrder] = useState("");
  const [bannerWidth, setBannerWidth] = useState("50");
  const [location, setLocation] = useState<
    "Featured Categories" | "Special Offers" | "Featured Products" | "New Arrivals"
  >("Featured Categories");
  const [selectedImage, setSelectedImage] = useState(
    "/uploads/banners/block_68b02a364b90c6-71529931.webp"
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      setDeletingId(id);
      setTimeout(() => {
        setBanners((prev) => prev.filter((b) => b.id !== id));
        setDeletingId(null);
        if (onNotify) onNotify(`Banner #${id} deleted successfully!`);
      }, 200);
    }
  };

  const openAddModal = () => {
    setEditingBanner(null);
    setLanguage("English");
    setBannerUrl("");
    setOrder(String(banners.length + 1));
    setBannerWidth("50");
    setLocation("Featured Categories");
    setSelectedImage("/uploads/banners/block_68b02a364b90c6-71529931.webp");
    setIsModalOpen(true);
  };

  const openEditModal = (b: ModesyBannerItem) => {
    if (onEditBanner) {
      onEditBanner(b);
      return;
    }
    setEditingBanner(b);
    setLanguage(b.language);
    setBannerUrl(b.url);
    setOrder(String(b.order));
    setBannerWidth(b.width.replace("%", ""));
    setLocation(b.location as any);
    setSelectedImage(b.imageUrl);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedWidth = bannerWidth ? `${bannerWidth}%` : "50%";
    const parsedOrder = Number(order) || 1;

    if (editingBanner) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingBanner.id
            ? {
                ...b,
                url: bannerUrl,
                language,
                order: parsedOrder,
                width: formattedWidth,
                location,
                imageUrl: selectedImage,
              }
            : b
        )
      );
      if (onNotify) onNotify("Banner updated successfully!");
    } else {
      const nextId = banners.length
        ? Math.max(...banners.map((b) => b.id)) + 1
        : 1;
      const newBanner: ModesyBannerItem = {
        id: nextId,
        imageUrl: selectedImage,
        url: bannerUrl || "https://modesy.codingest.net/",
        language,
        order: parsedOrder,
        width: formattedWidth,
        location,
      };
      setBanners((prev) => [newBanner, ...prev]);
      if (onNotify) onNotify("New banner added successfully!");
    }
    setIsModalOpen(false);
  };

  // Custom purple-checkmark radio button
  const RadioOption = ({
    value,
    label,
  }: {
    value: "Featured Categories" | "Special Offers" | "Featured Products" | "New Arrivals";
    label: string;
  }) => {
    const isChecked = location === value;

    return (
      <label
        onClick={() => setLocation(value)}
        className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-gray-700 py-1"
      >
        <div
          className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200 ${
            isChecked
              ? "bg-[#5046e5] text-white ring-2 ring-[#5046e5]/20"
              : "border-2 border-gray-300 bg-white hover:border-gray-400"
          }`}
        >
          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
        </div>
        <span className="font-normal text-gray-800">{label}</span>
      </label>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xs p-6 shadow-none transition-shadow hover:shadow-xs">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-700">Homepage Banners</h2>
          <p className="text-xs text-gray-500">
            You can manage the product banners on the homepage from this section
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2 bg-[#20c997] hover:bg-[#1baa80] text-white text-xs font-medium rounded-xs transition inline-flex items-center gap-1.5 self-start sm:self-auto shadow-none cursor-pointer active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          Add Banner
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-t border-gray-100">
        <table className="w-full text-left text-xs text-gray-600">
          <thead className="text-gray-700 font-semibold border-b border-gray-200">
            <tr>
              <th className="py-3 px-3 w-12">
                <div className="flex items-center gap-1">
                  <span>Id</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Banner</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>URL</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Language</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Order</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Banner Width</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
              </th>
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Location</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
              </th>
              <th className="py-3 px-3 w-28 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>Options</span>
                  <ArrowUpDown className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 transition" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banners.map((b) => {
              const isDeleting = deletingId === b.id;

              return (
                <tr
                  key={b.id}
                  className={`hover:bg-gray-50/70 transition-all duration-200 ${
                    isDeleting ? "opacity-0 -translate-x-3" : "opacity-100 translate-x-0"
                  }`}
                >
                  <td className="py-3.5 px-3 text-gray-700 font-normal">{b.id}</td>
                  <td className="py-3.5 px-3">
                    <div className="w-28 h-14 bg-gray-100 rounded-xs border border-gray-200 overflow-hidden flex items-center justify-center group relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.imageUrl}
                        alt={`Banner #${b.id}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-gray-600">
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline hover:text-[#0084ff] transition-colors"
                    >
                      {b.url}
                    </a>
                  </td>
                  <td className="py-3.5 px-3 text-gray-700">{b.language}</td>
                  <td className="py-3.5 px-3 text-gray-700">{b.order}</td>
                  <td className="py-3.5 px-3 text-gray-700">{b.width}</td>
                  <td className="py-3.5 px-3 text-gray-700">{b.location}</td>
                  <td className="py-3.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 justify-center">
                      <button
                        type="button"
                        onClick={() => openEditModal(b)}
                        className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-2.5 py-1 rounded-xs text-xs font-normal transition cursor-pointer active:scale-95"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(b.id)}
                        className="border border-gray-300 hover:bg-gray-50 hover:border-red-300 text-gray-600 hover:text-red-600 p-1.5 rounded-xs text-xs transition cursor-pointer active:scale-95"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination box (Square 1 on right side) */}
      <div className="mt-4 pt-3 flex justify-end">
        <div className="w-7 h-7 bg-[#0084ff] hover:bg-[#0073e6] text-white flex items-center justify-center text-xs font-semibold rounded-xs transition cursor-pointer shadow-none">
          1
        </div>
      </div>

      {/* EXACT MODESY "ADD BANNER" MODAL (MATCHING SCREENSHOT 1) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-4 animate-modal-backdrop">
          <div className="bg-white rounded-xs max-w-lg w-full shadow-2xl border border-gray-300 overflow-hidden animate-modal-dialog">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <h3 className="text-sm font-semibold text-gray-800">
                {editingBanner ? "Edit Banner" : "Add Banner"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer transition"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs">
              {/* 1. Language */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#0084ff] bg-white transition"
                >
                  <option value="English">English</option>
                  <option value="Indonesian">Indonesian</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>

              {/* 2. Banner URL */}
              <div>
                <input
                  type="text"
                  placeholder="Banner URL"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0084ff] transition"
                />
              </div>

              {/* 3. Order */}
              <div>
                <input
                  type="text"
                  placeholder="Order"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0084ff] transition"
                />
              </div>

              {/* 4. Banner Width (E.g: 50) + % Addon */}
              <div className="flex">
                <input
                  type="text"
                  placeholder="Banner Width (E.g: 50)"
                  value={bannerWidth}
                  onChange={(e) => setBannerWidth(e.target.value)}
                  className="flex-1 border border-r-0 border-gray-300 rounded-l-xs px-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0084ff] transition"
                />
                <span className="border border-gray-300 bg-gray-50 px-3.5 py-2 text-gray-500 font-medium text-xs rounded-r-xs flex items-center justify-center select-none">
                  %
                </span>
              </div>

              {/* 5. Location */}
              <div className="pt-1">
                <label className="block text-gray-700 font-semibold mb-2">
                  Location{" "}
                  <span className="text-[11px] font-normal text-gray-400">
                    (The banner will be added under the selected section)
                  </span>
                </label>
                <div className="space-y-1">
                  <RadioOption
                    value="Featured Categories"
                    label="Featured Categories"
                  />
                  <RadioOption
                    value="Special Offers"
                    label="Special Offers"
                  />
                  <RadioOption
                    value="Featured Products"
                    label="Featured Products"
                  />
                  <RadioOption
                    value="New Arrivals"
                    label="New Arrivals"
                  />
                </div>
              </div>

              {/* 6. Banner File Picker */}
              <div className="pt-1">
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Banner
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xs cursor-pointer transition active:scale-95 shadow-none">
                  <ImageIcon className="w-3.5 h-3.5 text-gray-500" />
                  <span>Select Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const url = URL.createObjectURL(file);
                        setSelectedImage(url);
                      }
                    }}
                  />
                </label>

                {/* Thumbnail Preview */}
                {selectedImage && (
                  <div className="mt-2.5 w-32 h-16 bg-gray-50 rounded-xs border border-gray-200 overflow-hidden relative animate-in fade-in">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedImage}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#20c997] hover:bg-[#1baa80] text-white font-medium rounded-xs transition shadow-none cursor-pointer active:scale-95"
                >
                  {editingBanner ? "Save Changes" : "Add Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
