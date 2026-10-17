export const CATEGORY_OPTIONS: string[] = [
  "All",
  "Clothing",
  "Shoes",
  "Home & Living",
  "Jewelry & Accessories",
  "Toys & Entertainment",
  "Graphics & Photos",
  "Video & Audio",
  "Web Templates & Code",
];

export const CATEGORY_MAP: Record<string, string[]> = {
  "Clothing": [
    "Women's Clothing",
    "Men's Clothing",
    "Kid's Clothing",
  ],
  "Shoes": [
    "Women's Shoes",
    "Men's Shoes",
    "Kid's Shoes",
  ],
  "Home & Living": [
    "Home Decor",
    "Furniture",
    "Office",
    "Outdoor & Gardening",
    "Painting",
  ],
  "Jewelry & Accessories": [
    "Bags & Purses",
    "Necklaces & Accessories",
    "Rings",
  ],
  "Toys & Entertainment": [
    "Musical Instruments",
    "Video Games",
    "Toys",
    "Headphones",
    "Magazines",
    "Movies",
    "Books",
  ],
  "Graphics & Photos": [
    "Graphics",
    "Web Elements",
    "Logos",
    "Photos",
  ],
  "Video & Audio": [
    "After Effects",
    "Premiere Pro",
    "Music",
    "Sound Effects",
  ],
  "Web Templates & Code": [
    "WordPress Templates",
    "HTML Templates",
    "PHP Scripts",
    "Plugins",
    "JavaScript & CSS",
  ],
};

// Full category hierarchy mapping subcategory -> list of child item categories
export const CATEGORY_TREE: Record<string, Record<string, string[]>> = {
  "Clothing": {
    "Women's Clothing": ["Dresses", "Skirts", "Pants & Capris", "Sweaters", "Scarves", "Women's Clothing"],
    "Men's Clothing": ["Jackets & Coats", "Sweaters", "Pants & Jeans", "Shirts", "Men's Clothing"],
    "Kid's Clothing": ["Clothing Sets", "Kid's Clothing"],
  },
  "Shoes": {
    "Women's Shoes": ["Sneakers & Athletic Shoes", "Boots", "Sandals", "Shoes"],
    "Men's Shoes": ["Sneakers", "Boots", "Sandals", "Shoes"],
    "Kid's Shoes": ["Booties & Crib Shoes", "Slippers", "Kid's Shoes"],
  },
  "Home & Living": {
    "Home Decor": ["Decorative Pillows", "Clocks", "Vases", "Home Decor"],
    "Furniture": ["Living Room Furniture", "Dining Room Furniture", "Furniture"],
    "Office": ["Office & School Supplies", "Office"],
    "Outdoor & Gardening": ["Garden Decoration", "Plants", "Outdoor & Gardening"],
    "Painting": ["Acrylic", "Watercolor", "Digital Prints", "Painting"],
  },
  "Jewelry & Accessories": {
    "Bags & Purses": ["Backpacks", "Handbags", "Bags & Purses", "Bags"],
    "Necklaces & Accessories": ["Pendants", "Sun Hats", "Scarfs", "Necklaces & Accessories", "Accessories"],
    "Rings": ["Rings"],
  },
  "Toys & Entertainment": {
    "Musical Instruments": ["Guitars", "Drums", "Stringed Instruments"],
    "Video Games": ["Video Games"],
    "Toys": ["Electronic Toys", "Dolls & Action Figures", "Puzzles", "Toys"],
    "Headphones": ["Over-Ear Headphones", "Earbud Headphones", "Headphones"],
    "Magazines": ["Arts, Music & Photography", "Fashion & Style", "Magazines"],
    "Movies": ["Movies & TV", "Blu-Ray", "Movies"],
    "Books": ["Art & Photography Books", "History Books", "Poetry Books", "Novels", "Books"],
  },
  "Graphics & Photos": {
    "Graphics": ["Icons", "Vectors", "Add-ons", "Graphics", "Digital Art"],
    "Web Elements": ["Badges Stickers", "Banners Ads", "Web Elements"],
    "Logos": ["Abstract", "Company", "Numbers", "Objects", "Logos"],
    "Photos": ["Animals", "Architecture & Business", "Food & Health", "Sports & People", "Technology & Travel", "Photos"],
  },
  "Video & Audio": {
    "After Effects": ["Video Overlays & Elements", "Product Promo", "Video Displays", "After Effects"],
    "Premiere Pro": ["Broadcast Packages", "Product Promo", "Video Displays", "Premiere Pro"],
    "Music": ["Ambient", "Cinematic Music", "Classical Music", "Corporate", "Music", "Audio"],
    "Sound Effects": ["Cartoon Sounds", "Domestic Sounds", "Futuristic Sounds", "Nature Sounds", "Human Sounds", "Sound Effects"],
  },
  "Web Templates & Code": {
    "WordPress Templates": ["Blog & Magazine", "Directory & Listing", "Real Estate", "WordPress Templates"],
    "HTML Templates": ["Corporate", "Creative", "Other", "HTML Templates"],
    "PHP Scripts": ["eCommerce", "Miscellaneous", "Corporate", "Education", "PHP Scripts"],
    "Plugins": ["Widgets", "Plugins"],
    "JavaScript & CSS": ["Calendars", "Charts And Graphs", "JavaScript & CSS"],
  },
};

