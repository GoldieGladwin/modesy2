"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  UserPen,
  MapPin,
  Truck,
  Share2,
  Lock,
  UserX,
  Camera,
  Check,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  PlusCircle,
  SquarePen,
  Trash2,
  X,
  Receipt,
} from "lucide-react";

type ProfileTab =
  | "update-profile"
  | "location"
  | "shipping-address"
  | "social-media"
  | "change-password"
  | "delete-account";

interface MenuItem {
  id: ProfileTab;
  label: string;
  icon: React.ElementType;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "update-profile", label: "Update Profile", icon: UserPen },
  { id: "location", label: "Location", icon: MapPin },
  { id: "shipping-address", label: "Shipping Address", icon: Truck },
  { id: "social-media", label: "Social Media", icon: Share2 },
  { id: "change-password", label: "Change Password", icon: Lock },
  { id: "delete-account", label: "Delete Account", icon: UserX },
];

const TAB_TITLES: Record<ProfileTab, string> = {
  "update-profile": "Update Profile",
  location: "Location",
  "shipping-address": "Shipping Address",
  "social-media": "Social Media",
  "change-password": "Change Password",
  "delete-account": "Delete Account",
};

const COUNTRIES_LIST = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Indonesia",
  "Saudi Arabia",
  "United Arab Emirates",
  "Japan",
  "Singapore",
  "Turkey",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Brazil",
  "China",
  "Egypt",
  "India",
  "Italy",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "Spain",
  "Switzerland",
];

interface SocialField {
  key: string;
  label: string;
  placeholder?: string;
}

const SOCIAL_FIELDS: SocialField[] = [
  { key: "facebook", label: "Facebook URL" },
  { key: "twitter", label: "X (Twitter) URL" },
  { key: "instagram", label: "Instagram URL" },
  { key: "tiktok", label: "TikTok URL" },
  { key: "whatsapp", label: "WhatsApp URL" },
  { key: "youtube", label: "YouTube URL" },
  { key: "discord", label: "Discord Url" },
  { key: "telegram", label: "Telegram URL", placeholder: "Telegram URL" },
  { key: "pinterest", label: "Pinterest URL", placeholder: "Pinterest URL" },
  { key: "linkedin", label: "Linkedin URL", placeholder: "Linkedin URL" },
  { key: "twitch", label: "Twitch Url" },
  { key: "vk", label: "VK URL", placeholder: "VK URL" },
  { key: "personalWebsite", label: "Personal Website URL" },
];

interface AddressItem {
  id: string;
  type: "shipping" | "billing";
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
}

