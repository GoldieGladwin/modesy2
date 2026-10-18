"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  User,
  MapPin,
  Truck,
  Link2,
  Share2,
  Lock,
  UserX,
  Camera,
  CheckCircle2,
  Trash2,
  Edit3,
  Plus,
  Copy,
  AlertTriangle,
  X,
} from "lucide-react";

type SettingsTab =
  | "update-profile"
  | "location"
  | "shipping-address"
  | "affiliate-links"
  | "social-media"
  | "change-password"
  | "delete-account";

interface AffiliateLinkItem {
  id: string;
  productName: string;
  link: string;
  date: string;
}

interface ShippingAddressItem {
  id: string;
  title: string;
  fullName: string;
  addressLine: string;
  contact: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  zipCode?: string;
}

export default function MemberSettingsView() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active Tab from query param or default to "update-profile"
  const tabParam = (searchParams?.get("tab") as SettingsTab) || "update-profile";
  const [activeTab, setActiveTab] = useState<SettingsTab>(tabParam);

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
    router.push(`/member/settings?tab=${tab}`, { scroll: false });
  };

  // ======================== TAB 1: UPDATE PROFILE STATE ========================
  const [avatarImage, setAvatarImage] = useState<string>("/images/peter-jone-avatar.jpg");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [emailAddress, setEmailAddress] = useState("member@gmail.com");
  const [slug, setSlug] = useState("peter-jone");
  const [firstName, setFirstName] = useState("Peter");
  const [lastName, setLastName] = useState("Jone");
  const [phoneNumber, setPhoneNumber] = useState("876 677 897");
  const [taxRegNumber, setTaxRegNumber] = useState("");
  const [coverType, setCoverType] = useState<"full" | "fixed">("full");
  const [notifyOnMessage, setNotifyOnMessage] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarImage(url);
      showToast("Avatar image selected. Click 'Save Changes' to apply.");
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
      showToast("Cover photo selected. Click 'Save Changes' to apply.");
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile updated successfully!");
  };

  // ======================== TAB 2: LOCATION STATE ========================
  const [country, setCountry] = useState("Afghanistan");
  const [stateName, setStateName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationZip, setLocationZip] = useState("");
  const [showLocation, setShowLocation] = useState(false);

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Location updated successfully!");
  };

  // ======================== TAB 3: SHIPPING ADDRESS STATE ========================
  const [addresses, setAddresses] = useState<ShippingAddressItem[]>([
    {
      id: "addr-1",
      title: "Home",
      fullName: "Peter Jone",
      addressLine: "Test Address d4141 Centre/Centre/France",
      contact: "test@gmail.com 876 4766 8978",
      firstName: "Peter",
      lastName: "Jone",
      email: "test@gmail.com",
      phoneNumber: "876 4766 8978",
      country: "France",
      state: "Centre",
      city: "Centre",
      address: "Test Address d4141",
      zipCode: "75001",
    },
  ]);

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addrForm, setAddrForm] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "France",
    state: "",
    city: "",
    address: "",
    zipCode: "",
  });

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    open: boolean;
    type: "address" | "affiliate" | "account";
    id: string;
    text: string;
  }>({
    open: false,
    type: "address",
    id: "",
    text: "",
  });

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddrForm({
      title: "Home",
      firstName: "Peter",
      lastName: "Jone",
      email: "member@gmail.com",
      phoneNumber: "876 677 897",
      country: "France",
      state: "Centre",
      city: "Centre",
      address: "",
      zipCode: "",
    });
    setAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr: ShippingAddressItem) => {
    setEditingAddressId(addr.id);
    setAddrForm({
      title: addr.title,
      firstName: addr.firstName || "Peter",
      lastName: addr.lastName || "Jone",
      email: addr.email || "test@gmail.com",
      phoneNumber: addr.phoneNumber || "876 4766 8978",
      country: addr.country || "France",
      state: addr.state || "Centre",
      city: addr.city || "Centre",
      address: addr.address || "Test Address d4141",
      zipCode: addr.zipCode || "75001",
    });
    setAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrForm.title || !addrForm.address) {
      alert("Please fill in the required fields.");
      return;
    }

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === editingAddressId
            ? {
                ...item,
                ...addrForm,
                fullName: `${addrForm.firstName} ${addrForm.lastName}`.trim(),
                addressLine: `${addrForm.address} ${addrForm.city}/${addrForm.state}/${addrForm.country}`,
                contact: `${addrForm.email} ${addrForm.phoneNumber}`.trim(),
              }
            : item
        )
      );
      showToast("Address updated successfully!");
    } else {
      const newAddr: ShippingAddressItem = {
        id: `addr-${Date.now()}`,
        ...addrForm,
        fullName: `${addrForm.firstName} ${addrForm.lastName}`.trim(),
        addressLine: `${addrForm.address} ${addrForm.city}/${addrForm.state}/${addrForm.country}`,
        contact: `${addrForm.email} ${addrForm.phoneNumber}`.trim(),
      };
      setAddresses((prev) => [...prev, newAddr]);
      showToast("New shipping address added!");
    }
    setAddressModalOpen(false);
  };

  // ======================== TAB 4: AFFILIATE LINKS STATE ========================
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLinkItem[]>([
    {
      id: "aff-1",
      productName: "Black bag over the shoulder",
      link: "https://modesy.codingest.net/affiliate/8UfkuoI77NkfvO",
      date: "2024-08-04",
    },
    {
      id: "aff-2",
      productName: "Black midi skirt with white flowers",
      link: "https://modesy.codingest.net/affiliate/8UfkuoI7AVRF78",
      date: "2024-08-04",
    },
    {
      id: "aff-3",
      productName: "Floral women sundress",
      link: "https://modesy.codingest.net/affiliate/8UfkuoJbe40SZx",
      date: "2024-08-04",
    },
  ]);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    showToast("Affiliate link copied to clipboard!");
  };

  // SweetAlert style delete trigger
  const confirmDeleteAction = () => {
    if (deleteConfirmModal.type === "address") {
      setAddresses((prev) => prev.filter((a) => a.id !== deleteConfirmModal.id));
      showToast("Shipping address deleted.");
    } else if (deleteConfirmModal.type === "affiliate") {
      setAffiliateLinks((prev) => prev.filter((a) => a.id !== deleteConfirmModal.id));
      showToast("Affiliate link deleted.");
    } else if (deleteConfirmModal.type === "account") {
      setDeleteAccountPass("");
      showToast("Your account deletion request has been submitted for admin approval.");
    }
    setDeleteConfirmModal({ open: false, type: "address", id: "", text: "" });
  };

  // ======================== TAB 5: SOCIAL MEDIA STATE ========================
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    tiktok: "",
    whatsapp: "",
    youtube: "",
    discord: "",
    telegram: "",
    pinterest: "",
    linkedin: "",
    twitch: "",
    vk: "",
    website: "",
  });

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Social media links saved successfully!");
  };

  // ======================== TAB 6: CHANGE PASSWORD STATE ========================
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.oldPassword || !passwordForm.newPassword) {
      alert("Please fill in password fields.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    showToast("Password updated successfully!");
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  // ======================== TAB 7: DELETE ACCOUNT STATE ========================
  const [deleteAccountPass, setDeleteAccountPass] = useState("");

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteAccountPass.trim()) {
      alert("Please enter your password to proceed.");
      return;
    }
    setDeleteConfirmModal({
      open: true,
      type: "account",
      id: "account",
      text: "Are you sure you want to delete your account? This action requires admin approval.",
    });
  };

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case "update-profile":
        return "Update Profile";
      case "location":
        return "Location";
      case "shipping-address":
        return "Shipping Address";
      case "affiliate-links":
        return "Affiliate Links";
      case "social-media":
        return "Social Media";
      case "change-password":
        return "Change Password";
      case "delete-account":
        return "Delete Account";
      default:
        return "Profile Settings";
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SweetAlert Style Delete Confirmation Modal */}
      {deleteConfirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[4px] shadow-2xl p-7 max-w-[420px] w-full text-center transform transition-all animate-in zoom-in-95 duration-150">
            {/* Warning Circle Icon */}
            <div className="w-[72px] h-[72px] rounded-full border-4 border-[#facea8] flex items-center justify-center mx-auto mb-5">
              <svg
                width="32"
                height="46"
                viewBox="0 0 32 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="16"
                  y1="8"
                  x2="16"
                  y2="28"
                  stroke="#f8bb86"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="38" r="2.2" fill="#f8bb86" />
              </svg>
            </div>

            {/* Warning Message */}
            <p className="text-[16px] sm:text-[17px] text-[#545454] font-normal leading-normal mb-7">
              {deleteConfirmModal.text}
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteConfirmModal({ open: false, type: "address", id: "", text: "" })
                }
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[14px] font-medium rounded-[3px] transition-colors cursor-pointer border-0"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteAction}
                className="px-8 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[14px] font-medium rounded-[3px] transition-colors cursor-pointer border-0 outline-none focus:ring-2 focus:ring-[#00a99d]/30"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Shipping Address Modal */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[3px] shadow-2xl p-6 max-w-[540px] w-full transform transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                {editingAddressId ? "Edit Shipping Address" : "Add New Shipping Address"}
              </h3>
              <button
                type="button"
                onClick={() => setAddressModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer p-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address Title (e.g. Home, Office) *
                </label>
                <input
                  type="text"
                  required
                  value={addrForm.title}
                  onChange={(e) => setAddrForm({ ...addrForm, title: e.target.value })}
                  placeholder="Home"
                  className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.firstName}
                    onChange={(e) => setAddrForm({ ...addrForm, firstName: e.target.value })}
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.lastName}
                    onChange={(e) => setAddrForm({ ...addrForm, lastName: e.target.value })}
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={addrForm.email}
                    onChange={(e) => setAddrForm({ ...addrForm, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.phoneNumber}
                    onChange={(e) => setAddrForm({ ...addrForm, phoneNumber: e.target.value })}
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Country</label>
                  <input
                    type="text"
                    value={addrForm.country}
                    onChange={(e) => setAddrForm({ ...addrForm, country: e.target.value })}
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">State</label>
                  <input
                    type="text"
                    value={addrForm.state}
                    onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={addrForm.city}
                    onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.address}
                    onChange={(e) => setAddrForm({ ...addrForm, address: e.target.value })}
                    placeholder="Street, building, suite"
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Zip Code</label>
                  <input
                    type="text"
                    value={addrForm.zipCode}
                    onChange={(e) => setAddrForm({ ...addrForm, zipCode: e.target.value })}
                    placeholder="75001"
                    className="w-full border border-gray-300 rounded-[2px] px-3 py-2 text-xs focus:border-[#00a99d] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-[2px] text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white font-medium rounded-[2px]"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb matching Screenshot */}
        <nav className="text-[13px] text-gray-500 mb-5 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/member/settings" className="hover:text-[#00a99d] transition-colors">
            Profile Settings
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">{getBreadcrumbTitle()}</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[22px] font-bold text-gray-900 mb-6">Profile Settings</h1>

        {/* Main Grid: Left Sidebar & Right Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* SIDEBAR NAVIGATION */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-white border border-[#ebebeb] rounded-[2px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <nav className="flex flex-col py-1">
                {/* 1. Update Profile */}
                <button
                  type="button"
                  onClick={() => handleTabChange("update-profile")}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] transition text-left cursor-pointer border-0 ${
                    activeTab === "update-profile"
                      ? "bg-[#f1f3f5] text-gray-900 font-semibold"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <User className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Update Profile</span>
                </button>

                {/* 2. Location */}
                <button
                  type="button"
                  onClick={() => handleTabChange("location")}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] transition text-left cursor-pointer border-0 ${
                    activeTab === "location"
                      ? "bg-[#f1f3f5] text-gray-900 font-semibold"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Location</span>
                </button>

                {/* 3. Shipping Address */}
                <button
                  type="button"
                  onClick={() => handleTabChange("shipping-address")}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] transition text-left cursor-pointer border-0 ${
                    activeTab === "shipping-address"
                      ? "bg-[#f1f3f5] text-gray-900 font-semibold"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Truck className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Shipping Address</span>
                </button>

                {/* 4. Affiliate Links */}
                <button
                  type="button"
                  onClick={() => handleTabChange("affiliate-links")}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] transition text-left cursor-pointer border-0 ${
                    activeTab === "affiliate-links"
                      ? "bg-[#f1f3f5] text-gray-900 font-semibold"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Link2 className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Affiliate Links</span>
                </button>

                {/* 5. Social Media */}
                <button
                  type="button"
                  onClick={() => handleTabChange("social-media")}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] transition text-left cursor-pointer border-0 ${
                    activeTab === "social-media"
                      ? "bg-[#f1f3f5] text-gray-900 font-semibold"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Share2 className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Social Media</span>
                </button>

                {/* 6. Change Password */}
                <button
                  type="button"
                  onClick={() => handleTabChange("change-password")}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] transition text-left cursor-pointer border-0 ${
                    activeTab === "change-password"
                      ? "bg-[#f1f3f5] text-gray-900 font-semibold"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Change Password</span>
                </button>

                {/* 7. Delete Account */}
                <button
                  type="button"
                  onClick={() => handleTabChange("delete-account")}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] transition text-left cursor-pointer border-0 ${
                    activeTab === "delete-account"
                      ? "bg-[#f1f3f5] text-gray-900 font-semibold"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <UserX className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Delete Account</span>
                </button>
              </nav>
            </div>
          </div>

          {/* RIGHT CONTENT PANEL */}
          <div className="md:col-span-8 lg:col-span-9">
            {/* ======================= 1. UPDATE PROFILE ======================= */}
            {activeTab === "update-profile" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleSaveProfile}>
                  {/* Cover Photo Area with Camera button */}
                  <div className="relative w-full h-[170px] sm:h-[190px] bg-[#f8f9fa] border border-[#ebebeb] rounded-[2px] overflow-hidden flex items-center justify-center">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-300 text-xs"></div>
                    )}
                    <label
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center cursor-pointer shadow-sm transition"
                      title="Upload Cover Photo"
                    >
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverChange}
                      />
                    </label>
                  </div>

                  {/* Circular Avatar with Camera button */}
                  <div className="relative w-[115px] h-[115px] sm:w-[125px] sm:h-[125px] rounded-full border-4 border-white shadow-md mx-auto -mt-[58px] sm:-mt-[63px] z-10 bg-white">
                    <img
                      src={avatarImage}
                      alt="Peter Jone"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <label
                      className="absolute bottom-0 right-1 w-7 h-7 rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center cursor-pointer shadow-sm transition z-20"
                      title="Upload Profile Photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>

                  {/* Note below image */}
                  <p className="text-[11px] sm:text-[12px] text-gray-500 italic text-center mt-3 mb-6">
                    *Click on the save changes button after selecting your image
                  </p>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Email Address */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Slug
                      </label>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    {/* First Name */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    {/* Tax Registration Number */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Tax Registration Number
                      </label>
                      <input
                        type="text"
                        placeholder="Tax Registration Number"
                        value={taxRegNumber}
                        onChange={(e) => setTaxRegNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>

                    {/* Cover Image Type Radio */}
                    <div className="pt-1">
                      <label className="block text-[13px] font-medium text-gray-700 mb-2">
                        Cover Image Type
                      </label>
                      <div className="flex items-center gap-6 text-xs text-gray-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="coverType"
                            checked={coverType === "full"}
                            onChange={() => setCoverType("full")}
                            className="accent-[#00a99d] w-3.5 h-3.5"
                          />
                          <span>Full Width</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="coverType"
                            checked={coverType === "fixed"}
                            onChange={() => setCoverType("fixed")}
                            className="accent-[#00a99d] w-3.5 h-3.5"
                          />
                          <span>Fixed</span>
                        </label>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-2.5 pt-2">
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyOnMessage}
                          onChange={(e) => setNotifyOnMessage(e.target.checked)}
                          className="accent-[#00a99d] w-3.5 h-3.5 rounded"
                        />
                        <span>Send me an email when someone send me a message</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showEmail}
                          onChange={(e) => setShowEmail(e.target.checked)}
                          className="accent-[#00a99d] w-3.5 h-3.5 rounded"
                        />
                        <span>Show my email address</span>
                      </label>
                      <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showPhone}
                          onChange={(e) => setShowPhone(e.target.checked)}
                          className="accent-[#00a99d] w-3.5 h-3.5 rounded"
                        />
                        <span>Show my phone number</span>
                      </label>
                    </div>

                    {/* Save Changes Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-7 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* ======================= 2. LOCATION ======================= */}
            {activeTab === "location" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleSaveLocation} className="space-y-4">
                  <label className="block text-[13px] font-medium text-gray-800">Location</label>

                  {/* Two dropdowns: Country & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition bg-white"
                      >
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="France">France</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Germany">Germany</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Japan">Japan</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 focus:border-[#00a99d] outline-none transition bg-white"
                      >
                        <option value="">State</option>
                        <option value="Centre">Centre</option>
                        <option value="Île-de-France">Île-de-France</option>
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                        <option value="Kabul">Kabul</option>
                      </select>
                    </div>
                  </div>

                  {/* Two inputs: Address (wide) and Zip Code (narrow) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-9">
                      <input
                        type="text"
                        placeholder="Address"
                        value={locationAddress}
                        onChange={(e) => setLocationAddress(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={locationZip}
                        onChange={(e) => setLocationZip(e.target.value)}
                        className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showLocation}
                        onChange={(e) => setShowLocation(e.target.checked)}
                        className="accent-[#00a99d] w-3.5 h-3.5 rounded"
                      />
                      <span>Show my location</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-7 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ======================= 3. SHIPPING ADDRESS ======================= */}
            {activeTab === "shipping-address" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-[#ebebeb] rounded-[2px] p-5 bg-white relative shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                    >
                      {/* Badge matching Screenshot */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#e3f2fd] text-[#1976d2] text-[11px] font-medium rounded-[2px]">
                        <Truck className="w-3.5 h-3.5" />
                        Shipping Address
                      </span>

                      {/* Header & Details */}
                      <h3 className="font-bold text-[14px] text-gray-900 mt-2.5 mb-1.5">
                        {addr.title}
                      </h3>
                      <p className="text-[13px] text-gray-700 leading-snug">{addr.fullName}</p>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">
                        {addr.addressLine}
                      </p>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">
                        {addr.contact}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => handleOpenEditAddress(addr)}
                          className="text-gray-400 hover:text-gray-700 transition cursor-pointer border-0 bg-transparent p-0"
                          title="Edit address"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirmModal({
                              open: true,
                              type: "address",
                              id: addr.id,
                              text: "Are you sure you want to delete this shipping address?",
                            })
                          }
                          className="text-gray-400 hover:text-red-500 transition cursor-pointer border-0 bg-transparent p-0"
                          title="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Address Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleOpenAddAddress}
                    className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-5 py-2.5 rounded-[2px] transition inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>
              </div>
            )}

            {/* ======================= 4. AFFILIATE LINKS ======================= */}
            {activeTab === "affiliate-links" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#ebebeb] text-[13px] font-bold text-gray-900">
                      <th className="py-3 px-3 font-semibold">Product</th>
                      <th className="py-3 px-3 font-semibold">Affiliate Link</th>
                      <th className="py-3 px-3 text-right font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebebeb] text-xs">
                    {affiliateLinks.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-8 text-gray-400 text-xs">
                          No affiliate links found.
                        </td>
                      </tr>
                    ) : (
                      affiliateLinks.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/60 transition">
                          <td className="py-3.5 px-3 text-gray-700 font-normal">
                            {item.productName}
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2 max-w-[420px]">
                              <span className="text-gray-600 truncate">{item.link}</span>
                              <button
                                type="button"
                                onClick={() => handleCopyLink(item.link)}
                                className="text-gray-400 hover:text-[#00a99d] transition cursor-pointer p-0 bg-transparent border-0 shrink-0"
                                title="Copy link"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <span className="text-gray-500 block leading-tight">{item.date}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteConfirmModal({
                                  open: true,
                                  type: "affiliate",
                                  id: item.id,
                                  text: "Are you sure you want to delete this affiliate link?",
                                })
                              }
                              className="text-red-500 hover:underline cursor-pointer text-[11px] mt-1 border-0 bg-transparent p-0 inline-block font-normal"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* ======================= 5. SOCIAL MEDIA ======================= */}
            {activeTab === "social-media" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleSaveSocial} className="space-y-4">
                  {/* Facebook */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Facebook URL
                    </label>
                    <input
                      type="text"
                      placeholder="Facebook URL"
                      value={socialMedia.facebook}
                      onChange={(e) =>
                        setSocialMedia({ ...socialMedia, facebook: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* X (Twitter) */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      X (Twitter) URL
                    </label>
                    <input
                      type="text"
                      placeholder="X (Twitter) URL"
                      value={socialMedia.twitter}
                      onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Instagram URL
                    </label>
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      value={socialMedia.instagram}
                      onChange={(e) =>
                        setSocialMedia({ ...socialMedia, instagram: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* TikTok */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      TikTok URL
                    </label>
                    <input
                      type="text"
                      placeholder="TikTok URL"
                      value={socialMedia.tiktok}
                      onChange={(e) => setSocialMedia({ ...socialMedia, tiktok: e.target.value })}
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      WhatsApp URL
                    </label>
                    <input
                      type="text"
                      placeholder="WhatsApp URL"
                      value={socialMedia.whatsapp}
                      onChange={(e) =>
                        setSocialMedia({ ...socialMedia, whatsapp: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Youtube */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Youtube URL
                    </label>
                    <input
                      type="text"
                      placeholder="Youtube URL"
                      value={socialMedia.youtube}
                      onChange={(e) => setSocialMedia({ ...socialMedia, youtube: e.target.value })}
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Discord */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Discord Url
                    </label>
                    <input
                      type="text"
                      placeholder="Discord Url"
                      value={socialMedia.discord}
                      onChange={(e) => setSocialMedia({ ...socialMedia, discord: e.target.value })}
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Telegram */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Telegram URL
                    </label>
                    <input
                      type="text"
                      placeholder="Telegram URL"
                      value={socialMedia.telegram}
                      onChange={(e) =>
                        setSocialMedia({ ...socialMedia, telegram: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Pinterest */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Pinterest URL
                    </label>
                    <input
                      type="text"
                      placeholder="Pinterest URL"
                      value={socialMedia.pinterest}
                      onChange={(e) =>
                        setSocialMedia({ ...socialMedia, pinterest: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      placeholder="LinkedIn URL"
                      value={socialMedia.linkedin}
                      onChange={(e) =>
                        setSocialMedia({ ...socialMedia, linkedin: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Twitch */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Twitch Url
                    </label>
                    <input
                      type="text"
                      placeholder="Twitch Url"
                      value={socialMedia.twitch}
                      onChange={(e) => setSocialMedia({ ...socialMedia, twitch: e.target.value })}
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* VK */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      VK URL
                    </label>
                    <input
                      type="text"
                      placeholder="VK URL"
                      value={socialMedia.vk}
                      onChange={(e) => setSocialMedia({ ...socialMedia, vk: e.target.value })}
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Personal Website */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Personal Website URL
                    </label>
                    <input
                      type="text"
                      placeholder="Personal Website URL"
                      value={socialMedia.website}
                      onChange={(e) => setSocialMedia({ ...socialMedia, website: e.target.value })}
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Save Changes Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-7 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ======================= 6. CHANGE PASSWORD ======================= */}
            {activeTab === "change-password" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleSavePassword} className="space-y-4">
                  {/* Old Password */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Old Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Old Password"
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Confirm Password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Change Password Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#00a99d] hover:bg-[#008f85] text-white font-medium text-xs px-6 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ======================= 7. DELETE ACCOUNT ======================= */}
            {activeTab === "delete-account" && (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                {/* Warning Alert Box */}
                <div className="bg-[#f8d7da] border border-[#f5c6cb] text-[#721c24] p-4 rounded-[2px] text-xs leading-relaxed mb-6 font-normal">
                  Deleting your account is permanent and cannot be reversed. All data, including preferences and subscriptions, will be lost. The process requires admin approval, which may take some time. Please enter your password and confirm to proceed.
                </div>

                <form onSubmit={handleDeleteAccount} className="space-y-4">
                  {/* Password */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={deleteAccountPass}
                      onChange={(e) => setDeleteAccountPass(e.target.value)}
                      className="w-full border border-gray-300 rounded-[2px] px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] outline-none transition"
                    />
                  </div>

                  {/* Delete Account Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#dc3545] hover:bg-[#c82333] text-white font-medium text-xs px-5 py-2.5 rounded-[2px] transition shadow-sm cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
