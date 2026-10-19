'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  User,
  Target,
  Truck,
  Share2,
  Lock,
  UserX,
  Camera,
  Trash2,
  Pencil,
  X,
  Plus,
  Check,
  CheckCircle2,
} from 'lucide-react';
import ModesyHeader from '@/components/layout/guest/ModesyHeader';
import ModesyFooter from '@/components/layout/guest/ModesyFooter';
import { useAuth } from '@/context/AuthContext';

export type SettingsTab =
  | 'profile'
  | 'location'
  | 'shipping'
  | 'social'
  | 'password'
  | 'delete';

interface AddressCard {
  id: string;
  type: 'Shipping Address' | 'Billing Address';
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  email: string;
  phone: string;
}

interface VendorProfileSettingsViewProps {
  initialTab?: SettingsTab;
}

export default function VendorProfileSettingsView({
  initialTab = 'profile',
}: VendorProfileSettingsViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, updateUser } = useAuth();
  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  const determineTab = (): SettingsTab => {
    if (pathname) {
      if (pathname.includes('location')) return 'location';
      if (pathname.includes('shipping')) return 'shipping';
      if (pathname.includes('social')) return 'social';
      if (pathname.includes('password')) return 'password';
      if (pathname.includes('delete')) return 'delete';
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<SettingsTab>(determineTab);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(determineTab());
  }, [pathname, initialTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Profile form state matching Screenshot 1 & 2
  const [profileForm, setProfileForm] = useState({
    email: 'trendshop@gmail.com',
    slug: 'daniel-jones',
    firstName: 'Daniel',
    lastName: 'Jones',
    phone: '+49 123 45 67 89',
    taxNumber: '',
    coverType: 'full-width' as 'full-width' | 'boxed',
    sendEmailOnMessage: false,
    showEmail: true,
    showPhone: true,
    avatar: '/assets/img/trendshop-avatar.jpg',
    coverImage: '/images/banners/vendor-cover.jpg',
  });

  // Load persistent profile settings per user
  useEffect(() => {
    if (!user) return;
    const userScope = user.id || user.email || 'user';
    const storageKey = `modesy_profile_settings_${userScope}`;
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setProfileForm(JSON.parse(cached));
        return;
      }
    } catch {}

    const nameParts = (user.name || '').trim().split(' ');
    const first = nameParts[0] || '';
    const last = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    setProfileForm((prev) => ({
      ...prev,
      email: user.email || prev.email,
      firstName: first || prev.firstName,
      lastName: last || prev.lastName,
      avatar: user.avatar || prev.avatar,
      slug: (user.name || 'user').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }));
  }, [user]);

  // Location form state matching Screenshot 3
  const [locationForm, setLocationForm] = useState({
    country: 'Albania',
    state: 'Diber',
    address: '',
    zipCode: '',
    showLocation: false,
  });

  // Addresses state matching Screenshot 4 & 5
  const [addresses, setAddresses] = useState<AddressCard[]>([
    {
      id: 'addr-1',
      type: 'Shipping Address',
      title: 'Home',
      firstName: 'Daniel',
      lastName: 'Jones',
      address: 'Kirchgasse 64 Wiesbaden 65183 Wiesbaden/Berlin/Germany',
      email: 'test@gmail.com',
      phone: '+49 123 45 67 89',
    },
    {
      id: 'addr-2',
      type: 'Billing Address',
      title: 'Home Billing',
      firstName: 'Daniel',
      lastName: 'Jones',
      address: 'Kirchgasse 64 Wiesbaden 65183 Wiesbaden/Berlin/Germany',
      email: 'test@gmail.com',
      phone: '+49 123 45 67 89',
    },
    {
      id: 'addr-3',
      type: 'Shipping Address',
      title: 'Work',
      firstName: 'Daniel',
      lastName: 'Jones',
      address: 'Schutzenstrasse 12 Landstuhl 353434 Landstuhl/Berlin/Germany',
      email: 'test@gmail.com',
      phone: '+49 123 45 67 89',
    },
  ]);

  // Modal state for Add/Edit Address
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [modalAddressForm, setModalAddressForm] = useState({
    type: 'Shipping Address' as 'Shipping Address' | 'Billing Address',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Germany',
    state: 'Berlin',
    city: '',
    zipCode: '',
    address: '',
  });

  // Social form
  const [socialForm, setSocialForm] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    whatsapp: '',
    youtube: '',
    discord: '',
    telegram: '',
    pinterest: '',
    linkedin: '',
    twitch: '',
    vk: '',
    personalWebsite: '',
  });

  // Password form matching Screenshot 1
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  // Delete account form matching Screenshot 2
  const [deleteForm, setDeleteForm] = useState({
    password: '',
  });

  const handleTabClick = (tab: SettingsTab, href: string) => {
    setActiveTab(tab);
    router.push(href, { scroll: false });
  };

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'location':
        return 'Location';
      case 'shipping':
        return 'Shipping Address';
      case 'social':
        return 'Social Media';
      case 'password':
        return 'Change Password';
      case 'delete':
        return 'Delete Account';
      case 'profile':
      default:
        return 'Update Profile';
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm((prev) => ({ ...prev, avatar: reader.result as string }));
        showToast('Avatar image selected. Click Save Changes to apply.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm((prev) => ({ ...prev, coverImage: reader.result as string }));
        showToast('Cover photo selected. Click Save Changes to apply.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const full = `${profileForm.firstName} ${profileForm.lastName}`.trim() || profileForm.firstName || user?.name || 'User';

    if (updateUser) {
      await updateUser({
        name: full,
        avatar: profileForm.avatar,
      });
    }

    if (user) {
      const userScope = user.id || user.email || 'user';
      const storageKey = `modesy_profile_settings_${userScope}`;
      try {
        localStorage.setItem(storageKey, JSON.stringify(profileForm));
      } catch (err) {
        console.error('Failed to save profile settings to storage', err);
      }
    }

    showToast('Your profile changes have been saved successfully!');
  };

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your location settings have been saved successfully!');
  };

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setModalAddressForm({
      type: 'Shipping Address',
      title: '',
      firstName: 'Daniel',
      lastName: 'Jones',
      email: 'test@gmail.com',
      phone: '+49 123 45 67 89',
      country: 'Germany',
      state: 'Berlin',
      city: '',
      zipCode: '',
      address: '',
    });
    setShowAddressModal(true);
  };

  const handleOpenEditAddress = (addr: AddressCard) => {
    setEditingAddressId(addr.id);
    setModalAddressForm({
      type: addr.type,
      title: addr.title,
      firstName: addr.firstName,
      lastName: addr.lastName,
      email: addr.email,
      phone: addr.phone,
      country: addr.country || 'Germany',
      state: addr.state || 'Berlin',
      city: addr.city || '',
      zipCode: addr.zipCode || '',
      address: addr.address,
    });
    setShowAddressModal(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address has been removed.');
  };

  const handleSaveAddressModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalAddressForm.title.trim()) {
      alert('Please provide an Address Title.');
      return;
    }

    const formattedAddress = `${modalAddressForm.address} ${modalAddressForm.zipCode} ${modalAddressForm.city}/${modalAddressForm.state}/${modalAddressForm.country}`;

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddressId
            ? {
                ...a,
                type: modalAddressForm.type,
                title: modalAddressForm.title,
                firstName: modalAddressForm.firstName,
                lastName: modalAddressForm.lastName,
                email: modalAddressForm.email,
                phone: modalAddressForm.phone,
                address: formattedAddress,
              }
            : a
        )
      );
      showToast('Address updated successfully!');
    } else {
      const newAddr: AddressCard = {
        id: `addr-${Date.now()}`,
        type: modalAddressForm.type,
        title: modalAddressForm.title,
        firstName: modalAddressForm.firstName,
        lastName: modalAddressForm.lastName,
        email: modalAddressForm.email,
        phone: modalAddressForm.phone,
        address: formattedAddress,
      };
      setAddresses((prev) => [...prev, newAddr]);
      showToast('New address added successfully!');
    }
    setShowAddressModal(false);
  };

  const navItems = [
    {
      id: 'profile' as SettingsTab,
      label: 'Update Profile',
      href: '/settings/edit-profile',
      icon: User,
    },
    {
      id: 'location' as SettingsTab,
      label: 'Location',
      href: '/settings/location',
      icon: Target,
    },
    {
      id: 'shipping' as SettingsTab,
      label: 'Shipping Address',
      href: '/settings/shipping-address',
      icon: Truck,
    },
    {
      id: 'social' as SettingsTab,
      label: 'Social Media',
      href: '/settings/social-media',
      icon: Share2,
    },
    {
      id: 'password' as SettingsTab,
      label: 'Change Password',
      href: '/settings/change-password',
      icon: Lock,
    },
    {
      id: 'delete' as SettingsTab,
      label: 'Delete Account',
      href: '/settings/delete-account',
      icon: UserX,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased">
      {/* 1. Header (Trendshop Profile) */}
      <ModesyHeader
        currentUser={{
          name: 'Trendshop',
          email: 'trendshop@gmail.com',
          avatar: '/assets/img/trendshop-avatar.jpg',
          role: 'vendor',
        }}
        cartCount={3}
      />

      {/* 2. Main Content */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-gray-800">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-600 text-white text-xs font-medium rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Breadcrumb matching Screenshot: Home / Profile Settings / [Tab] */}
        <nav className="text-[12px] text-gray-500 mb-3 flex items-center gap-1.5 font-normal">
          <Link href="/" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/settings/edit_profile" className="hover:text-[#00a99d] transition-colors">
            Profile Settings
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">{getBreadcrumbTitle()}</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[22px] font-bold text-[#222222] mb-6">
          Profile Settings
        </h1>

        {/* 2-Column Layout: Sidebar + Form Content */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          {/* Left Sidebar Navigation matching Screenshot 1, 3, 4 */}
          <div className="w-full md:w-60 lg:w-64 shrink-0">
            <div className="bg-white border border-gray-200 rounded-[4px] p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <nav className="flex flex-col space-y-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabClick(item.id, item.href)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-[3px] transition-colors text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#ebedf0] text-gray-900 font-bold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0 stroke-[2] text-gray-500" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 w-full min-w-0">
            {/* TAB 1: UPDATE PROFILE (Screenshot 1 & 2) */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-5">
                {/* Cover Image & Avatar Banner matching Screenshot 1 */}
                <div className="relative mb-8">
                  {/* Banner Image Container */}
                  <div className="w-full h-48 sm:h-52 rounded-[4px] overflow-hidden relative bg-gray-100">
                    <Image
                      src={profileForm.coverImage}
                      alt="Store Cover Banner"
                      fill
                      priority
                      className="object-cover"
                    />

                    {/* Top Right Action Buttons on Banner */}
                    {/* Top Right Action Buttons on Banner */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                      <input
                        type="file"
                        ref={coverInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverChange}
                      />
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        title="Change Cover"
                        className="w-7 h-7 rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileForm((prev) => ({ ...prev, coverImage: '/images/banners/banner-1.webp' }));
                          showToast('Cover photo reset to default.');
                        }}
                        title="Delete Cover"
                        className="w-7 h-7 rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Circular Avatar overlapping banner */}
                  <div className="absolute -bottom-10 left-6 flex items-end">
                    <input
                      type="file"
                      ref={avatarInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                    <div className="relative w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-sm bg-[#f5d76e]">
                      <Image
                        src={profileForm.avatar}
                        alt="Trendshop Avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Change Avatar Button */}
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      title="Change Avatar"
                      className="w-7 h-7 -ml-6 mb-1 rounded-full bg-[#00a99d] hover:bg-[#008f85] text-white flex items-center justify-center border-2 border-white transition-colors cursor-pointer z-10 shadow-xs"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtitle notice below avatar */}
                <div className="pt-6 pb-2">
                  <p className="text-[11px] text-gray-500">
                    *Click on the save changes button after selecting your image
                  </p>
                </div>

                {/* Form Fields matching Screenshot 1 & 2 */}
                <div className="space-y-4 text-xs">
                  {/* Email Address */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      readOnly
                      className="w-full bg-[#f8f9fa] border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={profileForm.slug}
                      onChange={(e) => setProfileForm({ ...profileForm, slug: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>

                  {/* Tax Registration Number */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Tax Registration Number
                    </label>
                    <input
                      type="text"
                      placeholder="Tax Registration Number"
                      value={profileForm.taxNumber}
                      onChange={(e) => setProfileForm({ ...profileForm, taxNumber: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                    />
                  </div>

                  {/* Cover Image Type Radio Buttons */}
                  <div className="pt-1">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Cover Image Type
                    </label>
                    <div className="flex items-center gap-6 text-xs text-gray-700">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="coverType"
                          checked={profileForm.coverType === 'full-width'}
                          onChange={() => setProfileForm({ ...profileForm, coverType: 'full-width' })}
                          className="accent-[#00a99d] cursor-pointer"
                        />
                        <span>Full Width</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="coverType"
                          checked={profileForm.coverType === 'boxed'}
                          onChange={() => setProfileForm({ ...profileForm, coverType: 'boxed' })}
                          className="accent-[#00a99d] cursor-pointer"
                        />
                        <span>Boxed</span>
                      </label>
                    </div>
                  </div>

                  {/* Checkboxes matching Screenshot 2 */}
                  <div className="space-y-2.5 pt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-700">
                      <input
                        type="checkbox"
                        checked={profileForm.sendEmailOnMessage}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, sendEmailOnMessage: e.target.checked })
                        }
                        className="rounded border-gray-300 accent-[#00a99d] cursor-pointer"
                      />
                      <span>Send me an email when someone send me a message</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-700">
                      <input
                        type="checkbox"
                        checked={profileForm.showEmail}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, showEmail: e.target.checked })
                        }
                        className="rounded border-gray-300 accent-[#00a99d] cursor-pointer"
                      />
                      <span>Show my email address</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-700">
                      <input
                        type="checkbox"
                        checked={profileForm.showPhone}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, showPhone: e.target.checked })
                        }
                        className="rounded border-gray-300 accent-[#00a99d] cursor-pointer"
                      />
                      <span>Show my phone number</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition cursor-pointer shadow-xs"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 2: LOCATION (Screenshot 3) */}
            {activeTab === 'location' && (
              <form onSubmit={handleSaveLocation} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Location
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {/* Country Dropdown */}
                    <div className="relative">
                      <select
                        value={locationForm.country}
                        onChange={(e) => setLocationForm({ ...locationForm, country: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 appearance-none focus:outline-none focus:border-[#00a99d] cursor-pointer"
                      >
                        <option value="Albania">Albania</option>
                        <option value="Germany">Germany</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="France">France</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* State Dropdown */}
                    <div className="relative">
                      <select
                        value={locationForm.state}
                        onChange={(e) => setLocationForm({ ...locationForm, state: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 appearance-none focus:outline-none focus:border-[#00a99d] cursor-pointer"
                      >
                        <option value="Diber">Diber</option>
                        <option value="Tirana">Tirana</option>
                        <option value="Durres">Durres</option>
                        <option value="Berlin">Berlin</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Address & Zip Code Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        placeholder="Address"
                        value={locationForm.address}
                        onChange={(e) => setLocationForm({ ...locationForm, address: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={locationForm.zipCode}
                        onChange={(e) => setLocationForm({ ...locationForm, zipCode: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                      />
                    </div>
                  </div>
                </div>

                {/* Show location checkbox */}
                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input
                      type="checkbox"
                      checked={locationForm.showLocation}
                      onChange={(e) => setLocationForm({ ...locationForm, showLocation: e.target.checked })}
                      className="rounded border-gray-300 accent-[#00a99d] cursor-pointer"
                    />
                    <span>Show my location</span>
                  </label>
                </div>

                {/* Save Changes button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition cursor-pointer shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: SHIPPING ADDRESS (Screenshot 4 & 5) */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                {/* Grid of Address Cards matching Screenshot 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white border border-gray-200 rounded-[4px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-2 relative"
                    >
                      {/* Badge Top Left */}
                      <div>
                        {addr.type === 'Shipping Address' ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#e8f4fd] text-[#1890ff]">
                            Shipping Address
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#f0f2f5] text-gray-600">
                            Billing Address
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <div className="font-bold text-gray-900 text-sm">
                        {addr.title}
                      </div>

                      {/* Name & Address */}
                      <div className="text-xs text-gray-600 space-y-0.5">
                        <div className="font-medium text-gray-800">
                          {addr.firstName} {addr.lastName}
                        </div>
                        <div className="text-gray-600 leading-relaxed">
                          {addr.address}
                        </div>
                        <div className="text-gray-500">
                          {addr.email} {addr.phone}
                        </div>
                      </div>

                      {/* Action Icons Bottom Left matching Screenshot 4 */}
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => handleOpenEditAddress(addr)}
                          title="Edit"
                          className="text-gray-400 hover:text-[#00a99d] transition cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5 stroke-[2]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(addr.id)}
                          title="Delete"
                          className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* + Add New Address Button matching Screenshot 4 */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleOpenAddAddress}
                    className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add New Address</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: SOCIAL MEDIA */}
            {activeTab === 'social' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast('Social media links updated successfully!');
                }}
                className="space-y-4 text-xs"
              >
                {/* Facebook URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Facebook URL</label>
                  <input
                    type="url"
                    placeholder="Facebook URL"
                    value={socialForm.facebook}
                    onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* Twitter URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Twitter URL</label>
                  <input
                    type="url"
                    placeholder="Twitter URL"
                    value={socialForm.twitter}
                    onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* Instagram URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Instagram URL</label>
                  <input
                    type="url"
                    placeholder="Instagram URL"
                    value={socialForm.instagram}
                    onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* WhatsApp URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">WhatsApp URL</label>
                  <input
                    type="url"
                    placeholder="WhatsApp URL"
                    value={socialForm.whatsapp}
                    onChange={(e) => setSocialForm({ ...socialForm, whatsapp: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* Youtube URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Youtube URL</label>
                  <input
                    type="url"
                    placeholder="Youtube URL"
                    value={socialForm.youtube}
                    onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* Discord Url */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Discord Url</label>
                  <input
                    type="url"
                    placeholder="Discord Url"
                    value={socialForm.discord}
                    onChange={(e) => setSocialForm({ ...socialForm, discord: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* Telegram URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Telegram URL</label>
                  <input
                    type="url"
                    placeholder="Telegram URL"
                    value={socialForm.telegram}
                    onChange={(e) => setSocialForm({ ...socialForm, telegram: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* Pinterest URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Pinterest URL</label>
                  <input
                    type="url"
                    placeholder="Pinterest URL"
                    value={socialForm.pinterest}
                    onChange={(e) => setSocialForm({ ...socialForm, pinterest: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* Linkedin URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Linkedin URL</label>
                  <input
                    type="url"
                    placeholder="Linkedin URL"
                    value={socialForm.linkedin}
                    onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* Twitch Url */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Twitch Url</label>
                  <input
                    type="url"
                    placeholder="Twitch Url"
                    value={socialForm.twitch}
                    onChange={(e) => setSocialForm({ ...socialForm, twitch: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* VK URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">VK URL</label>
                  <input
                    type="url"
                    placeholder="VK URL"
                    value={socialForm.vk}
                    onChange={(e) => setSocialForm({ ...socialForm, vk: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                {/* Personal Website URL */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Personal Website URL</label>
                  <input
                    type="url"
                    placeholder="Personal Website URL"
                    value={socialForm.personalWebsite}
                    onChange={(e) => setSocialForm({ ...socialForm, personalWebsite: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition cursor-pointer shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* TAB 5: CHANGE PASSWORD (Screenshot 1) */}
            {activeTab === 'password' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!passwordForm.oldPassword) {
                    alert('Please enter your Old Password.');
                    return;
                  }
                  if (!passwordForm.password) {
                    alert('Please enter your new Password.');
                    return;
                  }
                  if (passwordForm.password !== passwordForm.confirmPassword) {
                    alert('Password and Confirm Password do not match.');
                    return;
                  }
                  showToast('Password changed successfully!');
                  setPasswordForm({ oldPassword: '', password: '', confirmPassword: '' });
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Old Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Old Password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={passwordForm.password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition cursor-pointer shadow-xs"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            )}

            {/* TAB 6: DELETE ACCOUNT (Screenshot 2) */}
            {activeTab === 'delete' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!deleteForm.password) {
                    alert('Please enter your password to proceed.');
                    return;
                  }
                  alert('Account deletion requires admin approval. Your request has been recorded.');
                  setDeleteForm({ password: '' });
                }}
                className="space-y-4 text-xs"
              >
                {/* Red Warning Banner matching Screenshot 2 */}
                <div className="p-4 bg-[#f8d7da] border border-[#f5c6cb] text-[#721c24] text-xs rounded-[3px] leading-relaxed mb-4">
                  Deleting your account is permanent and cannot be reversed. All data, including preferences and subscriptions, will be lost. The process requires admin approval, which may take some time. Please enter your password and confirm to proceed.
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={deleteForm.password}
                    onChange={(e) => setDeleteForm({ password: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#d9534f] hover:bg-[#c9302c] text-white text-xs font-semibold rounded-[3px] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Modal: Add / Edit Address matching Screenshot 5 */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] shadow-2xl max-w-[560px] w-full p-8 relative animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button top right */}
            <button
              type="button"
              onClick={() => setShowAddressModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Modal Title centered */}
            <h3 className="text-base font-bold text-gray-900 text-center mb-6">
              {editingAddressId ? 'Edit Address' : 'Add New Address'}
            </h3>

            <form onSubmit={handleSaveAddressModal} className="space-y-4 text-xs">
              {/* Address Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Address Type</label>
                <div className="relative">
                  <select
                    value={modalAddressForm.type}
                    onChange={(e) =>
                      setModalAddressForm({
                        ...modalAddressForm,
                        type: e.target.value as 'Shipping Address' | 'Billing Address',
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-800 appearance-none focus:outline-none focus:border-[#00a99d] cursor-pointer"
                  >
                    <option value="Shipping Address">Shipping Address</option>
                    <option value="Billing Address">Billing Address</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Address Title */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Address Title</label>
                <input
                  type="text"
                  required
                  placeholder="Address Title"
                  value={modalAddressForm.title}
                  onChange={(e) => setModalAddressForm({ ...modalAddressForm, title: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                />
              </div>

              {/* Row: First Name | Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={modalAddressForm.firstName}
                    onChange={(e) => setModalAddressForm({ ...modalAddressForm, firstName: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={modalAddressForm.lastName}
                    onChange={(e) => setModalAddressForm({ ...modalAddressForm, lastName: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
              </div>

              {/* Row: Email | Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={modalAddressForm.email}
                    onChange={(e) => setModalAddressForm({ ...modalAddressForm, email: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="Phone Number"
                    value={modalAddressForm.phone}
                    onChange={(e) => setModalAddressForm({ ...modalAddressForm, phone: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
              </div>

              {/* Row: Country | State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Country</label>
                  <div className="relative">
                    <select
                      value={modalAddressForm.country}
                      onChange={(e) => setModalAddressForm({ ...modalAddressForm, country: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 appearance-none focus:outline-none focus:border-[#00a99d] cursor-pointer"
                    >
                      <option value="Germany">Germany</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Albania">Albania</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">State</label>
                  <div className="relative">
                    <select
                      value={modalAddressForm.state}
                      onChange={(e) => setModalAddressForm({ ...modalAddressForm, state: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 appearance-none focus:outline-none focus:border-[#00a99d] cursor-pointer"
                    >
                      <option value="Berlin">Berlin</option>
                      <option value="Hesse">Hesse</option>
                      <option value="Bavaria">Bavaria</option>
                      <option value="New York">New York</option>
                      <option value="Diber">Diber</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row: City | Zip Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={modalAddressForm.city}
                    onChange={(e) => setModalAddressForm({ ...modalAddressForm, city: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Zip Code</label>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={modalAddressForm.zipCode}
                    onChange={(e) => setModalAddressForm({ ...modalAddressForm, zipCode: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Address</label>
                <input
                  type="text"
                  required
                  placeholder="Address"
                  value={modalAddressForm.address}
                  onChange={(e) => setModalAddressForm({ ...modalAddressForm, address: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition cursor-pointer shadow-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Footer */}
      <ModesyFooter />
    </div>
  );
}
