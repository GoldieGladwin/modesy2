"use client";

import React, { useState } from "react";
import { Star, Heart, ChevronDown, ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  title: string;
  seller: string;
  rating: number;
  reviewsCount?: number;
  favoriteCount: number;
  currentPrice: string;
  originalPrice?: string;
  imageUrl: string;
  hoverImageUrl: string;
  fallbackImageUrl?: string;
  fallbackHoverImageUrl?: string;
};

const products: Product[] = [
  {
    id: "1",
    title: "Black midi skirt with white flowers",
    seller: "Trendshop",
    rating: 4,
    favoriteCount: 12,
    currentPrice: "$48",
    originalPrice: "$55",
    imageUrl: "/images/products/midi-skirt.webp",
    hoverImageUrl: "/images/products/floral-sundress-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48564a31327-49271135.webp",
  },
  {
    id: "2",
    title: "Handcrafted decorative pillow for a luxurious touch",
    seller: "Admin",
    rating: 5,
    favoriteCount: 8,
    currentPrice: "$59",
    originalPrice: "$69",
    imageUrl: "/images/products/pillow.webp",
    hoverImageUrl: "/images/products/pillow-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b483286b2598-48004230.webp",
  },
  {
    id: "3",
    title: "Floral women sundress",
    seller: "Admin",
    rating: 4,
    favoriteCount: 15,
    currentPrice: "$80",
    originalPrice: "$89",
    imageUrl: "/images/products/floral-sundress.webp",
    hoverImageUrl: "/images/products/floral-sundress-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4782b9f3272-81456431.webp",
  },
  {
    id: "4",
    title: "Women elegant knitted scarves",
    seller: "Trendshop",
    rating: 5,
    favoriteCount: 6,
    currentPrice: "$29",
    imageUrl: "/images/products/scarves.webp",
    hoverImageUrl: "/images/products/scarves-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b444b8350808-17188737.webp",
  },
  {
    id: "5",
    title: "Leather brown bootie and boots",
    seller: "Trendshop",
    rating: 5,
    favoriteCount: 19,
    currentPrice: "$89",
    originalPrice: "$100",
    imageUrl: "/images/products/brown-bootie.webp",
    hoverImageUrl: "/images/products/brown-bootie-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4201f177942-79779282.webp",
  },
  {
    id: "6",
    title: "Women kipling bailey saddle handbag",
    seller: "Admin",
    rating: 4,
    favoriteCount: 22,
    currentPrice: "$59",
    originalPrice: "$69",
    imageUrl: "/images/products/kipling-bag.webp",
    hoverImageUrl: "/images/products/kipling-bag-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b47ead253a50-47019432.webp",
  },
  {
    id: "7",
    title: "Cobalt man t-shirt all colors",
    seller: "Admin",
    rating: 4,
    favoriteCount: 5,
    currentPrice: "Request a Quote",
    imageUrl: "/images/products/cobalt-man-tshirt.webp",
    hoverImageUrl: "/images/products/cobalt-man-tshirt-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b42a279b91f6-61790023.webp",
  },
  {
    id: "8",
    title: "Adorable cat artwork illustration prints",
    seller: "Admin",
    rating: 5,
    favoriteCount: 14,
    currentPrice: "Free",
    imageUrl: "/images/products/cat-art.webp",
    hoverImageUrl: "/images/products/cat-art-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b47e4f83c917-29188591.webp",
  },
  {
    id: "9",
    title: "Sailing ship art poster print",
    seller: "Admin",
    rating: 4,
    favoriteCount: 7,
    currentPrice: "$15",
    originalPrice: "$34",
    imageUrl: "/images/products/ship-art.webp",
    hoverImageUrl: "/images/products/cat-art-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b411ed6f0554-72302953.webp",
  },
  {
    id: "10",
    title: "Grey comfortable sofa couch",
    seller: "Trendshop",
    rating: 5,
    favoriteCount: 11,
    currentPrice: "$210",
    originalPrice: "$250",
    imageUrl: "/images/products/grey-couch.webp",
    hoverImageUrl: "/images/products/pillow.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b483286b2598-48004230.webp",
  },
  {
    id: "11",
    title: "Light blue women shirt",
    seller: "Trendshop",
    rating: 5,
    favoriteCount: 9,
    currentPrice: "$49",
    originalPrice: "$69",
    imageUrl: "/images/products/light-blue-shirt.webp",
    hoverImageUrl: "/images/products/light-blue-shirt-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48564a31327-49271135.webp",
  },
  {
    id: "12",
    title: "Summer fashion top lace blouse",
    seller: "Trendshop",
    rating: 5,
    favoriteCount: 18,
    currentPrice: "$65",
    originalPrice: "$79",
    imageUrl: "/images/products/summer-top-lace.webp",
    hoverImageUrl: "/images/products/summer-top-lace-hover.webp",
    fallbackImageUrl: "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4201f177942-79779282.webp",
  },
];

