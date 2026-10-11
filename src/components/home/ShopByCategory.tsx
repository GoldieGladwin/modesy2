import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
}

// TODO(Team): Ubah nilai "href" pada masing-masing kategori di bawah ini 
// agar sesuai dengan route / URL halaman aplikasi utama.
// Contoh: Jika halaman produk baju ada di "app/products/clothing/page.tsx", 
// maka ubah href di bawah menjadi "/products/clothing".
const categories: Category[] = [
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
    href: "/category/toys",
  },
  {
    id: "4",
    name: "Women's Clothing",
    image: "/categories/womens_clothing.jpg",
    href: "/category/womens-clothing",
  },
  {
    id: "5",
    name: "Men's Clothing",
    image: "/categories/mens_clothing.jpg",
    href: "/category/mens-clothing",
  },
  {
    id: "6",
    name: "Furniture",
    image: "/categories/furniture.jpg",
    href: "/category/furniture",
  },
  {
    id: "7",
    name: "Necklaces & Accessories",
    image: "/categories/necklaces.jpg",
    href: "/category/accessories",
  },
  {
    id: "8",
    name: "Graphics",
    image: "/categories/graphics.jpg",
    href: "/category/graphics",
  },
  {
    id: "9",
    name: "Painting",
    image: "/categories/painting.jpg",
    href: "/category/painting",
  },
  {
    id: "10",
    name: "Boots",
    image: "/categories/boots.jpg",
    href: "/category/boots",
  },
  {
    id: "11",
    name: "Decorative Pillows",
    image: "/categories/pillows.jpg",
    href: "/category/pillows",
  },
  {
    id: "12",
    name: "Handbags",
    image: "/categories/handbags.jpg",
    href: "/category/handbags",
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Shop By Category
        </h2>
        {/* TODO(Team): Sesuaikan href "/categories" ini dengan halaman "View All" yang sebenarnya di project */}
        <Link
          href="/categories"
          className="text-sm font-semibold text-gray-800 hover:text-[#00a99d] hover:underline transition-all pb-1 flex items-center gap-1 group"
        >
          View All 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="transform transition-transform group-hover:translate-x-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
        {categories.map((category) => (
          // TODO(Team): Component <Link> ini akan membaca "href" dari data array di atas.
          // Saat item diklik (misal: "Clothing"), Next.js akan langsung mengarahkan user ke halaman tersebut.
          <div key={category.id} className="flex flex-col items-center">
            {/* Image Container (Hover trigger for zoom and overlay) */}
            <Link 
              href={category.href}
              className="group relative w-full max-w-[160px] aspect-square mb-4 rounded-full overflow-hidden bg-[#fafafa] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.2]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
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
            
            {/* Category Name (Hover trigger only for text color) */}
            <Link 
              href={category.href}
              className="text-sm font-semibold text-gray-800 text-center px-2 hover:text-[#00a99d] hover:underline transition-all duration-200"
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