export default function ModeratorProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("update-profile");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Update Profile State
  const [firstName, setFirstName] = useState("Roger");
  const [lastName, setLastName] = useState("Novak");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [taxRegistrationNumber, setTaxRegistrationNumber] = useState("");
  const [coverImageType, setCoverImageType] = useState<"full" | "boxed">("full");
  const [emailOnMessage, setEmailOnMessage] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Images state
  const [avatarImage, setAvatarImage] = useState("/assets/img/roger-avatar.jpg");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Location State
  const [locationCountry, setLocationCountry] = useState("");
  const [locationState, setLocationState] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationZip, setLocationZip] = useState("");
  const [showLocation, setShowLocation] = useState(false);

  // Shipping Addresses State (matching Screenshot 2: empty state)
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);
  const [addressFormData, setAddressFormData] = useState<Omit<AddressItem, "id">>({
    type: "shipping",
    title: "",
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
    email: "",
    phone: "",
  });

  // Social Media State (Matching Admin Profile Settings default values)
  const [socialMedia, setSocialMedia] = useState<Record<string, string>>({
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com",
    instagram: "https://www.instagram.com",
    tiktok: "https://www.tiktok.com/",
    whatsapp: "https://web.whatsapp.com/",
    youtube: "https://www.youtube.com/",
    discord: "https://discord.com/",
    telegram: "",
    pinterest: "",
    linkedin: "",
    twitch: "https://www.twitch.tv/",
    vk: "",
    personalWebsite: "https://codecanyon.net/user/codingest/portfolio",
  });

  // Change Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Delete Account State
  const [deletePassword, setDeletePassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Scroll listener for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Image upload handlers
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarImage(url);
    }
  };

  // Form submit handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Profile has been saved successfully!");
  };

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Location settings updated successfully!");
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Social media settings updated successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    showNotification("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletePassword) {
      alert("Please enter your current password to confirm account deletion.");
      return;
    }
    if (!confirmDelete) {
      alert("Please check the confirmation box.");
      return;
    }
    showNotification("Account deletion request has been submitted.");
    setDeletePassword("");
    setConfirmDelete(false);
  };

  // Address Handlers
  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressFormData({
      type: "shipping",
      title: "",
      firstName: "",
      lastName: "",
      address: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
      email: "",
      phone: "",
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr: AddressItem) => {
    setEditingAddress(addr);
    setAddressFormData({
      type: addr.type,
      title: addr.title,
      firstName: addr.firstName,
      lastName: addr.lastName,
      address: addr.address,
      zipCode: addr.zipCode,
      city: addr.city,
      state: addr.state,
      country: addr.country,
      email: addr.email,
      phone: addr.phone,
    });
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      showNotification("Address deleted successfully!");
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id ? { ...addressFormData, id: a.id } : a
        )
      );
      showNotification("Address updated successfully!");
    } else {
      const newAddr: AddressItem = {
        ...addressFormData,
        id: `addr-${Date.now()}`,
      };
      setAddresses((prev) => [...prev, newAddr]);
      showNotification("Address added successfully!");
    }
    setIsAddressModalOpen(false);
  };

  return (
    <div className="w-full bg-white min-h-screen py-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#00a99d] text-white px-5 py-3 rounded-[3px] shadow-lg text-[14px] animate-in fade-in duration-200">
          <Check className="w-5 h-5 shrink-0 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb matching Screenshot 1 */}
        <nav className="text-[13px] text-[#777777] mb-6 flex items-center gap-1.5 font-normal">
          <Link href="/moderator" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span>/</span>
          <button
            type="button"
            onClick={() => setActiveTab("update-profile")}
            className="hover:text-[#00a99d] transition-colors cursor-pointer"
          >
            Profile Settings
          </button>
          <span>/</span>
          <span className="text-[#333333] font-normal">
            {TAB_TITLES[activeTab]}
          </span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[22px] font-bold text-[#222222] mb-6">
          Profile Settings
        </h1>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar matching Screenshot 1 */}
          <div className="lg:col-span-3">
            <nav className="flex flex-col space-y-1">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-[14px] text-left transition-colors rounded-[3px] cursor-pointer ${
                      isActive
                        ? "bg-[#f4f5f7] text-[#222222] font-semibold"
                        : "text-[#555555] hover:bg-[#f8f9fa] hover:text-[#222222] font-normal"
                    }`}
                  >
                    <Icon
                      className={`w-[17px] h-[17px] shrink-0 ${
                        isActive ? "text-[#222222]" : "text-[#777777]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-9">
            {/* TAB 1: UPDATE PROFILE (Matching Screenshots 1 & 2 1:1) */}
            {activeTab === "update-profile" && (
              <div className="w-full">
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Banner and Avatar Area */}
                  <div>
                    {/* Cover Banner */}
                    <div
                      className={`relative w-full h-[190px] sm:h-[220px] rounded-[3px] overflow-hidden bg-[#f8f9fa] border border-[#f0f2f5] ${
                        coverImageType === "boxed" ? "max-w-3xl mx-auto" : ""
                      }`}
                    >
                      {coverImage ? (
                        <img
                          src={coverImage}
                          alt="Cover Banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#f8f9fa]" />
                      )}

                      {/* Hidden File Input for Cover */}
                      <input
                        type="file"
                        ref={coverInputRef}
                        onChange={handleCoverUpload}
                        accept="image/*"
                        className="hidden"
                      />

                      {/* Top Right Single Teal Camera Button matching Screenshot 1 */}
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        title="Upload Cover Image"
                        className="absolute top-4 right-4 w-[34px] h-[34px] rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                      >
                        <Camera className="w-[17px] h-[17px]" />
                      </button>
                    </div>

                    {/* Overlapping Circular Avatar */}
                    <div className="relative -mt-16 sm:-mt-20 ml-6 sm:ml-8 z-10 inline-block">
                      <div className="w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] rounded-full border-4 border-white shadow-md overflow-hidden relative bg-white shrink-0">
                        <img
                          src={avatarImage}
                          alt="Roger Novak"
                          className="w-full h-full object-cover"
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
                        title="Change Avatar Image"
                        className="absolute bottom-1 right-1 w-[32px] h-[32px] rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center shadow transition-colors cursor-pointer border-2 border-white"
                      >
                        <Camera className="w-[15px] h-[15px]" />
                      </button>
                    </div>

                    {/* Informational Subtext matching Screenshot 1 */}
                    <p className="text-[12px] text-[#777777] font-normal mt-2 ml-6 sm:ml-8">
                      *Click on the save changes button after selecting your image
                    </p>
                  </div>

                  {/* Form Inputs Stack matching Screenshot 2 */}
                  <div className="space-y-4 pt-2">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-[13px] font-medium text-[#222222] mb-1.5"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-[13px] font-medium text-[#222222] mb-1.5"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[13px] font-medium text-[#222222] mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                      />
                    </div>

                    {/* Tax Registration Number */}
                    <div>
                      <label
                        htmlFor="taxRegistrationNumber"
                        className="block text-[13px] font-medium text-[#222222] mb-1.5"
                      >
                        Tax Registration Number
                      </label>
                      <input
                        type="text"
                        id="taxRegistrationNumber"
                        name="taxRegistrationNumber"
                        placeholder="Tax Registration Number"
                        value={taxRegistrationNumber}
                        onChange={(e) => setTaxRegistrationNumber(e.target.value)}
                        className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                      />
                    </div>

                    {/* Cover Image Type Radio Group matching Screenshot 2 */}
                    <div className="pt-2">
                      <label className="block text-[13px] font-medium text-[#222222] mb-2">
                        Cover Image Type
                      </label>
                      <div className="flex items-center gap-8">
                        {/* Full Width Radio */}
                        <label
                          onClick={() => setCoverImageType("full")}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          <div
                            className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                              coverImageType === "full"
                                ? "bg-[#00a99d] text-white"
                                : "border-2 border-[#ced4da] bg-white"
                            }`}
                          >
                            {coverImageType === "full" && (
                              <Check className="w-[12px] h-[12px] stroke-[3]" />
                            )}
                          </div>
                          <span className="text-[13px] text-[#495057]">
                            Full Width
                          </span>
                        </label>

                        {/* Boxed Radio */}
                        <label
                          onClick={() => setCoverImageType("boxed")}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          <div
                            className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors ${
                              coverImageType === "boxed"
                                ? "bg-[#00a99d] text-white"
                                : "border-2 border-[#ced4da] bg-white"
                            }`}
                          >
                            {coverImageType === "boxed" && (
                              <Check className="w-[12px] h-[12px] stroke-[3]" />
                            )}
                          </div>
                          <span className="text-[13px] text-[#495057]">
                            Boxed
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Checkboxes matching Screenshot 2 */}
                    <div className="space-y-3 pt-3">
                      {/* Checkbox 1: Send me an email when someone send me a message */}
                      <label
                        onClick={() => setEmailOnMessage(!emailOnMessage)}
                        className="flex items-center gap-2.5 cursor-pointer select-none"
                      >
                        <div
                          className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                            emailOnMessage
                              ? "bg-[#00a99d] text-white"
                              : "border border-[#ced4da] bg-white"
                          }`}
                        >
                          {emailOnMessage && (
                            <Check className="w-[13px] h-[13px] stroke-[3]" />
                          )}
                        </div>
                        <span className="text-[13px] text-[#495057]">
                          Send me an email when someone send me a message
                        </span>
                      </label>

                      {/* Checkbox 2: Show my email address */}
                      <label
                        onClick={() => setShowEmail(!showEmail)}
                        className="flex items-center gap-2.5 cursor-pointer select-none"
                      >
                        <div
                          className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                            showEmail
                              ? "bg-[#00a99d] text-white"
                              : "border border-[#ced4da] bg-white"
                          }`}
                        >
                          {showEmail && (
                            <Check className="w-[13px] h-[13px] stroke-[3]" />
                          )}
                        </div>
                        <span className="text-[13px] text-[#495057]">
                          Show my email address
                        </span>
                      </label>

                      {/* Checkbox 3: Show my phone number */}
                      <label
                        onClick={() => setShowPhone(!showPhone)}
                        className="flex items-center gap-2.5 cursor-pointer select-none"
                      >
                        <div
                          className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                            showPhone
                              ? "bg-[#00a99d] text-white"
                              : "border border-[#ced4da] bg-white"
                          }`}
                        >
                          {showPhone && (
                            <Check className="w-[13px] h-[13px] stroke-[3]" />
                          )}
                        </div>
                        <span className="text-[13px] text-[#495057]">
                          Show my phone number
                        </span>
                      </label>
                    </div>

                    {/* Save Changes Button matching Screenshot 2 */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium px-6 py-2.5 rounded-[3px] transition-colors cursor-pointer shadow-xs"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: LOCATION (Matching Screenshot 1:1) */}
            {activeTab === "location" && (
              <div className="w-full">
                <form onSubmit={handleSaveLocation} className="space-y-4">
                  <label className="block text-[13px] font-medium text-[#222222]">
                    Location
                  </label>

                  {/* Row 1: Country Dropdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <select
                        value={locationCountry}
                        onChange={(e) => setLocationCountry(e.target.value)}
                        className={`w-full h-[40px] px-3.5 pr-8 text-[14px] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] appearance-none cursor-pointer ${
                          locationCountry ? "text-[#495057]" : "text-[#777777]"
                        }`}
                      >
                        <option value="">Country</option>
                        {COUNTRIES_LIST.map((c) => (
                          <option key={c} value={c} className="text-[#495057]">
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* State input only if Country is selected */}
                    {locationCountry ? (
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="State"
                          value={locationState}
                          onChange={(e) => setLocationState(e.target.value)}
                          className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                        />
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>

                  {/* Row 2: Address (approx 75%) and Zip Code (approx 25%) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-9">
                      <input
                        type="text"
                        placeholder="Address"
                        value={locationAddress}
                        onChange={(e) => setLocationAddress(e.target.value)}
                        className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={locationZip}
                        onChange={(e) => setLocationZip(e.target.value)}
                        className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Show my location checkbox */}
                  <div className="pt-1">
                    <label
                      onClick={() => setShowLocation(!showLocation)}
                      className="flex items-center gap-2.5 cursor-pointer select-none"
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                          showLocation
                            ? "bg-[#00a99d] text-white"
                            : "border border-[#ced4da] bg-white"
                        }`}
                      >
                        {showLocation && (
                          <Check className="w-[13px] h-[13px] stroke-[3]" />
                        )}
                      </div>
                      <span className="text-[13px] text-[#495057]">
                        Show my location
                      </span>
                    </label>
                  </div>

                  {/* Row 4: Save Changes Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium px-6 py-2.5 rounded-[3px] transition-colors cursor-pointer shadow-xs"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: SHIPPING ADDRESS matching Screenshot 1 & 2 */}
            {activeTab === "shipping-address" && (
              <div className="w-full">
                {addresses.length === 0 ? (
                  /* Empty state matching Screenshot 2 */
                  <div className="pt-1">
                    <p className="text-[14px] text-[#777777] mb-4 font-normal">
                      You have not added a shipping address yet.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenAddAddress}
                      className="inline-flex items-center gap-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium px-5 py-2.5 rounded-[3px] transition-colors cursor-pointer shadow-xs"
                    >
                      <PlusCircle className="w-[18px] h-[18px]" />
                      <span>Add New Address</span>
                    </button>
                  </div>
                ) : (
                  /* Addresses list if user added an address */
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <h2 className="text-[16px] font-semibold text-[#222222]">
                        My Addresses
                      </h2>
                      <button
                        type="button"
                        onClick={handleOpenAddAddress}
                        className="inline-flex items-center gap-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] font-medium px-4 py-2 rounded-[3px] transition-colors cursor-pointer shadow-xs"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Add New Address</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className="border border-[#e4e7ea] rounded-[3px] p-5 bg-white relative hover:border-gray-300 transition-colors shadow-2xs"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                              {addr.type === "shipping" ? (
                                <>
                                  <Truck className="w-3.5 h-3.5 text-[#00a99d]" />
                                  Shipping
                                </>
                              ) : (
                                <>
                                  <Receipt className="w-3.5 h-3.5 text-blue-600" />
                                  Billing
                                </>
                              )}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEditAddress(addr)}
                                title="Edit Address"
                                className="text-[#777777] hover:text-[#00a99d] transition-colors p-1 cursor-pointer"
                              >
                                <SquarePen className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteAddress(addr.id)}
                                title="Delete Address"
                                className="text-[#777777] hover:text-red-500 transition-colors p-1 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <h4 className="font-semibold text-[14px] text-[#222222] mb-1">
                            {addr.title || "Address"}
                          </h4>
                          <p className="text-[13px] text-[#555555] font-medium">
                            {addr.firstName} {addr.lastName}
                          </p>
                          <p className="text-[13px] text-[#777777] mt-1">
                            {addr.address}
                          </p>
                          <p className="text-[13px] text-[#777777]">
                            {addr.city}, {addr.state} {addr.zipCode}
                          </p>
                          <p className="text-[13px] text-[#777777]">{addr.country}</p>
                          <div className="mt-3 pt-3 border-t border-gray-100 text-[12px] text-[#888888]">
                            <p>{addr.email}</p>
                            <p>{addr.phone}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add / Edit Address Modal matching Screenshot 1 1:1 */}
                {isAddressModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
                    <div className="bg-white rounded-[4px] shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-8 relative">
                      {/* Close button X top right */}
                      <button
                        type="button"
                        onClick={() => setIsAddressModalOpen(false)}
                        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      {/* Modal title centered */}
                      <h3 className="text-[20px] font-semibold text-[#222222] text-center mb-6">
                        {editingAddress ? "Edit Address" : "Add New Address"}
                      </h3>

                      <form onSubmit={handleSaveAddress} className="space-y-4">
                        {/* 1. Address Type */}
                        <div>
                          <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                            Address Type
                          </label>
                          <div className="relative">
                            <select
                              value={addressFormData.type}
                              onChange={(e) =>
                                setAddressFormData((prev) => ({
                                  ...prev,
                                  type: e.target.value as "shipping" | "billing",
                                }))
                              }
                              className="w-full h-[40px] px-3.5 pr-8 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] appearance-none cursor-pointer"
                            >
                              <option value="shipping">Shipping Address</option>
                              <option value="billing">Billing Address</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* 2. Address Title */}
                        <div>
                          <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                            Address Title
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Address Title"
                            value={addressFormData.title}
                            onChange={(e) =>
                              setAddressFormData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                          />
                        </div>

                        {/* 3. First Name & Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                              First Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="First Name"
                              value={addressFormData.firstName}
                              onChange={(e) =>
                                setAddressFormData((prev) => ({
                                  ...prev,
                                  firstName: e.target.value,
                                }))
                              }
                              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                            />
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                              Last Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Last Name"
                              value={addressFormData.lastName}
                              onChange={(e) =>
                                setAddressFormData((prev) => ({
                                  ...prev,
                                  lastName: e.target.value,
                                }))
                              }
                              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                            />
                          </div>
                        </div>

                        {/* 4. Email & Phone Number */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                              Email
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="Email"
                              value={addressFormData.email}
                              onChange={(e) =>
                                setAddressFormData((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                            />
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              placeholder="Phone Number"
                              value={addressFormData.phone}
                              onChange={(e) =>
                                setAddressFormData((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                            />
                          </div>
                        </div>

                        {/* 5. Country & State */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                              Country
                            </label>
                            <div className="relative">
                              <select
                                value={addressFormData.country}
                                onChange={(e) =>
                                  setAddressFormData((prev) => ({
                                    ...prev,
                                    country: e.target.value,
                                  }))
                                }
                                className={`w-full h-[40px] px-3.5 pr-8 text-[14px] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] appearance-none cursor-pointer ${
                                  addressFormData.country
                                    ? "text-[#495057]"
                                    : "text-[#777777]"
                                }`}
                              >
                                <option value="">Country</option>
                                {COUNTRIES_LIST.map((c) => (
                                  <option key={c} value={c} className="text-[#495057]">
                                    {c}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                              State
                            </label>
                            <div className="relative">
                              <select
                                value={addressFormData.state}
                                onChange={(e) =>
                                  setAddressFormData((prev) => ({
                                    ...prev,
                                    state: e.target.value,
                                  }))
                                }
                                className={`w-full h-[40px] px-3.5 pr-8 text-[14px] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] appearance-none cursor-pointer ${
                                  addressFormData.state
                                    ? "text-[#495057]"
                                    : "text-[#777777]"
                                }`}
                              >
                                <option value="">State</option>
                                <option value="New York" className="text-[#495057]">New York</option>
                                <option value="California" className="text-[#495057]">California</option>
                                <option value="Texas" className="text-[#495057]">Texas</option>
                                <option value="Florida" className="text-[#495057]">Florida</option>
                                <option value="Illinois" className="text-[#495057]">Illinois</option>
                                <option value="Washington" className="text-[#495057]">Washington</option>
                                <option value="Other" className="text-[#495057]">Other</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* 6. City & Zip Code */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                              City
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="City"
                              value={addressFormData.city}
                              onChange={(e) =>
                                setAddressFormData((prev) => ({
                                  ...prev,
                                  city: e.target.value,
                                }))
                              }
                              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                            />
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                              Zip Code
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Zip Code"
                              value={addressFormData.zipCode}
                              onChange={(e) =>
                                setAddressFormData((prev) => ({
                                  ...prev,
                                  zipCode: e.target.value,
                                }))
                              }
                              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                            />
                          </div>
                        </div>

                        {/* 7. Address */}
                        <div>
                          <label className="block text-[13px] font-medium text-[#222222] mb-1.5">
                            Address
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Address"
                            value={addressFormData.address}
                            onChange={(e) =>
                              setAddressFormData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                          />
                        </div>

                        {/* 8. Submit button aligned right */}
                        <div className="flex justify-end pt-3">
                          <button
                            type="submit"
                            className="bg-[#00a99d] hover:bg-[#008f85] text-white text-[14px] font-medium px-7 py-2.5 rounded-[3px] transition-colors cursor-pointer shadow-xs"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SOCIAL MEDIA (Matching Admin Profile Settings Exactly) */}
            {activeTab === "social-media" && (
              <div className="w-full">
                <form onSubmit={handleSaveSocial} className="space-y-4">
                  {SOCIAL_FIELDS.map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={field.key}
                        className="block text-[13px] font-medium text-[#495057] mb-1.5"
                      >
                        {field.label}
                      </label>
                      <input
                        type="text"
                        id={field.key}
                        name={field.key}
                        placeholder={field.placeholder || ""}
                        value={socialMedia[field.key] || ""}
                        onChange={(e) =>
                          setSocialMedia((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                      />
                    </div>
                  ))}

                  {/* Submit Button matching Admin Profile Settings */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white font-normal text-[14px] px-6 py-2.5 rounded-[2px] transition-colors cursor-pointer shadow-xs"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 5: CHANGE PASSWORD (Matching Admin Profile Settings Exactly) */}
            {activeTab === "change-password" && (
              <div className="w-full">
                <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
                      Old Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
                      Password Confirmation
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Password Confirmation"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white font-normal text-[14px] px-6 py-2.5 rounded-[2px] transition-colors cursor-pointer shadow-xs"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 6: DELETE ACCOUNT (Matching Admin Profile Settings Exactly) */}
            {activeTab === "delete-account" && (
              <div className="w-full">
                <form onSubmit={handleDeleteAccount} className="space-y-4 max-w-xl">
                  <div className="bg-[#fff5f5] border border-[#ffc9c9] rounded-[3px] p-4 flex items-start gap-3 text-[#c92a2a] text-[13px]">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[14px] mb-1">
                        Delete Account Notice
                      </h4>
                      <p className="leading-relaxed">
                        When you delete your account, your personal details, shop listings, and access credentials will be permanently erased. This action cannot be reversed.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div className="pt-1">
                    <label
                      onClick={() => setConfirmDelete(!confirmDelete)}
                      className="flex items-center gap-2.5 cursor-pointer select-none"
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                          confirmDelete
                            ? "bg-red-600 text-white"
                            : "border border-[#ced4da] bg-white"
                        }`}
                      >
                        {confirmDelete && (
                          <Check className="w-[13px] h-[13px] stroke-[3]" />
                        )}
                      </div>
                      <span className="text-[13px] text-[#495057]">
                        I understand that deleting my account is irreversible.
                      </span>
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white font-normal text-[14px] px-6 py-2.5 rounded-[2px] transition-colors cursor-pointer shadow-xs"
                    >
                      Delete My Account
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button matching Screenshot 2 */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Scroll to Top"
          className="fixed bottom-6 right-6 w-9 h-9 bg-[#222222] hover:bg-black text-white flex items-center justify-center rounded-[3px] shadow-lg transition-all z-40 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