export function getSubcategoriesForCategory(category: string): string[] {
  if (!category || category === "All") {
    return ["All"];
  }
  const subs = CATEGORY_MAP[category] || [];
  return ["All", ...subs];
}

interface ProductItemLike {
  category: string;
  subcategory?: string;
  parentCategory?: string;
  title?: string;
}

export function isProductInCategory(product: ProductItemLike, category: string): boolean {
  if (!category || category === "All") return true;

  // Direct parent category match
  if (product.parentCategory && product.parentCategory.toLowerCase() === category.toLowerCase()) {
    return true;
  }

  // Direct category title match
  if (product.category && product.category.toLowerCase() === category.toLowerCase()) {
    return true;
  }

  // Hierarchy check
  const subTree = CATEGORY_TREE[category];
  if (!subTree) return false;

  const prodCat = (product.category || "").toLowerCase();
  const prodSub = (product.subcategory || "").toLowerCase();

  for (const [subTitle, items] of Object.entries(subTree)) {
    if (prodSub && (subTitle.toLowerCase() === prodSub || prodSub.includes(subTitle.toLowerCase()))) {
      return true;
    }
    if (
      items.some(
        (item) =>
          item.toLowerCase() === prodCat ||
          prodCat.includes(item.toLowerCase()) ||
          item.toLowerCase().includes(prodCat)
      )
    ) {
      return true;
    }
  }

  return false;
}

export function isProductInSubcategory(product: ProductItemLike, subcategory: string): boolean {
  if (!subcategory || subcategory === "All") return true;

  const targetSub = subcategory.toLowerCase();
  const prodSub = (product.subcategory || "").toLowerCase();
  const prodCat = (product.category || "").toLowerCase();

  if (prodSub && (prodSub === targetSub || prodSub.includes(targetSub) || targetSub.includes(prodSub))) {
    return true;
  }

  // Check which items are under this subcategory across CATEGORY_TREE
  for (const subTree of Object.values(CATEGORY_TREE)) {
    for (const [subTitle, items] of Object.entries(subTree)) {
      if (subTitle.toLowerCase() === targetSub) {
        if (
          items.some(
            (item) =>
              item.toLowerCase() === prodCat ||
              prodCat.includes(item.toLowerCase()) ||
              item.toLowerCase().includes(prodCat)
          )
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

export function matchesProductCategory(
  product: ProductItemLike,
  categoryFilter: string,
  subcategoryFilter: string
): boolean {
  if (categoryFilter !== "All") {
    if (!isProductInCategory(product, categoryFilter)) {
      return false;
    }
  }

  if (subcategoryFilter !== "All") {
    if (!isProductInSubcategory(product, subcategoryFilter)) {
      return false;
    }
  }

  return true;
}
