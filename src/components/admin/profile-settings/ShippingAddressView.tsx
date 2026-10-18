"use client";

import React, { useState } from "react";
import {
  Truck,
  Receipt,
  SquarePen,
  Trash2,
  PlusCircle,
  X,
  Check,
} from "lucide-react";
import { AddressItem } from "./types";
import { initialAddresses, COUNTRIES_LIST } from "./mockData";

export const ShippingAddressView: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressItem[]>(initialAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState<Omit<AddressItem, "id">>({
    type: "shipping",
    title: "",
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    country: "United States",
    email: "",
    phone: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingAddress(null);
    setFormData({
      type: "shipping",
      title: "",
      firstName: "John",
      lastName: "Doe",
      address: "",
      zipCode: "",
      city: "",
      state: "",
      country: "United States",
      email: "test@gmail.com",
      phone: "+1-202-555-0190",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (addr: AddressItem) => {
    setEditingAddress(addr);
    setFormData({
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
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      showToast("Address deleted successfully!");
    }
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter an address title");
      return;
    }

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id ? { ...formData, id: editingAddress.id } : a
        )
      );
      showToast("Address updated successfully!");
    } else {
      const newAddress: AddressItem = {
        ...formData,
        id: `addr-${Date.now()}`,
      };
      setAddresses((prev) => [...prev, newAddress]);
      showToast("New address added successfully!");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#00a99d] text-white px-5 py-3 rounded-[3px] shadow-lg text-[14px]">
          <Check className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2-Column Grid of Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => {
          const isShipping = addr.type === "shipping";

          return (
            <div
              key={addr.id}
              className="bg-white border border-[#e9ecef] rounded-[3px] p-5 relative hover:border-[#ced4da] transition-colors shadow-2xs"
            >
              {/* Type Badge */}
              <div className="mb-2">
                {isShipping ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] text-[11px] font-medium bg-[#e7f5ff] text-[#1971c2]">
                    <Truck className="w-3 h-3" />
                    <span>Shipping Address</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] text-[11px] font-medium bg-[#f1f3f5] text-[#495057]">
                    <Receipt className="w-3 h-3" />
                    <span>Billing Address</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-[15px] text-[#222222] mb-1.5">
                {addr.title}
              </h3>

              {/* Address details */}
              <div className="text-[13px] text-[#495057] space-y-1 mb-4 leading-relaxed">
                <div>
                  {addr.firstName} {addr.lastName}
                </div>
                <div>
                  {addr.address} {addr.zipCode} {addr.city}/{addr.state}/
                  {addr.country}
                </div>
                <div>
                  {addr.email} {addr.phone}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(addr)}
                  title="Edit Address"
                  className="text-[#6c757d] hover:text-[#212529] transition-colors cursor-pointer"
                >
                  <SquarePen className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(addr.id)}
                  title="Delete Address"
                  className="text-[#6c757d] hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Address Button */}
      <div className="pt-6">
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="bg-[#00a99d] hover:bg-[#008f85] text-white font-normal text-[14px] px-5 py-2.5 rounded-[2px] flex items-center gap-2 transition cursor-pointer shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Add / Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-[4px] max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-[16px] font-bold text-gray-800">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitModal} className="space-y-4">
              {/* Address Type Selection */}
              <div>
                <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
                  Address Type
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#495057]">
                    <input
                      type="radio"
                      name="addrType"
                      checked={formData.type === "shipping"}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, type: "shipping" }))
                      }
                      className="accent-[#00a99d]"
                    />
                    <span>Shipping Address</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#495057]">
                    <input
                      type="radio"
                      name="addrType"
                      checked={formData.type === "billing"}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, type: "billing" }))
                      }
                      className="accent-[#00a99d]"
                    />
                    <span>Billing Address</span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[13px] font-medium text-[#495057] mb-1">
                  Title (e.g. Home, Work)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Home"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                />
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#495057] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#495057] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#495057] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#495057] mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[13px] font-medium text-[#495057] mb-1">
                  Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                />
              </div>

              {/* City, State, Zip, Country */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#495057] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#495057] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, state: e.target.value }))
                    }
                    className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#495057] mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#495057] mb-1">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                    className="w-full h-[38px] px-3 text-[14px] border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] bg-white cursor-pointer"
                  >
                    {COUNTRIES_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-[13px] rounded-[2px] hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-[13px] rounded-[2px] transition cursor-pointer shadow-xs"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
