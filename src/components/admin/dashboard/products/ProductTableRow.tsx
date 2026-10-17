"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import { ProductItem } from "./types";
import ProductOptionsGroup from "./ProductOptionsGroup";

interface ProductTableRowProps {
  product: ProductItem;
  showPromote?: boolean;
  onEdit: (product: ProductItem) => void;
  onClone: (product: ProductItem) => void;
  onDelete: (id: number) => void;
  onOpenPromote: (product: ProductItem) => void;
}

export default function ProductTableRow({
  product,
  showPromote = true,
  onEdit,
  onClone,
  onDelete,
  onOpenPromote,
}: ProductTableRowProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const dateParts = product.date.includes(" / ")
    ? product.date.split(" / ")
    : [product.date];

  return (
    <tr className="border-b border-[#f4f4f4] hover:bg-[#fafafa]/80 transition-colors text-xs text-[#555] align-middle">
      {/* 1. Id */}
      <td className="py-3 px-3 text-[#555] font-normal w-10 text-center">
        {product.id}
      </td>

      {/* 2. Product (Image + Title + SKU + Discount/Featured Badge) */}
      <td className="py-3 px-3 min-w-[220px]">
        <div className="flex items-start gap-3">
          <div className="w-[50px] h-[50px] rounded-[3px] bg-[#f8f9fa] overflow-hidden shrink-0 border border-[#e2e8f0] flex items-center justify-center">
            {product.image && !imageFailed ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <ImageIcon className="w-5 h-5 text-[#cbd5e1]" strokeWidth={1.5} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={`/product/${product.id}`}
              className="text-[#333] hover:text-[#00a99d] font-normal leading-snug break-words transition-colors block text-xs"
            >
              {product.title}
            </Link>
            {product.sku && (
              <div className="text-[11px] text-[#777] font-normal mt-0.5">
                {product.sku.startsWith("SKU:") ? product.sku : `SKU: ${product.sku}`}
              </div>
            )}
            {/* Discount Badge */}
            {product.discount && (
              <span className="inline-block mt-1 bg-[#f8b922] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-[2px]">
                {product.discount}
              </span>
            )}
            {/* Featured Badge */}
            {product.isFeatured && (
              <span className="inline-block mt-1 bg-[#00a99d] text-white text-[10px] font-semibold px-2 py-0.5 rounded-[2px]">
                Featured
              </span>
            )}
          </div>
        </div>
      </td>

      {/* 3. Product Type */}
      <td className="py-3 px-3 whitespace-nowrap text-[#555]">
        {product.productType}
      </td>

      {/* 4. Category */}
      <td className="py-3 px-3 text-[#555]">
        {product.category}
      </td>

      {/* 5. Purchased Plan (+ Promote button or text) */}
      <td className="py-3 px-3 whitespace-nowrap">
        {product.purchasedPlan ? (
          <span className="text-xs text-[#555] font-normal">
            {product.purchasedPlan}
          </span>
        ) : showPromote ? (
          <button
            type="button"
            onClick={() => onOpenPromote(product)}
            className="bg-[#20c997] hover:bg-[#1baa80] text-white text-xs font-semibold px-2.5 py-1 rounded-[3px] inline-flex items-center gap-1 shadow-2xs transition cursor-pointer"
          >
            + Promote
          </button>
        ) : null}
      </td>

      {/* 6. Price */}
      <td className="py-3 px-3 whitespace-nowrap text-[#333] font-normal">
        {product.price}
      </td>

      {/* 7. Stock/Status */}
      <td className="py-3 px-3 whitespace-nowrap">
        {product.stock.toLowerCase().includes("out") ? (
          <span className="text-[#e74c3c] font-medium">{product.stock}</span>
        ) : product.stock.includes("(") ? (
          <>
            <span className="text-[#00a99d]">
              {product.stock.split("(")[0].trim()}{" "}
            </span>
            <span className="text-[#777]">
              ({product.stock.split("(")[1]}
            </span>
          </>
        ) : (
          <span className="text-[#00a99d]">{product.stock}</span>
        )}
      </td>

      {/* 8. Page Views */}
      <td className="py-3 px-3 whitespace-nowrap text-[#555]">
        {product.pageViews}
      </td>

      {/* 9. Date (Date / Time on line 1, Edited on line 2) */}
      <td className="py-3 px-3 whitespace-nowrap leading-tight">
        <div className="text-[#555]">{product.date}</div>
        {product.editedAgo && (
          <div className="text-[11px] text-[#888] mt-0.5">{product.editedAgo}</div>
        )}
      </td>

      {/* 10. Options */}
      <td className="py-3 px-3 whitespace-nowrap text-center">
        <ProductOptionsGroup
          product={product}
          onEdit={onEdit}
          onClone={onClone}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}
