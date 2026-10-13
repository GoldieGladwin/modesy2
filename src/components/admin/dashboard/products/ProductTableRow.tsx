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
      <td className="py-3 px-2.5 text-[#333] font-normal w-10">
        {product.id}
      </td>

      {/* 2. Product (Image + Title + SKU + Featured Badge) */}
      <td className="py-3 px-2.5 min-w-[220px]">
        <div className="flex items-start gap-3">
          <div className="w-[58px] h-[58px] rounded-[3px] bg-[#f8f9fa] overflow-hidden shrink-0 border border-[#e2e8f0] flex items-center justify-center">
            {product.image && !imageFailed ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <ImageIcon className="w-6 h-6 text-[#cbd5e1]" strokeWidth={1.5} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={`/product/${product.id}`}
              className="text-[#007bff] hover:text-[#0056b3] hover:underline font-medium leading-snug break-words transition-colors block"
            >
              {product.title}
            </Link>
            {product.sku && (
              <div className="text-[11px] text-[#333] font-semibold mt-1">
                SKU: {product.sku}
              </div>
            )}
            {product.isFeatured && (
              <span className="inline-block mt-1 bg-[#00a99d] text-white text-[10px] font-semibold px-2 py-0.5 rounded-[3px]">
                Featured
              </span>
            )}
          </div>
        </div>
      </td>

      {/* 3. Product Type */}
      <td className="py-3 px-2.5 whitespace-nowrap text-[#555]">
        {product.productType}
      </td>

      {/* 4. Category */}
      <td className="py-3 px-2.5 text-[#555]">
        {product.category}
      </td>

      {/* 5. Purchased Plan (+ Promote or text) */}
      <td className="py-3 px-2.5 whitespace-nowrap">
        {product.purchasedPlan ? (
          <span className="text-xs text-[#555] font-normal">
            {product.purchasedPlan}
          </span>
        ) : showPromote ? (
          <button
            type="button"
            onClick={() => onOpenPromote(product)}
            className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] inline-flex items-center gap-1 shadow-2xs transition cursor-pointer"
          >
            + Promote
          </button>
        ) : null}
      </td>

      {/* 6. Price */}
      <td className="py-3 px-2.5 whitespace-nowrap text-[#333] font-normal">
        {product.price}
      </td>

      {/* 7. Stock/Status (Teal colored text) */}
      <td className="py-3 px-2.5 whitespace-nowrap text-[#00a99d] font-normal">
        {product.stock}
      </td>

      {/* 8. Page Views */}
      <td className="py-3 px-2.5 whitespace-nowrap text-[#555]">
        {product.pageViews}
      </td>

      {/* 9. Date (Date on line 1, Edited on line 2) */}
      <td className="py-3 px-2.5 whitespace-nowrap leading-tight">
        {dateParts.length > 1 ? (
          <>
            <div className="text-[#333]">{dateParts[0]} /</div>
            <div className="text-[#333] mt-0.5">{dateParts[1]}</div>
          </>
        ) : (
          <div className="text-[#333]">{product.date}</div>
        )}
        {product.editedAgo && (
          <div className="text-[11px] text-[#888] mt-0.5">{product.editedAgo}</div>
        )}
      </td>

      {/* 10. Options (Edit, Clone, Delete buttons grouped) */}
      <td className="py-3 px-2.5 whitespace-nowrap text-center">
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
