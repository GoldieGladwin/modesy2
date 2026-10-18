"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  Plus,
  Image as ImageIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import CustomRadio from "./CustomRadio";
import { SliderItem, SliderSettings } from "./types";
import {
  SLIDER_LANGUAGES,
  SLIDER_ANIMATIONS,
  INITIAL_SLIDER_ITEMS,
  getStoredSliderItems,
  saveStoredSliderItems,
  deleteStoredSliderItem,
  saveSingleSliderItem,
  getStoredSliderSettings,
  saveStoredSliderSettings,
} from "./sliderData";

export default function SliderView() {
  const pathname = usePathname();
  const isModerator = pathname?.startsWith("/moderator");

  // Slider Items State (default to INITIAL_SLIDER_ITEMS so it's never empty)
  const [sliderItems, setSliderItems] = useState<SliderItem[]>(INITIAL_SLIDER_ITEMS);
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterLanguage, setFilterLanguage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sort state
  const [sortField, setSortField] = useState<keyof SliderItem>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Options dropdown & delete target
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SliderItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State (Add / Edit)
  const [editingItem, setEditingItem] = useState<SliderItem | null>(null);
  const [formLanguage, setFormLanguage] = useState<string>("English");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formLink, setFormLink] = useState<string>("");
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formButtonText, setFormButtonText] = useState<string>("");
  const [formTextColor, setFormTextColor] = useState<string>("#ffffff");
  const [formButtonColor, setFormButtonColor] = useState<string>("#000000");
  const [formButtonTextColor, setFormButtonTextColor] = useState<string>("#ffffff");
  const [formAnimTitle, setFormAnimTitle] = useState<string>("fadeInUp");
  const [formAnimDesc, setFormAnimDesc] = useState<string>("fadeInUp");
  const [formAnimBtn, setFormAnimBtn] = useState<string>("fadeInUp");
  const [formImage, setFormImage] = useState<string>("");
  const [formImageMobile, setFormImageMobile] = useState<string>("");

  // Slider Settings State
  const [settings, setSettings] = useState<SliderSettings>(getStoredSliderSettings());

  const dropdownRef = useRef<HTMLDivElement>(null);
  const desktopFileRef = useRef<HTMLInputElement>(null);
  const mobileFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSliderItems(getStoredSliderItems());
    setSettings(getStoredSliderSettings());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStartEdit = (item: SliderItem) => {
    setEditingItem(item);
    setFormLanguage(item.language);
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormLink(item.link);
    setFormOrder(item.order);
    setFormButtonText(item.buttonText);
    setFormTextColor(item.textColor || "#ffffff");
    setFormButtonColor(item.buttonColor || "#000000");
    setFormButtonTextColor(item.buttonTextColor || "#ffffff");
    setFormAnimTitle(item.animationTitle || "fadeInUp");
    setFormAnimDesc(item.animationDescription || "fadeInUp");
    setFormAnimBtn(item.animationButton || "fadeInUp");
    setFormImage(item.image);
    setFormImageMobile(item.imageMobile || "/images/slider/slider-1-mobile.webp");
    setOpenDropdownId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetForm = () => {
    setEditingItem(null);
    setFormLanguage("English");
    setFormTitle("");
    setFormDescription("");
    setFormLink("");
    setFormOrder(1);
    setFormButtonText("");
    setFormTextColor("#ffffff");
    setFormButtonColor("#000000");
    setFormButtonTextColor("#ffffff");
    setFormAnimTitle("fadeInUp");
    setFormAnimDesc("fadeInUp");
    setFormAnimBtn("fadeInUp");
    setFormImage("");
    setFormImageMobile("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalImage = formImage || "/images/slider/slider-1.webp";
    const finalImageMobile = formImageMobile || "/images/slider/slider-1-mobile.webp";

    if (editingItem) {
      const updated: SliderItem = {
        ...editingItem,
        language: formLanguage,
        title: formTitle.trim(),
        description: formDescription.trim(),
        link: formLink.trim(),
        order: Number(formOrder) || 1,
        buttonText: formButtonText.trim(),
        textColor: formTextColor,
        buttonColor: formButtonColor,
        buttonTextColor: formButtonTextColor,
        animationTitle: formAnimTitle,
        animationDescription: formAnimDesc,
        animationButton: formAnimBtn,
        image: finalImage,
        imageMobile: finalImageMobile,
      };

      const result = saveSingleSliderItem(updated);
      setSliderItems(result);
      triggerToast("Slider item updated successfully!");
      handleResetForm();
    } else {
      const currentList = getStoredSliderItems();
      const newId =
        currentList.length > 0
          ? Math.max(...currentList.map((i) => i.id)) + 1
          : 1;

      const newItem: SliderItem = {
        id: newId,
        language: formLanguage,
        title: formTitle.trim(),
        description: formDescription.trim(),
        link: formLink.trim(),
        order: Number(formOrder) || 1,
        buttonText: formButtonText.trim(),
        textColor: formTextColor,
        buttonColor: formButtonColor,
        buttonTextColor: formButtonTextColor,
        animationTitle: formAnimTitle,
        animationDescription: formAnimDesc,
        animationButton: formAnimBtn,
        image: finalImage,
        imageMobile: finalImageMobile,
      };

      const result = saveSingleSliderItem(newItem);
      setSliderItems(result);
      triggerToast("Slider item added successfully!");
      handleResetForm();
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSliderSettings(settings);
    triggerToast("Slider settings saved successfully!");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = deleteStoredSliderItem(deleteTarget.id);
    setSliderItems(updated);
    triggerToast(`Slider item #${deleteTarget.id} deleted successfully!`);
    setDeleteTarget(null);
  };

  const handleSort = (field: keyof SliderItem) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter & Sort Items
  const filteredItems = useMemo(() => {
    let result = [...sliderItems];

    if (filterLanguage !== "All") {
      result = result.filter((i) => i.language === filterLanguage);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.language.toLowerCase().includes(q) ||
          i.id.toString().includes(q) ||
          i.order.toString().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortField === "id" || sortField === "order") {
        return sortDirection === "asc"
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      }
      const aStr = String(a[sortField] || "").toLowerCase();
      const bStr = String(b[sortField] || "").toLowerCase();
      return sortDirection === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    return result;
  }, [sliderItems, filterLanguage, searchQuery, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const displayedItems = filteredItems.slice(
    startIndex,
    startIndex + pageSize
  );

  const renderSortIndicator = (field: keyof SliderItem) => {
    const isActive = sortField === field;
    return (
      <span className="inline-flex flex-col items-center justify-center ml-1.5 text-[8px] leading-[6px] select-none shrink-0">
        <span
          className={
            isActive && sortDirection === "asc"
              ? "text-[#111] font-black"
              : "text-[#c2c5c9]"
          }
        >
          ▲
        </span>
        <span
          className={`mt-[1px] ${
            isActive && sortDirection === "desc"
              ? "text-[#111] font-black"
              : "text-[#c2c5c9]"
          }`}
        >
          ▼
        </span>
      </span>
    );
  };

  const handleSelectDesktopImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormImage(url);
    }
  };

  const handleSelectMobileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormImageMobile(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[3px] shadow-xl max-w-sm w-full p-5 border border-gray-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-[15px] font-semibold text-gray-800">
                Delete Slider Item
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Are you sure you want to delete slider item{" "}
              <strong>"#{deleteTarget.id}"</strong>?
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-3.5 py-1.5 text-xs text-white bg-[#dd4b39] hover:bg-[#c23321] rounded-[3px] font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TWO COLUMNS LAYOUT: LEFT (Add & Settings) / RIGHT (Slider Items) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===================== LEFT COLUMN ===================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* CARD 1: ADD SLIDER ITEM (Screenshot 1 & 2) */}
          <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#f4f4f4] mb-4">
              <h2 className="text-[16px] font-normal text-[#333333]">
                {editingItem ? "Update Slider Item" : "Add Slider Item"}
              </h2>
              {editingItem && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs text-[#0073b7] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add New Item</span>
                </button>
              )}
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Language */}
              <div>
                <label className="block text-[13px] text-[#333333] mb-1.5">
                  Language
                </label>
                <div className="relative">
                  <select
                    value={formLanguage}
                    onChange={(e) => setFormLanguage(e.target.value)}
                    className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] transition-colors"
                  >
                    {SLIDER_LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[13px] text-[#333333] mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[13px] text-[#333333] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors resize-y"
                />
              </div>

              {/* Link */}
              <div>
                <label className="block text-[13px] text-[#333333] mb-1.5">
                  Link
                </label>
                <input
                  type="text"
                  placeholder="Link"
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                  className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
                />
              </div>

              {/* Order & Button Text (2 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] text-[#333333] mb-1.5">
                    Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    placeholder="Order"
                    value={formOrder}
                    onChange={(e) => setFormOrder(parseInt(e.target.value) || 1)}
                    className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-[#333333] mb-1.5">
                    Button Text
                  </label>
                  <input
                    type="text"
                    placeholder="Button Text"
                    value={formButtonText}
                    onChange={(e) => setFormButtonText(e.target.value)}
                    className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
                  />
                </div>
              </div>

              {/* Color Pickers (3 cols in screenshot: Text Color | Button Color | Button Text Color) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[12px] text-[#333333] mb-1.5 truncate">
                    Text Color
                  </label>
                  <div className="flex items-center border border-[#d2d6de] rounded-[3px] px-2 py-1 bg-white">
                    <input
                      type="color"
                      value={formTextColor}
                      onChange={(e) => setFormTextColor(e.target.value)}
                      className="w-full h-6 cursor-pointer border-0 p-0 rounded-[2px] bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] text-[#333333] mb-1.5 truncate">
                    Button Color
                  </label>
                  <div className="flex items-center border border-[#d2d6de] rounded-[3px] px-2 py-1 bg-white">
                    <input
                      type="color"
                      value={formButtonColor}
                      onChange={(e) => setFormButtonColor(e.target.value)}
                      className="w-full h-6 cursor-pointer border-0 p-0 rounded-[2px] bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] text-[#333333] mb-1.5 truncate">
                    Button Text Color
                  </label>
                  <div className="flex items-center border border-[#d2d6de] rounded-[3px] px-2 py-1 bg-white">
                    <input
                      type="color"
                      value={formButtonTextColor}
                      onChange={(e) => setFormButtonTextColor(e.target.value)}
                      className="w-full h-6 cursor-pointer border-0 p-0 rounded-[2px] bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Animations Section (Screenshot 1: Title | Description | Button dropdowns) */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                  Animations
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11.5px] text-[#555] mb-1 truncate">
                      Title
                    </label>
                    <div className="relative">
                      <select
                        value={formAnimTitle}
                        onChange={(e) => setFormAnimTitle(e.target.value)}
                        className="w-full bg-white border border-[#d2d6de] text-[12.5px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#0073b7]"
                      >
                        {SLIDER_ANIMATIONS.map((anim) => (
                          <option key={anim} value={anim}>
                            {anim}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11.5px] text-[#555] mb-1 truncate">
                      Description
                    </label>
                    <div className="relative">
                      <select
                        value={formAnimDesc}
                        onChange={(e) => setFormAnimDesc(e.target.value)}
                        className="w-full bg-white border border-[#d2d6de] text-[12.5px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#0073b7]"
                      >
                        {SLIDER_ANIMATIONS.map((anim) => (
                          <option key={anim} value={anim}>
                            {anim}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11.5px] text-[#555] mb-1 truncate">
                      Button
                    </label>
                    <div className="relative">
                      <select
                        value={formAnimBtn}
                        onChange={(e) => setFormAnimBtn(e.target.value)}
                        className="w-full bg-white border border-[#d2d6de] text-[12.5px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#0073b7]"
                      >
                        {SLIDER_ANIMATIONS.map((anim) => (
                          <option key={anim} value={anim}>
                            {anim}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image (2560x800) */}
              <div>
                <label className="block text-[13px] text-[#333333] mb-1.5">
                  Image (2560x800)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={desktopFileRef}
                  onChange={handleSelectDesktopImage}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => desktopFileRef.current?.click()}
                  className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[12px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Select Image</span>
                </button>
                {formImage && (
                  <div className="mt-2 relative w-full h-20 rounded-[3px] overflow-hidden border border-gray-200">
                    <Image
                      src={formImage}
                      alt="Slider Desktop Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Image (for mobile) (768x500) (Screenshot 2) */}
              <div>
                <label className="block text-[13px] text-[#333333] mb-1.5">
                  Image (for mobile) (768x500)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={mobileFileRef}
                  onChange={handleSelectMobileImage}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => mobileFileRef.current?.click()}
                  className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[12px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Select Image</span>
                </button>
                {formImageMobile && (
                  <div className="mt-2 relative w-36 h-20 rounded-[3px] overflow-hidden border border-gray-200">
                    <Image
                      src={formImageMobile}
                      alt="Slider Mobile Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button (Screenshot 2: Blue button at bottom right) */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
                >
                  {editingItem ? "Save Changes" : "Add Slider Item"}
                </button>
              </div>
            </form>
          </div>

          {/* CARD 2: SLIDER SETTINGS (Screenshot 2) */}
          <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5">
            <h2 className="text-[16px] font-normal text-[#333333] pb-3 border-b border-[#f4f4f4] mb-4">
              Slider Settings
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              {/* Status */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                  Status
                </label>
                <div className="flex items-center gap-6">
                  <CustomRadio
                    name="status"
                    label="Enable"
                    value="Enable"
                    checked={settings.status === "Enable"}
                    onChange={(val) =>
                      setSettings((prev) => ({ ...prev, status: val as "Enable" | "Disable" }))
                    }
                  />
                  <CustomRadio
                    name="status"
                    label="Disable"
                    value="Disable"
                    checked={settings.status === "Disable"}
                    onChange={(val) =>
                      setSettings((prev) => ({ ...prev, status: val as "Enable" | "Disable" }))
                    }
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                  Type
                </label>
                <div className="flex items-center gap-6">
                  <CustomRadio
                    name="type"
                    label="Full Width"
                    value="Full Width"
                    checked={settings.type === "Full Width"}
                    onChange={(val) =>
                      setSettings((prev) => ({
                        ...prev,
                        type: val as "Full Width" | "Boxed",
                      }))
                    }
                  />
                  <CustomRadio
                    name="type"
                    label="Boxed"
                    value="Boxed"
                    checked={settings.type === "Boxed"}
                    onChange={(val) =>
                      setSettings((prev) => ({
                        ...prev,
                        type: val as "Full Width" | "Boxed",
                      }))
                    }
                  />
                </div>
              </div>

              {/* Effect */}
              <div>
                <label className="block text-[13px] font-semibold text-[#333333] mb-2">
                  Effect
                </label>
                <div className="flex items-center gap-6">
                  <CustomRadio
                    name="effect"
                    label="Fade"
                    value="Fade"
                    checked={settings.effect === "Fade"}
                    onChange={(val) =>
                      setSettings((prev) => ({
                        ...prev,
                        effect: val as "Fade" | "Slide",
                      }))
                    }
                  />
                  <CustomRadio
                    name="effect"
                    label="Slide"
                    value="Slide"
                    checked={settings.effect === "Slide"}
                    onChange={(val) =>
                      setSettings((prev) => ({
                        ...prev,
                        effect: val as "Fade" | "Slide",
                      }))
                    }
                  />
                </div>
              </div>

              {/* Save Settings Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] font-normal rounded-[3px] transition-colors cursor-pointer shadow-2xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ===================== RIGHT COLUMN ===================== */}
        <div className="lg:col-span-7">
          {/* CARD: SLIDER ITEMS TABLE (Screenshot 1) */}
          <div
            className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5"
            ref={dropdownRef}
          >
            <h2 className="text-[16px] font-normal text-[#333333] pb-3 border-b border-[#f4f4f4] mb-4">
              Slider Items
            </h2>

            {/* CONTROLS ROW: Show & Language on left, Search on right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-[13px]">
              {/* Left Controls */}
              <div className="flex items-center gap-4 flex-wrap">
                {/* Show */}
                <div className="flex items-center gap-2">
                  <span className="text-[#555]">Show</span>
                  <div className="relative">
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#0073b7]"
                    >
                      <option value={15}>15</option>
                      <option value={30}>30</option>
                      <option value={60}>60</option>
                      <option value={100}>100</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center gap-2">
                  <span className="text-[#555]">Language</span>
                  <div className="relative">
                    <select
                      value={filterLanguage}
                      onChange={(e) => {
                        setFilterLanguage(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-1.5 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] min-w-[80px]"
                    >
                      <option value="All">All</option>
                      {SLIDER_LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Right: Search */}
              <div className="flex items-center gap-2">
                <span className="text-[#555]">Search:</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-[#d2d6de] rounded-[3px] px-2.5 py-1 text-[13px] text-[#444] focus:outline-none focus:border-[#0073b7] min-w-[150px]"
                />
              </div>
            </div>

            {/* TABLE (Screenshot 1: Id | Image | Language | Order | Options) */}
            <div className="overflow-x-auto border-t border-gray-100">
              <table className="w-full text-left text-[13px] text-[#333333]">
                <thead>
                  <tr className="border-b border-[#f4f4f4] text-[#444] font-semibold text-[13px]">
                    {/* Id */}
                    <th
                      onClick={() => handleSort("id")}
                      className="py-2.5 px-3 w-14 cursor-pointer select-none hover:bg-gray-50/70"
                    >
                      <div className="flex items-center justify-between">
                        <span>Id</span>
                        {renderSortIndicator("id")}
                      </div>
                    </th>

                    {/* Image */}
                    <th className="py-2.5 px-3 min-w-[180px]">
                      <div className="flex items-center justify-between">
                        <span>Image</span>
                        <span className="inline-flex flex-col items-center justify-center ml-1 text-[8px] leading-[6px] text-[#c2c5c9]">
                          <span>▲</span>
                          <span className="mt-[1px]">▼</span>
                        </span>
                      </div>
                    </th>

                    {/* Language */}
                    <th
                      onClick={() => handleSort("language")}
                      className="py-2.5 px-3 w-32 cursor-pointer select-none hover:bg-gray-50/70"
                    >
                      <div className="flex items-center justify-between">
                        <span>Language</span>
                        {renderSortIndicator("language")}
                      </div>
                    </th>

                    {/* Order */}
                    <th
                      onClick={() => handleSort("order")}
                      className="py-2.5 px-3 w-24 cursor-pointer select-none hover:bg-gray-50/70"
                    >
                      <div className="flex items-center justify-between">
                        <span>Order</span>
                        {renderSortIndicator("order")}
                      </div>
                    </th>

                    {/* Options */}
                    <th className="py-2.5 px-3 w-36 text-right sm:text-left select-none">
                      <div className="flex items-center justify-between">
                        <span>Options</span>
                        <span className="inline-flex flex-col items-center justify-center ml-1 text-[8px] leading-[6px] text-[#c2c5c9]">
                          <span>▲</span>
                          <span className="mt-[1px]">▼</span>
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-6 text-center text-gray-500 text-xs"
                      >
                        No slider items found.
                      </td>
                    </tr>
                  ) : (
                    displayedItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[#f4f4f4] hover:bg-[#fcfcfc] transition-colors"
                      >
                        <td className="py-3 px-3 text-[#555] font-normal">
                          {item.id}
                        </td>
                        <td className="py-3 px-3">
                          <div className="relative w-36 h-12 rounded-[2px] overflow-hidden border border-gray-200 bg-gray-50 shadow-2xs">
                            <Image
                              src={item.image}
                              alt={item.title || "Slider"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-3 text-[#555] font-normal">
                          {item.language}
                        </td>
                        <td className="py-3 px-3 text-[#555] font-normal">
                          {item.order}
                        </td>
                        <td className="py-3 px-3 text-right sm:text-left">
                          <div className="relative inline-block text-left">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenDropdownId(
                                  openDropdownId === item.id ? null : item.id
                                )
                              }
                              className="bg-[#605ca8] hover:bg-[#545096] text-white text-[12px] px-3 py-1.5 rounded-[3px] inline-flex items-center gap-2 font-normal transition-colors cursor-pointer focus:outline-none shadow-2xs"
                            >
                              <span>Select an option</span>
                              <span className="text-[9px] leading-none">▼</span>
                            </button>

                            {openDropdownId === item.id && (
                              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-[3px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    handleStartEdit(item);
                                  }}
                                  className="w-full text-left px-3.5 py-1.5 text-[12px] text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Edit className="w-3.5 h-3.5 text-gray-500" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    setDeleteTarget(item);
                                  }}
                                  className="w-full text-left px-3.5 py-1.5 text-[12px] text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION (Bottom Right) */}
            <div className="mt-4 flex justify-end">
              <div className="inline-flex items-center gap-1 select-none text-xs">
                <button
                  type="button"
                  disabled={currentPage <= 1 || displayedItems.length === 0}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-2.5 py-1 border border-[#ddd] bg-white text-[#337ab7] rounded-[3px] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  &lt;
                </button>
                <span className="px-3 py-1 bg-[#337ab7] text-white border border-[#337ab7] rounded-[3px] font-medium">
                  {currentPage}
                </span>
                <button
                  type="button"
                  disabled={
                    currentPage >= totalPages || displayedItems.length === 0
                  }
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-2.5 py-1 border border-[#ddd] bg-white text-[#337ab7] rounded-[3px] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
