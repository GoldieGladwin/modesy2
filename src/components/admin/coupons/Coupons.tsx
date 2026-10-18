"use client";

import React, { useState, useMemo } from "react";
import { INITIAL_COUPONS } from "./mockData";
import { Coupon, CouponFormData, CouponStatus, DiscountType } from "./types";
import CouponHeader from "./CouponHeader";
import CouponFilterBar from "./CouponFilterBar";
import CouponTable from "./CouponTable";
import CouponCard from "./CouponCard";
import CouponModal from "./CouponModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CouponPagination from "./CouponPagination";
import { Check, Info } from "lucide-react";

interface CouponsProps {
  initialViewMode?: "cards" | "table";
  showBreadcrumb?: boolean;
}

export default function Coupons({
  initialViewMode = "cards",
  showBreadcrumb = true,
}: CouponsProps) {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"All" | CouponStatus>("All");
  const [typeFilter, setTypeFilter] = useState<"All" | DiscountType>("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">(initialViewMode);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = viewMode === "cards" ? 6 : 8;

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | null>(null);

  // Toast / feedback message state
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "info";
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const showToast = (text: string, type: "success" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filtered coupons calculation
  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      // Search matching code or name
      const query = searchTerm.trim().toLowerCase();
      const matchSearch =
        !query ||
        coupon.code.toLowerCase().includes(query) ||
        coupon.name.toLowerCase().includes(query) ||
        coupon.shopName.toLowerCase().includes(query);

      // Status filter
      const matchStatus =
        statusFilter === "All" || coupon.status === statusFilter;

      // Type filter
      const matchType =
        typeFilter === "All" || coupon.discountType === typeFilter;

      return matchSearch && matchStatus && matchType;
    });
  }, [coupons, searchTerm, statusFilter, typeFilter]);

  // Paginated coupons
  const paginatedCoupons = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCoupons.slice(startIndex, startIndex + pageSize);
  }, [filteredCoupons, currentPage, pageSize]);

  // Statistics counters
  const totalCount = coupons.length;
  const activeCount = coupons.filter((c) => c.status === "Active").length;
  const scheduledCount = coupons.filter((c) => c.status === "Scheduled").length;
  const expiredCount = coupons.filter((c) => c.status === "Expired").length;

  // Handlers
  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleSaveCoupon = (formData: CouponFormData) => {
    if (editingCoupon) {
      // Update existing coupon
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === editingCoupon.id
            ? {
                ...c,
                ...formData,
              }
            : c
        )
      );
      showToast(`Coupon "${formData.code}" updated successfully.`);
    } else {
      // Add new coupon
      const newCoupon: Coupon = {
        id: `CPN-${Date.now().toString().slice(-4)}`,
        ...formData,
        usageCount: 0,
        imageUrl: "/images/products/floral-sundress.webp",
      };
      setCoupons((prev) => [newCoupon, ...prev]);
      showToast(`New coupon "${newCoupon.code}" created successfully.`);
    }
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingCoupon) return;
    setCoupons((prev) => prev.filter((c) => c.id !== deletingCoupon.id));
    showToast(`Coupon "${deletingCoupon.code}" has been deleted.`, "info");
    setDeletingCoupon(null);
  };

  const handleCopyCode = async (code: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      }
    } catch {
      // Fallback if clipboard API is not available
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopiedCode(code);
    showToast(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setTypeFilter("All");
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode: "cards" | "table") => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded shadow-lg text-xs font-semibold text-white ${
              toastMessage.type === "success" ? "bg-[#00a99d]" : "bg-gray-800"
            }`}
          >
            {toastMessage.type === "success" ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <Info className="w-4 h-4 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Header with Title, Stats, and View Mode Toggle */}
      <CouponHeader
        title="My Coupons"
        totalCount={totalCount}
        activeCount={activeCount}
        scheduledCount={scheduledCount}
        expiredCount={expiredCount}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onAddCoupon={handleOpenAdd}
        showBreadcrumb={showBreadcrumb}
      />

      {/* Search and Filters */}
      <CouponFilterBar
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusFilterChange={(status) => {
          setStatusFilter(status);
          setCurrentPage(1);
        }}
        typeFilter={typeFilter}
        onTypeFilterChange={(type) => {
          setTypeFilter(type);
          setCurrentPage(1);
        }}
        onResetFilters={handleResetFilters}
      />

      {/* Main Content Area: Cards View or Table View */}
      {viewMode === "cards" ? (
        <>
          {filteredCoupons.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded p-12 text-center shadow-xs">
              <h3 className="text-sm font-semibold text-gray-800">
                No coupons found
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Try adjusting your search query or status filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  onEdit={handleOpenEdit}
                  onDelete={setDeletingCoupon}
                  onCopy={handleCopyCode}
                  isCopied={copiedCode === coupon.code}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <CouponTable
          coupons={paginatedCoupons}
          onEdit={handleOpenEdit}
          onDelete={setDeletingCoupon}
          onCopy={handleCopyCode}
          copiedCode={copiedCode}
        />
      )}

      {/* Pagination */}
      <CouponPagination
        currentPage={currentPage}
        totalItems={filteredCoupons.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* Add / Edit Modal */}
      <CouponModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCoupon(null);
        }}
        onSave={handleSaveCoupon}
        initialData={editingCoupon}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        coupon={deletingCoupon}
        isOpen={Boolean(deletingCoupon)}
        onClose={() => setDeletingCoupon(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