export default function FeaturedProducts() {
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Featured Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => {
          const isLiked = !!likedMap[product.id];
          const displayLikes = product.favoriteCount + (isLiked ? 1 : 0);

          return (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 rounded-[4px] overflow-hidden hover:shadow-md transition-all duration-300 relative cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] bg-gray-50 w-full overflow-hidden">
                {/* Primary Image */}
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-400 ease-in-out group-hover:scale-105 group-hover:opacity-0"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (product.fallbackImageUrl && !target.src.includes("modesy.codingest")) {
                      target.src = product.fallbackImageUrl;
                    }
                  }}
                />
                
                {/* Secondary (Hover) Image */}
                <img
                  src={product.hoverImageUrl}
                  alt={`${product.title} alternate view`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-400 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (product.fallbackHoverImageUrl) {
                      target.src = product.fallbackHoverImageUrl;
                    } else if (product.fallbackImageUrl) {
                      target.src = product.fallbackImageUrl;
                    }
                  }}
                />
                
                {/* Hover Actions (Cart & Wishlist) */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                  <button
                    type="button"
                    onClick={(e) => toggleLike(product.id, e)}
                    className={`bg-white rounded-full p-2 shadow-sm transition-all flex items-center justify-center w-8 h-8 cursor-pointer hover:scale-110 active:scale-95 ${
                      isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                    title={isLiked ? "Unlike" : "Add to Wishlist"}
                    aria-label="Add to Wishlist"
                  >
                    <Heart
                      size={16}
                      className={isLiked ? "fill-red-500 text-red-500 transition-colors" : "transition-colors"}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-full p-2 text-gray-400 hover:text-[#00a99d] shadow-sm transition-all flex items-center justify-center w-8 h-8 cursor-pointer hover:scale-110 active:scale-95"
                    title="Add to Cart"
                    aria-label="Add to Cart"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[13px] font-medium text-gray-800 leading-snug mb-1 line-clamp-2 min-h-[34px] group-hover:text-[#00a99d] transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="text-[11px] text-gray-400 mb-2 truncate">
                    {product.seller}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < product.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => toggleLike(product.id, e)}
                      className="flex items-center text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer bg-transparent border-0 p-0"
                      title={isLiked ? "Unlike" : "Like"}
                    >
                      <Heart
                        size={12}
                        className={`mr-1 transition-colors ${
                          isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                        }`}
                      />
                      <span className={isLiked ? "text-red-500 font-semibold" : ""}>
                        {displayLikes}
                      </span>
                    </button>
                  </div>
                  
                  <div className="flex items-center pt-1 border-t border-gray-100">
                    {product.currentPrice === "Free" ? (
                      <span className="text-sm font-bold text-[#00a99d]">{product.currentPrice}</span>
                    ) : product.currentPrice === "Request a Quote" ? (
                      <span className="text-sm font-bold text-gray-800">{product.currentPrice}</span>
                    ) : (
                      <>
                        <span className="text-sm font-bold text-[#00a99d] mr-2">{product.currentPrice}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="flex items-center text-sm font-medium text-gray-700 hover:text-[#00a99d] transition-colors cursor-pointer border border-gray-200 px-5 py-2 rounded-[3px] bg-white hover:bg-gray-50"
        >
          Load More
          <ChevronDown size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
