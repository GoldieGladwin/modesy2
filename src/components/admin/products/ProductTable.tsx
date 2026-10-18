"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tag, Trash2, X } from "lucide-react";
import { ProductItem, ProductPageViewType } from "./types";
import ProductOptionsDropdown from "./ProductOptionsDropdown";

interface ProductTableProps {
  products: ProductItem[];
  viewType: ProductPageViewType;
  onDelete?: (id: number) => void;
  onEdit?: (product: ProductItem) => void;
  onToggleFeatured?: (product: ProductItem) => void;
  onToggleSpecialOffer?: (product: ProductItem) => void;
  onBulkDelete?: (ids: number[]) => void;
}

export default function ProductTable({
  products,
  viewType,
  onDelete,
  onEdit,
  onToggleFeatured,
  onToggleSpecialOffer,
  onBulkDelete,
}: ProductTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(products.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleConfirmBulkDelete = () => {
    onBulkDelete?.(selectedIds);
    setSelectedIds([]);
    setShowBulkDeleteModal(false);
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const isAllSelected =
    products.length > 0 && selectedIds.length === products.length;

  return (
    <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs overflow-hidden">
      {/* Bulk actions bar if items selected */}
      {selectedIds.length > 0 && (
        <div className="bg-[#f0f2f5] border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-700">
          <div>
            <span className="font-semibold text-gray-900">
              {selectedIds.length}
            </span>{" "}
            products selected
          </div>
          <button
            type="button"
            onClick={() => setShowBulkDeleteModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded-[3px] shadow-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-white text-[#333333] font-semibold">
              <th className="py-3 px-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded-[2px] text-[#007bff]"
                />
              </th>
              <th className="py-3 px-3 w-14">Id</th>
              <th className="py-3 px-3 min-w-[280px]">Product</th>
              <th className="py-3 px-3 w-28">Product Type</th>
              <th className="py-3 px-3 w-32">Category</th>
              <th className="py-3 px-3 w-28">User</th>
              <th className="py-3 px-3 w-20">Price</th>
              <th className="py-3 px-3 w-28">Stock</th>

              {/* View-specific columns */}
              {viewType === "featured" && (
                <>
                  <th className="py-3 px-3 w-44">Purchased Plan</th>
                  <th className="py-3 px-3 w-28">Remaining Days</th>
                </>
              )}

              {viewType === "pending" && (
                <th className="py-3 px-3 w-24">Status</th>
              )}

              <th className="py-3 px-3 w-24">Page Views</th>
              <th className="py-3 px-3 w-28">Updated</th>
              <th className="py-3 px-3 w-36">Date</th>
              <th className="py-3 px-3 w-36 text-right">Options</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={viewType === "featured" ? 14 : 12}
                  className="py-12 text-center text-sm text-gray-500 font-medium"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isSelected = selectedIds.includes(product.id);
                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50/70 transition-colors ${
                      isSelected ? "bg-blue-50/30" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) =>
                          handleSelectOne(product.id, e.target.checked)
                        }
                        className="rounded-[2px] text-[#007bff]"
                      />
                    </td>

                    {/* Id */}
                    <td className="py-3 px-3 text-gray-500 font-mono">
                      {product.id}
                    </td>

                    {/* Product (Thumb + Title + SKU + Badges) */}
                    <td className="py-3 px-3">
                      <div className="flex items-start gap-3">
                        <div className="w-14 h-14 bg-gray-100 rounded-[3px] border border-gray-200 overflow-hidden shrink-0 relative">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback placeholder image
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/100x100?text=Product";
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-800 leading-snug line-clamp-2">
                            {product.title}
                          </p>
                          <p className="text-[11px] text-gray-500 font-mono">
                            SKU: {product.sku}
                          </p>
                          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                            {product.isFeatured && (
                              <span className="bg-[#28a745] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow-2xs">
                                Featured
                              </span>
                            )}
                            {product.isSpecialOffer && (
                              <span className="bg-[#17a2b8] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow-2xs">
                                Special Offer
                              </span>
                            )}
                            {product.discountRate && (
                              <span className="bg-[#f39c12] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] shadow-2xs inline-flex items-center gap-0.5">
                                <Tag className="w-2.5 h-2.5" />
                                {product.discountRate}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Product Type */}
                    <td className="py-3 px-3 text-gray-700">
                      {product.productType}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 text-gray-700 font-medium">
                      {product.category}
                    </td>

                    {/* User */}
                    <td className="py-3 px-3 text-gray-700 font-medium">
                      {product.user}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 font-semibold text-gray-800">
                      {product.price}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-3 text-[#28a745] font-medium">
                      {product.stock}
                    </td>

                    {/* View-specific: Purchased Plan & Remaining Days */}
                    {viewType === "featured" && (
                      <>
                        <td className="py-3 px-3">
                          <span className="inline-block bg-[#e4e7ea] text-gray-700 font-medium text-xs px-2.5 py-1 rounded-[3px]">
                            {product.purchasedPlan || "Monthly Plan"}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-gray-800">
                          {product.remainingDays ?? "-"}
                        </td>
                      </>
                    )}

                    {/* View-specific: Status */}
                    {viewType === "pending" && (
                      <td className="py-3 px-3">
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-[2px]">
                          Pending
                        </span>
                      </td>
                    )}

                    {/* Page Views */}
                    <td className="py-3 px-3 text-gray-600 font-medium">
                      {product.pageViews}
                    </td>

                    {/* Updated */}
                    <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                      {product.updated}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                      {product.date}
                    </td>

                    {/* Options */}
                    <td className="py-3 px-3 text-right">
                      <ProductOptionsDropdown
                        product={product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggleFeatured={onToggleFeatured}
                        onToggleSpecialOffer={onToggleSpecialOffer}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Delete Confirmation Modal */}
      {showBulkDeleteModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150"
          onClick={() => setShowBulkDeleteModal(false)}
        >
          <div
            className="bg-white rounded-[4px] shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">Delete Products</h3>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Are you sure you want to delete{" "}
                  <strong className="text-gray-900 font-semibold">
                    {selectedIds.length} selected products
                  </strong>
                  ?
                </p>
                <p className="text-[11px] text-red-500 font-medium mt-1">
                  This action cannot be undone.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBulkDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowBulkDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-[3px] text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBulkDelete}
                className="px-4 py-2 bg-[#e74c3c] hover:bg-[#c0392b] text-white rounded-[3px] text-xs font-semibold transition cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
