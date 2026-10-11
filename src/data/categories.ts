export interface SubCategory {
  title: string;
  items: string[];
}

export interface CategoryImage {
  label: string;
  image: string;
  url?: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  subcategories: SubCategory[];
  images: CategoryImage[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    "id": "1",
    "title": "Clothing",
    "subcategories": [
      {
        "title": "Women's Clothing",
        "items": [
          "Dresses",
          "Skirts",
          "Pants & Capris",
          "Sweaters"
        ]
      },
      {
        "title": "Men's Clothing",
        "items": [
          "Jackets & Coats",
          "Sweaters",
          "Pants & Jeans",
          "Shirts"
        ]
      },
      {
        "title": "Kid's Clothing",
        "items": [
          "Clothing Sets"
        ]
      }
    ],
    "images": [
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33130537d7-29441060.webp",
        "label": "Women's Clothing..",
        "image": "/uploads/category/category_64fa33130537d7-29441060.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33d46095d9-20259471.webp",
        "label": "Sweaters",
        "image": "/uploads/category/category_64fa33d46095d9-20259471.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa3334490a07-19765633.webp",
        "label": "Men's Clothing",
        "image": "/uploads/category/category_64fa3334490a07-19765633.webp"
      }
    ]
  },
  {
    "id": "2",
    "title": "Shoes",
    "subcategories": [
      {
        "title": "Women's Shoes",
        "items": [
          "Sneakers & Athletic Shoes",
          "Boots",
          "Sandals"
        ]
      },
      {
        "title": "Men's Shoes",
        "items": [
          "Sneakers",
          "Boots",
          "Sandals"
        ]
      },
      {
        "title": "Kid's Shoes",
        "items": [
          "Booties & Crib Shoes",
          "Slippers"
        ]
      }
    ],
    "images": [
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33e7271260-26824134.webp",
        "label": "Boots",
        "image": "/uploads/category/category_64fa33e7271260-26824134.webp"
      }
    ]
  },
  {
    "id": "3",
    "title": "Home & Living",
    "subcategories": [
      {
        "title": "Home Decor",
        "items": [
          "Decorative Pillows",
          "Clocks",
          "Vases"
        ]
      },
      {
        "title": "Furniture",
        "items": [
          "Living Room Furniture",
          "Dining Room Furniture"
        ]
      },
      {
        "title": "Office",
        "items": [
          "Office & School Supplies"
        ]
      },
      {
        "title": "Outdoor & Gardening",
        "items": [
          "Garden Decoration",
          "Plants"
        ]
      },
      {
        "title": "Painting",
        "items": [
          "Acrylic",
          "Watercolor",
          "Digital Prints"
        ]
      }
    ],
    "images": [
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33f6b755e4-34777699.webp",
        "label": "Decorative Pillows",
        "image": "/uploads/category/category_64fa33f6b755e4-34777699.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa3341655123-11031908.webp",
        "label": "Furniture",
        "image": "/uploads/category/category_64fa3341655123-11031908.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33c32d65d7-74266909.webp",
        "label": "Painting",
        "image": "/uploads/category/category_64fa33c32d65d7-74266909.webp"
      }
    ]
  },
  {
    "id": "4",
    "title": "Jewelry & Accessories",
    "subcategories": [
      {
        "title": "Bags & Purses",
        "items": [
          "Backpacks",
          "Handbags"
        ]
      },
      {
        "title": "Necklaces & Accessories",
        "items": [
          "Pendants",
          "Sun Hats",
          "Scarfs"
        ]
      },
      {
        "title": "Rings",
        "items": []
      }
    ],
    "images": [
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa340bbb1f36-33117053.webp",
        "label": "Handbags",
        "image": "/uploads/category/category_64fa340bbb1f36-33117053.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa335861cdd2-08512447.webp",
        "label": "Necklaces & Accessories..",
        "image": "/uploads/category/category_64fa335861cdd2-08512447.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa34190f84b9-63936724.webp",
        "label": "Sun Hats",
        "image": "/uploads/category/category_64fa34190f84b9-63936724.webp"
      }
    ]
  },
  {
    "id": "5",
    "title": "Toys & Entertainment",
    "subcategories": [
      {
        "title": "Musical Instruments",
        "items": [
          "Guitars",
          "Drums",
          "Stringed Instruments"
        ]
      },
      {
        "title": "Video Games",
        "items": []
      },
      {
        "title": "Toys",
        "items": [
          "Electronic Toys",
          "Dolls & Action Figures",
          "Puzzles"
        ]
      },
      {
        "title": "Headphones",
        "items": [
          "Over-Ear Headphones",
          "Earbud Headphones"
        ]
      },
      {
        "title": "Magazines",
        "items": [
          "Arts, Music & Photography",
          "Fashion & Style"
        ]
      },
      {
        "title": "Movies",
        "items": [
          "Movies & TV",
          "Blu-Ray"
        ]
      },
      {
        "title": "Books",
        "items": [
          "Art & Photography Books",
          "History Books",
          "Poetry Books",
          "Novels"
        ]
      }
    ],
    "images": [
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa3426b4c902-59920718.webp",
        "label": "Drums",
        "image": "/uploads/category/category_64fa3426b4c902-59920718.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa3366b14f13-49086139.webp",
        "label": "Magazines",
        "image": "/uploads/category/category_64fa3366b14f13-49086139.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33747dfa91-62988261.webp",
        "label": "Books",
        "image": "/uploads/category/category_64fa33747dfa91-62988261.webp"
      }
    ]
  },
  {
    "id": "6",
    "title": "Graphics & Photos",
    "subcategories": [
      {
        "title": "Graphics",
        "items": [
          "Icons",
          "Vectors",
          "Add-ons"
        ]
      },
      {
        "title": "Web Elements",
        "items": [
          "Badges Stickers",
          "Banners Ads"
        ]
      },
      {
        "title": "Logos",
        "items": [
          "Abstract",
          "Company",
          "Numbers",
          "Objects"
        ]
      },
      {
        "title": "Photos",
        "items": [
          "Animals",
          "Architecture & Business",
          "Food & Health",
          "Sports & People",
          "Technology & Travel"
        ]
      }
    ],
    "images": [
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33817aca32-54738529.webp",
        "label": "Graphics",
        "image": "/uploads/category/category_64fa33817aca32-54738529.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa3439ef0fc1-66361806.webp",
        "label": "Vectors",
        "image": "/uploads/category/category_64fa3439ef0fc1-66361806.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa344b5849c4-00906116.webp",
        "label": "Banners Ads",
        "image": "/uploads/category/category_64fa344b5849c4-00906116.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33901418c3-36607181.webp",
        "label": "Photos",
        "image": "/uploads/category/category_64fa33901418c3-36607181.webp"
      }
    ]
  },
  {
    "id": "7",
    "title": "Video & Audio",
    "subcategories": [
      {
        "title": "After Effects",
        "items": [
          "Video Overlays & Elements",
          "Product Promo",
          "Video Displays"
        ]
      },
      {
        "title": "Premiere Pro",
        "items": [
          "Broadcast Packages",
          "Product Promo",
          "Video Displays"
        ]
      },
      {
        "title": "Music",
        "items": [
          "Ambient",
          "Cinematic Music",
          "Classical Music",
          "Corporate"
        ]
      },
      {
        "title": "Sound Effects",
        "items": [
          "Cartoon Sounds",
          "Domestic Sounds",
          "Futuristic Sounds",
          "Nature Sounds",
          "Human Sounds"
        ]
      }
    ],
    "images": [
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa339eb2d540-06859467.webp",
        "label": "After Effects",
        "image": "/uploads/category/category_64fa339eb2d540-06859467.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33a9c749c6-52302788.webp",
        "label": "Premiere Pro",
        "image": "/uploads/category/category_64fa33a9c749c6-52302788.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa33b42fa870-57598092.webp",
        "label": "Music",
        "image": "/uploads/category/category_64fa33b42fa870-57598092.webp"
      },
      {
        "url": "https://modesy.codingest.net/uploads/category/category_64fa345b54bae8-15936205.webp",
        "label": "Futuristic Sounds",
        "image": "/uploads/category/category_64fa345b54bae8-15936205.webp"
      }
    ]
  },
  {
    "id": "8",
    "title": "Web Templates & Code",
    "subcategories": [
      {
        "title": "WordPress Templates",
        "items": [
          "Blog & Magazine",
          "Directory & Listing",
          "Real Estate"
        ]
      },
      {
        "title": "HTML Templates",
        "items": [
          "Corporate",
          "Creative",
          "Other"
        ]
      },
      {
        "title": "PHP Scripts",
        "items": [
          "eCommerce",
          "Miscellaneous",
          "Corporate",
          "Education"
        ]
      },
      {
        "title": "Plugins",
        "items": [
          "Widgets"
        ]
      },
      {
        "title": "JavaScript & CSS",
        "items": [
          "Calendars",
          "Charts And Graphs"
        ]
      }
    ],
    "images": []
  }
];
