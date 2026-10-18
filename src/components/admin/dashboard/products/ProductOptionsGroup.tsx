"use client";

import React from "react";
import { SquarePen, Copy, Trash2 } from "lucide-react";
import { ProductItem } from "./types";

interface ProductOptionsGroupProps {
  product: ProductItem;
  onEdit: (product: ProductItem) => void;
  onClone: (product: ProductItem) => void;
  onDelete: (id: number) => void;
}

export default function ProductOptionsGroup({
  product,
  onEdit,
  onClone,
  onDelete,
}: ProductOptionsGroupProps) {
  return (
    <div className="inline-flex items-center border border-[#d2d6de] rounded-[4px] bg-[#f8f9fa] divide-x divide-[#d2d6de] shadow-2xs overflow-hidden">
      {/* 1. Edit */}
      <button
        type="button"
        onClick={() => onEdit(product)}
        title="Edit product"
        className="p-2 text-gray-600 hover:text-[#00a99d] hover:bg-white transition cursor-pointer"
      >
        <SquarePen className="w-3.5 h-3.5" />
      </button>

      {/* 2. Clone / Duplicate */}
      <button
        type="button"
        onClick={() => onClone(product)}
        title="Duplicate product"
        className="p-2 text-gray-600 hover:text-[#00a99d] hover:bg-white transition cursor-pointer"
      >
        <Copy className="w-3.5 h-3.5" />
      </button>

      {/* 3. Delete */}
      <button
        type="button"
        onClick={() => onDelete(product.id)}
        title="Delete product"
        className="p-2 text-gray-600 hover:text-red-600 hover:bg-white transition cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
