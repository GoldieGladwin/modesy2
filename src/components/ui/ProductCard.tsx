import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ProductCard({
  title,
  seller,
  currentPrice,
}: {
  title: string;
  seller: string;
  currentPrice: string;
}) {
  return (
    <Link href="/product/1">
      <div className="group bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-md transition-all duration-300 relative cursor-pointer h-full flex flex-col">
        <div className="relative aspect-[4/5] bg-gray-100 w-full overflow-hidden">
          <img
            src="https://placehold.co/400x500/eeeeee/999999?text=Product"
            alt={title}
            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          />
          <img
            src="https://placehold.co/400x500/dddddd/666666?text=Hover"
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
            <button
              type="button"
              className="bg-white rounded-full p-2 text-gray-400 hover:text-green-600 shadow-sm flex items-center justify-center w-8 h-8"
            >
              <Heart size={16} />
            </button>
            <button
              type="button"
              className="bg-white rounded-full p-2 text-gray-400 hover:text-green-600 shadow-sm flex items-center justify-center w-8 h-8"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-[13px] font-medium text-gray-800 leading-tight mb-1 line-clamp-2 min-h-[30px] group-hover:text-green-600 transition-colors">
              {title}
            </h3>
            <div className="text-[11px] text-gray-500 mb-2">{seller}</div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <div className="flex items-center text-gray-400 text-xs">
                <Heart size={12} className="mr-1" />
                <span>10</span>
              </div>
            </div>
          </div>
          <div className="text-sm font-bold text-green-600">{currentPrice}</div>
        </div>
      </div>
    </Link>
  );
}
