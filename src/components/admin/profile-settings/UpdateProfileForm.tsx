"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Camera, Trash2, Check } from "lucide-react";
import { ProfileSettingsData } from "./types";
import { initialProfileData } from "./mockData";
import { useAuth } from "@/context/AuthContext";

interface UpdateProfileFormProps {
  onSaved?: (data: ProfileSettingsData) => void;
}

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  onSaved,
}) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState<ProfileSettingsData>(initialProfileData);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Load persistent profile settings per user
  useEffect(() => {
    if (!user) return;
    const userScope = user.id || user.email || "admin";
    const storageKey = `modesy_profile_settings_${userScope}`;
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setFormData(JSON.parse(cached));
        return;
      }
    } catch {}

    const nameParts = (user.name || "").trim().split(" ");
    const first = nameParts[0] || "";
    const last = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    setFormData((prev) => ({
      ...prev,
      email: user.email || prev.email,
      firstName: first || prev.firstName,
      lastName: last || prev.lastName,
      avatarUrl: user.avatar || prev.avatarUrl,
      slug: (user.name || "admin").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoverTypeChange = (type: "full" | "boxed") => {
    setFormData((prev) => ({
      ...prev,
      coverImageType: type,
    }));
  };

  const handleCheckboxToggle = (
    key: "emailOnMessage" | "showEmail" | "showPhone"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          coverImageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCover = () => {
    setFormData((prev) => ({
      ...prev,
      coverImageUrl: "/images/banners/banner-1.webp",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || formData.firstName || user?.name || "Admin";

    if (updateUser) {
      await updateUser({
        name: fullName,
        avatar: formData.avatarUrl,
      });
    }

    if (user) {
      const userScope = user.id || user.email || "admin";
      const storageKey = `modesy_profile_settings_${userScope}`;
      try {
        localStorage.setItem(storageKey, JSON.stringify(formData));
      } catch (err) {
        console.error("Failed to save profile settings to storage", err);
      }
    }

    if (onSaved) {
      onSaved(formData);
    }
    setToastMessage("Profile has been saved successfully!");
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#00a99d] text-white px-5 py-3 rounded-[3px] shadow-lg text-[14px]">
          <Check className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner and Avatar Area */}
        <div className="relative">
          {/* Cover Banner */}
          <div
            className={`relative w-full h-[220px] sm:h-[240px] rounded-[3px] overflow-hidden bg-gray-100 ${
              formData.coverImageType === "boxed"
                ? "max-w-2xl mx-auto border border-gray-200"
                : ""
            }`}
          >
            <Image
              src={formData.coverImageUrl}
              alt="Storefront Cover"
              fill
              className="object-cover"
              priority
            />

            {/* Hidden File Input for Cover */}
            <input
              type="file"
              ref={coverInputRef}
              onChange={handleCoverUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Top Right Floating Action Buttons (Stacked Vertically matching Screenshot 1) */}
            <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-20">
              {/* Camera Upload Button */}
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                title="Change Cover Image"
                className="w-[32px] h-[32px] rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center shadow transition-colors cursor-pointer"
              >
                <Camera className="w-[16px] h-[16px]" />
              </button>

              {/* Trash Delete Button */}
              <button
                type="button"
                onClick={handleRemoveCover}
                title="Delete Cover Image"
                className="w-[32px] h-[32px] rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center shadow transition-colors cursor-pointer"
              >
                <Trash2 className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>

          {/* Overlapping Circular Avatar */}
          <div className="relative -mt-16 sm:-mt-20 ml-6 sm:ml-8 z-10 inline-block">
            {/* Avatar Image */}
            <div className="w-[120px] h-[120px] sm:w-[136px] sm:h-[136px] rounded-full border-4 border-white shadow-md overflow-hidden relative bg-slate-900 shrink-0">
              <Image
                src={formData.avatarUrl || "/images/avatars/admin-avatar.jpg"}
                alt="Admin Profile"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Hidden File Input for Avatar */}
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Camera Button Badge at Bottom Right of Avatar */}
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              title="Change Profile Photo"
              className="absolute bottom-1 right-1 w-[32px] h-[32px] rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center shadow transition-colors cursor-pointer border-2 border-white"
            >
              <Camera className="w-[15px] h-[15px]" />
            </button>
          </div>
        </div>

        {/* Informational Subtext */}
        <p className="text-[12px] sm:text-[13px] text-[#777777] font-normal pt-1">
          *Click on the save changes button after selecting your image
        </p>

        {/* Form Inputs Stack */}
        <div className="space-y-4 pt-1">
          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-[13px] font-medium text-[#495057] mb-1.5"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-[13px] font-medium text-[#495057] mb-1.5"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
            />
          </div>

          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-[13px] font-medium text-[#495057] mb-1.5"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-[13px] font-medium text-[#495057] mb-1.5"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-[13px] font-medium text-[#495057] mb-1.5"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
            />
          </div>

          {/* Tax Registration Number */}
          <div>
            <label
              htmlFor="taxRegistrationNumber"
              className="block text-[13px] font-medium text-[#495057] mb-1.5"
            >
              Tax Registration Number
            </label>
            <input
              type="text"
              id="taxRegistrationNumber"
              name="taxRegistrationNumber"
              value={formData.taxRegistrationNumber}
              onChange={handleInputChange}
              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
            />
          </div>

          {/* Cover Image Type Radio Group */}
          <div className="pt-2">
            <label className="block text-[13px] font-medium text-[#495057] mb-2">
              Cover Image Type
            </label>
            <div className="flex items-center gap-8">
              {/* Full Width Radio */}
              <label
                onClick={() => handleCoverTypeChange("full")}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                    formData.coverImageType === "full"
                      ? "bg-[#00a99d] text-white"
                      : "border-2 border-[#ced4da] bg-white"
                  }`}
                >
                  {formData.coverImageType === "full" && (
                    <Check className="w-[12px] h-[12px] stroke-[3]" />
                  )}
                </div>
                <span className="text-[14px] text-[#495057]">Full Width</span>
              </label>

              {/* Boxed Radio */}
              <label
                onClick={() => handleCoverTypeChange("boxed")}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                    formData.coverImageType === "boxed"
                      ? "bg-[#00a99d] text-white"
                      : "border-2 border-[#ced4da] bg-white"
                  }`}
                >
                  {formData.coverImageType === "boxed" && (
                    <Check className="w-[12px] h-[12px] stroke-[3]" />
                  )}
                </div>
                <span className="text-[14px] text-[#495057]">Boxed</span>
              </label>
            </div>
          </div>

          {/* Custom Checkboxes Stack */}
          <div className="space-y-3 pt-3">
            {/* Checkbox 1: Send email on message */}
            <label
              onClick={() => handleCheckboxToggle("emailOnMessage")}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div
                className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                  formData.emailOnMessage
                    ? "bg-[#00a99d] text-white"
                    : "border border-[#ced4da] bg-white"
                }`}
              >
                {formData.emailOnMessage && (
                  <Check className="w-[13px] h-[13px] stroke-[3]" />
                )}
              </div>
              <span className="text-[14px] text-[#495057]">
                Send me an email when someone send me a message
              </span>
            </label>

            {/* Checkbox 2: Show email address */}
            <label
              onClick={() => handleCheckboxToggle("showEmail")}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div
                className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                  formData.showEmail
                    ? "bg-[#00a99d] text-white"
                    : "border border-[#ced4da] bg-white"
                }`}
              >
                {formData.showEmail && (
                  <Check className="w-[13px] h-[13px] stroke-[3]" />
                )}
              </div>
              <span className="text-[14px] text-[#495057]">
                Show my email address
              </span>
            </label>

            {/* Checkbox 3: Show phone number */}
            <label
              onClick={() => handleCheckboxToggle("showPhone")}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div
                className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                  formData.showPhone
                    ? "bg-[#00a99d] text-white"
                    : "border border-[#ced4da] bg-white"
                }`}
              >
                {formData.showPhone && (
                  <Check className="w-[13px] h-[13px] stroke-[3]" />
                )}
              </div>
              <span className="text-[14px] text-[#495057]">
                Show my phone number
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-[#00a99d] hover:bg-[#008f85] text-white font-normal text-[14px] px-6 py-2.5 rounded-[2px] transition-colors cursor-pointer shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
