import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import AddToCartModal from "@/components/cart/AddToCartModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modesy - Marketplace - Classified Ads Script",
  description: "Modesy Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <CartProvider>
            {children}
            <AddToCartModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
