export interface BlogPost {
  id: number;
  slug: string;
  categorySlug: string;
  title: string;
  category: "Life Style" | "Fashion" | "Business";
  time: string;
  description: string;
  content: string[];
  tags: string[];
  image: string;
}

export const blogPostsData: BlogPost[] = [
  {
    id: 1,
    slug: "essential-travel-packing-tips-for-fashion-lovers",
    categorySlug: "life-style",
    title: "Essential travel packing tips for fashion lovers",
    category: "Life Style",
    time: "2 months ago",
    description: "Stay stylish and organized on your trips with these smart packing hacks.",
    content: [
      "Traveling often comes with the challenge of packing. Many people struggle to stay stylish while avoiding overpacking, but with a smart plan, you can achieve both. The secret lies in choosing versatile, mix-and-match items.",
      "Start with neutral basics such as jeans, t-shirts, and a blazer. These create multiple outfit options with minimal items. Add a few statement accessories like scarves, jewelry, or sunglasses to transform your look without taking up extra space.",
      "Rolling your clothes instead of folding saves space and prevents wrinkles. Packing organizers also help separate outfits and make items easier to find during your trip. Always include travel-sized skincare and perfumes to stay fresh on the go.",
      "By planning carefully, you'll be prepared for casual outings, business meetings, or evening events without carrying your entire wardrobe. Stylish travel is about efficiency, not quantity.",
    ],
    tags: ["travel tips", "packing guide", "fashion lovers", "lifestyle"],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    slug: "the-psychology-of-colors-in-fashion",
    categorySlug: "fashion",
    title: "The psychology of colors in fashion",
    category: "Fashion",
    time: "2 months ago",
    description: "Learn how the colors you wear influence mood, confidence, and perception.",
    content: [
      "Color is one of the most powerful tools in fashion communication. What we wear sends subtle cues about who we are and how we feel on any given day.",
      "Warm tones like red and yellow project energy, excitement, and confidence, while cool blues and greens inspire calmness, trust, and serenity.",
      "Neutral tones like black, grey, and beige give off an aura of elegance and professionalism that never goes out of style.",
    ],
    tags: ["fashion tips", "personal branding", "lifestyle", "everyday fashion"],
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    slug: "gift-ideas-for-every-budget-from-affordable-to-luxury",
    categorySlug: "life-style",
    title: "Gift ideas for every budget from affordable to luxury",
    category: "Life Style",
    time: "2 months ago",
    description: "Find the perfect gift without breaking the bank: our ideas suit every budget.",
    content: [
      "Finding the right gift can often feel overwhelming, especially when trying to balance thoughtfulness with budget constraints.",
      "From handmade personalized keepsakes and scented candles to luxury leather goods and designer accessories, there are endless ways to show appreciation.",
      "The true value of any gift lies in the care and attention you put into selecting something meaningful for your loved ones.",
    ],
    tags: ["gift ideas", "lifestyle", "ethical shopping", "comfort"],
    image: "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    slug: "a-beginners-guide-to-home-fragrances",
    categorySlug: "business",
    title: "A beginner's guide to home fragrances",
    category: "Business",
    time: "2 months ago",
    description: "Learn how scents can transform your home atmosphere and boost your mood.",
    content: [
      "Home fragrance is an invisible yet deeply impactful element of interior ambiance. Scent evokes memories and sets the emotional tone of any room.",
      "Reed diffusers provide continuous subtle aroma, while soy candles create a cozy glow perfect for evenings of relaxation.",
      "Discover the difference between floral, woody, citrus, and spicy notes to curate your signature living space scent.",
    ],
    tags: ["self care", "comfort", "lifestyle"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    slug: "must-have-accessories-to-elevate-your-everyday-look",
    categorySlug: "business",
    title: "Must-have accessories to elevate your everyday look",
    category: "Business",
    time: "2 months ago",
    description: "Small details make a big difference: discover the top accessories you need right now.",
    content: [
      "Accessories are the punctuation marks of an outfit. A simple t-shirt and jeans combo can be transformed instantly with the right accent pieces.",
      "From structured leather bags and minimalist jewelry to silk scarves and classic sunglasses, invest in timeless staples that last.",
    ],
    tags: ["fashion tips", "everyday fashion", "lifestyle"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    slug: "why-sustainable-fashion-matters-more-than-ever",
    categorySlug: "fashion",
    title: "Why sustainable fashion matters more than ever",
    category: "Fashion",
    time: "2 months ago",
    description: "Understand the importance of eco-friendly choices in fashion and how you can make a difference.",
    content: [
      "Sustainable fashion is no longer just a trend; it is a vital movement toward ethical consumption and environmental conservation.",
      "Choosing durable materials, shopping vintage, and supporting fair-trade brands all help minimize the carbon footprint of our wardrobes.",
    ],
    tags: ["eco friendly", "ethical shopping", "fashion tips"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    slug: "how-to-pick-the-right-shoes-for-comfort-and-style",
    categorySlug: "fashion",
    title: "How to pick the right shoes for comfort and style",
    category: "Fashion",
    time: "2 months ago",
    description: "Find out how to balance fashion and comfort when choosing your footwear.",
    content: [
      "Your footwear carries you through every moment of the day. Sacrificing comfort for style almost always leads to regret.",
      "Look for shoes with ergonomic insoles, breathable materials, and versatile silhouettes that seamlessly transition from office to weekend casual.",
    ],
    tags: ["footwear", "comfort", "everyday fashion"],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    slug: "how-to-choose-the-perfect-outfit-for-every-occasion",
    categorySlug: "life-style",
    title: "How to choose the perfect outfit for every occasion",
    category: "Life Style",
    time: "2 months ago",
    description: "Learn how to style yourself with the right outfit for casual, formal, and special events.",
    content: [
      "Dressing appropriately for the occasion is an art form. It shows respect for the setting while honoring your individual style.",
      "Whether navigating black-tie galas, business casual settings, or relaxed beach outings, mastering dress codes gives you effortless poise.",
    ],
    tags: ["everyday fashion", "lifestyle", "fashion tips"],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80",
  },
];
