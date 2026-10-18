"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/supabase/categories";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
}

const CATEGORY_IMAGE_BY_SLUG: Record<string, string> = {
  clothing: "/categories/clothing.jpg",
  "women-s-clothing": "/categories/womens_clothing.jpg",
  "womens-clothing": "/categories/womens_clothing.jpg",
  "men-s-clothing": "/categories/mens_clothing.jpg",
  "mens-clothing": "/categories/mens_clothing.jpg",
  shoes: "/categories/boots.jpg",
  "women-s-shoes": "/categories/boots.jpg",
  "womens-shoes": "/categories/boots.jpg",
  "men-s-shoes": "/categories/boots.jpg",
  "home-living": "/categories/home_living.jpg",
  "home-decor": "/categories/home_living.jpg",
  furniture: "/categories/furniture.jpg",
  "jewelry-accessories": "/categories/necklaces.jpg",
  necklaces: "/categories/necklaces.jpg",
  "toys-entertainment": "/categories/toys.jpg",
  "graphics-photos": "/categories/graphics.jpg",
  graphics: "/categories/graphics.jpg",
  painting: "/categories/painting.jpg",
  boots: "/categories/boots.jpg",
  "women-boots": "/categories/boots.jpg",
  "men-boots": "/categories/boots.jpg",
  "decorative-pillows": "/categories/pillows.jpg",
  pillows: "/categories/pillows.jpg",
  handbags: "/categories/handbags.jpg",
  "bags-purses": "/categories/handbags.jpg",
};

const FALLBACK_CATEGORY_IMAGES = [
  "/categories/clothing.jpg",
  "/categories/home_living.jpg",
  "/categories/toys.jpg",
  "/categories/womens_clothing.jpg",
  "/categories/mens_clothing.jpg",
  "/categories/furniture.jpg",
  "/categories/necklaces.jpg",
  "/categories/graphics.jpg",
  "/categories/painting.jpg",
  "/categories/boots.jpg",
  "/categories/pillows.jpg",
  "/categories/handbags.jpg",
];

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Clothing",
    image: "/categories/clothing.jpg",
    href: "/category/clothing",
  },
  {
    id: "2",
    name: "Home & Living",
    image: "/categories/home_living.jpg",
    href: "/category/home-living",
  },
  {
    id: "3",
    name: "Toys & Entertainment",
    image: "/categories/toys.jpg",
    href: "/category/toys-entertainment",
  },
  {
    id: "4",
    name: "Women's Clothing",
    image: "/categories/womens_clothing.jpg",
    href: "/category/clothing?sub=Women's%20Clothing",
  },
  {
    id: "5",
    name: "Men's Clothing",
    image: "/categories/mens_clothing.jpg",
    href: "/category/clothing?sub=Men's%20Clothing",
  },
  {
    id: "6",
    name: "Furniture",
    image: "/categories/furniture.jpg",
    href: "/category/home-living?sub=Furniture",
  },
  {
    id: "7",
    name: "Necklaces & Accessories",
    image: "/categories/necklaces.jpg",
    href: "/category/jewelry-accessories?sub=Necklaces%20&%20Accessories",
  },
  {
    id: "8",
    name: "Graphics",
    image: "/categories/graphics.jpg",
    href: "/category/graphics-photos?sub=Graphics",
  },
  {
    id: "9",
    name: "Painting",
    image: "/categories/painting.jpg",
    href: "/category/home-living?sub=Painting",
  },
  {
    id: "10",
    name: "Boots",
    image: "/categories/boots.jpg",
    href: "/category/shoes?sub=Women's%20Shoes",
  },
  {
    id: "11",
    name: "Decorative Pillows",
    image: "/categories/pillows.jpg",
    href: "/category/home-living?sub=Home%20Decor",
  },
  {
    id: "12",
    name: "Handbags",
    image: "/categories/handbags.jpg",
    href: "/category/jewelry-accessories?sub=Bags%20&%20Purses",
  },
];

export default function ShopByCategory() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryItems() {
      if (isSupabaseConfigured()) {
        try {
          const { data } = await getCategories();
          if (data && data.length > 0) {
            // Pick categories shown on homepage or featured
            const filtered = data
              .filter((c) => c.show_on_homepage || c.is_featured)
              .slice(0, 12);

            if (filtered.length > 0) {
              const mapped: Category[] = filtered.map((c, idx) => {
                // Determine distinct photo for each category
                const distinctImage =
                  c.image_url && !c.image_url.includes("codingest.net")
                    ? c.image_url
                    : (CATEGORY_IMAGE_BY_SLUG[c.slug] || FALLBACK_CATEGORY_IMAGES[idx % FALLBACK_CATEGORY_IMAGES.length]);

                return {
                  id: c.id,
                  name: c.name,
                  image: distinctImage,
                  href: `/category/${c.slug}`,
                };
              });
              setCategoryList(mapped);
            } else {
              setCategoryList(DEFAULT_CATEGORIES);
            }
          } else {
            setCategoryList(DEFAULT_CATEGORIES);
          }
        } catch (e) {
          console.error("Error loading categories from database:", e);
          setCategoryList(DEFAULT_CATEGORIES);
        } finally {
          setLoading(false);
        }
      } else {
        setCategoryList(DEFAULT_CATEGORIES);
        setLoading(false);
      }
    }
    loadCategoryItems();
  }, []);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Shop By Category
        </h2>
        <Link
          href="/category/clothing"
          className="text-sm font-semibold text-gray-800 hover:text-[#00a99d] hover:underline transition-all pb-1 flex items-center gap-1 group"
        >
          View All 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="transform transition-transform group-hover:translate-x-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-pulse space-y-3">
              <div className="w-[140px] aspect-square rounded-full bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {categoryList.map((category, idx) => (
            <div key={category.id} className="flex flex-col items-center">
              {/* Image Container */}
              <Link 
                href={category.href}
                className="group relative w-full max-w-[160px] aspect-square mb-4 rounded-full overflow-hidden bg-[#fafafa] shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.2]"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = FALLBACK_CATEGORY_IMAGES[idx % FALLBACK_CATEGORY_IMAGES.length];
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                />
                
                {/* Overlay Container */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center pointer-events-none z-10">
                  <span className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1">
                    Shop Now
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                  </span>
                </div>
              </Link>
              
              {/* Category Name */}
              <Link 
                href={category.href}
                className="text-sm font-semibold text-gray-800 text-center px-2 hover:text-[#00a99d] hover:underline transition-all duration-200"
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
