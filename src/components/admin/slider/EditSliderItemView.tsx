"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { SliderItem } from "./types";
import {
  SLIDER_LANGUAGES,
  SLIDER_ANIMATIONS,
  INITIAL_SLIDER_ITEMS,
  getStoredSliderItemById,
  saveSingleSliderItem,
} from "./sliderData";

export default function EditSliderItemView() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const isModerator = pathname?.startsWith("/moderator");
  const sliderUrl = isModerator
    ? "/moderator/admin-panel/slider"
    : "/admin/admin-panel/slider";

  // Extract ID from params (either id or slug)
  const rawId = (params?.id as string) || (params?.slug as string) || "";
  const itemId = Number(rawId) || 4;

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<SliderItem | null>(null);

  // Form states
  const [language, setLanguage] = useState<string>("Arabic");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [order, setOrder] = useState<number>(1);
  const [buttonText, setButtonText] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [buttonColor, setButtonColor] = useState<string>("#000000");
  const [buttonTextColor, setButtonTextColor] = useState<string>("#ffffff");
  const [animTitle, setAnimTitle] = useState<string>("bounceIn");
  const [animDesc, setAnimDesc] = useState<string>("bounceInDown");
  const [animBtn, setAnimBtn] = useState<string>("bounceInRight");
  const [image, setImage] = useState<string>("/images/slider/slider-2.webp");
  const [imageMobile, setImageMobile] = useState<string>(
    "/images/slider/slider-2-mobile.webp"
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const desktopFileRef = useRef<HTMLInputElement>(null);
  const mobileFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Look up item by ID
    const found =
      getStoredSliderItemById(itemId) ||
      INITIAL_SLIDER_ITEMS.find((i) => i.id === itemId) ||
      INITIAL_SLIDER_ITEMS[0];

    if (found) {
      setItem(found);
      setLanguage(found.language);
      setTitle(found.title);
      setDescription(found.description);
      setLink(found.link);
      setOrder(found.order);
      setButtonText(found.buttonText);
      setTextColor(found.textColor || "#ffffff");
      setButtonColor(found.buttonColor || "#000000");
      setButtonTextColor(found.buttonTextColor || "#ffffff");
      setAnimTitle(found.animationTitle || "bounceIn");
      setAnimDesc(found.animationDescription || "bounceInDown");
      setAnimBtn(found.animationButton || "bounceInRight");
      setImage(found.image || "/images/slider/slider-2.webp");
      setImageMobile(found.imageMobile || "/images/slider/slider-2-mobile.webp");
    } else {
      setItem(null);
    }
    setLoading(false);
  }, [itemId]);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectDesktopImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleSelectMobileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageMobile(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedItem: SliderItem = {
      id: itemId,
      language,
      title: title.trim(),
      description: description.trim(),
      link: link.trim(),
      order: Number(order) || 1,
      buttonText: buttonText.trim(),
      textColor,
      buttonColor,
      buttonTextColor,
      animationTitle: animTitle,
      animationDescription: animDesc,
      animationButton: animBtn,
      image,
      imageMobile,
    };

    saveSingleSliderItem(updatedItem);
    triggerToast("Slider item updated successfully!");

    setTimeout(() => {
      router.push(sliderUrl);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center text-gray-500 text-xs">
        Loading slider item data...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          Slider Item Not Found
        </h2>
        <p className="text-xs text-gray-500 mb-5">
          No slider item found with ID:{" "}
          <span className="font-mono text-red-600 font-semibold">{itemId}</span>
        </p>
        <Link
          href={sliderUrl}
          className="px-4 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs rounded-[3px] inline-flex items-center gap-1.5 transition-colors"
        >
          <Menu className="w-4 h-4" />
          <span>Slider</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* UPDATE SLIDER ITEM CARD (Matches Screenshot) */}
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5">
        {/* Card Header: Title on left, Green '≡ Slider' button on right */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f4f4f4] mb-5">
          <h1 className="text-[16px] font-normal text-[#333333]">
            Update Slider Item
          </h1>
          <Link
            href={sliderUrl}
            className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[12.5px] rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs font-normal"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Slider</span>
          </Link>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Language */}
          <div>
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
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
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors resize-y"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              Link
            </label>
            <input
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
            />
          </div>

          {/* Order & Button Text (2-column grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
                Order
              </label>
              <input
                type="number"
                min={1}
                placeholder="Order"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
                className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
                Button Text
              </label>
              <input
                type="text"
                placeholder="Button Text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
              />
            </div>
          </div>

          {/* Color Pickers (3-column grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] text-[#333333] mb-1.5 truncate font-normal">
                Text Color
              </label>
              <div className="flex items-center border border-[#d2d6de] rounded-[3px] px-2 py-1 bg-white">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-6 cursor-pointer border-0 p-0 rounded-[2px] bg-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] text-[#333333] mb-1.5 truncate font-normal">
                Button Color
              </label>
              <div className="flex items-center border border-[#d2d6de] rounded-[3px] px-2 py-1 bg-white">
                <input
                  type="color"
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                  className="w-full h-6 cursor-pointer border-0 p-0 rounded-[2px] bg-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] text-[#333333] mb-1.5 truncate font-normal">
                Button Text Color
              </label>
              <div className="flex items-center border border-[#d2d6de] rounded-[3px] px-2 py-1 bg-white">
                <input
                  type="color"
                  value={buttonTextColor}
                  onChange={(e) => setButtonTextColor(e.target.value)}
                  className="w-full h-6 cursor-pointer border-0 p-0 rounded-[2px] bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Animations Section (3-column grid) */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333333] mb-2">
              Animations
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11.5px] text-[#555] mb-1 truncate font-normal">
                  Title
                </label>
                <div className="relative">
                  <select
                    value={animTitle}
                    onChange={(e) => setAnimTitle(e.target.value)}
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
                <label className="block text-[11.5px] text-[#555] mb-1 truncate font-normal">
                  Description
                </label>
                <div className="relative">
                  <select
                    value={animDesc}
                    onChange={(e) => setAnimDesc(e.target.value)}
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
                <label className="block text-[11.5px] text-[#555] mb-1 truncate font-normal">
                  Button
                </label>
                <div className="relative">
                  <select
                    value={animBtn}
                    onChange={(e) => setAnimBtn(e.target.value)}
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
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              Image (2560x800)
            </label>
            <input
              type="file"
              accept="image/*"
              ref={desktopFileRef}
              onChange={handleSelectDesktopImage}
              className="hidden"
            />
            <div className="mb-2">
              <button
                type="button"
                onClick={() => desktopFileRef.current?.click()}
                className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[12px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Select Image</span>
              </button>
            </div>
            {image && (
              <div className="relative w-full max-w-xl h-44 rounded-[2px] overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={image}
                  alt="Slider Desktop Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Image (for mobile) (768x500) */}
          <div>
            <label className="block text-[13px] text-[#333333] mb-1.5 font-normal">
              Image (for mobile) (768x500)
            </label>
            <input
              type="file"
              accept="image/*"
              ref={mobileFileRef}
              onChange={handleSelectMobileImage}
              className="hidden"
            />
            <div className="mb-2">
              <button
                type="button"
                onClick={() => mobileFileRef.current?.click()}
                className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[12px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Select Image</span>
              </button>
            </div>
            {imageMobile && (
              <div className="relative w-48 h-32 rounded-[2px] overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={imageMobile}
                  alt="Slider Mobile Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-3 flex justify-end">
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
  );
}
