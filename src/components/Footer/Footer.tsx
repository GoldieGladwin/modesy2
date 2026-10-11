"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Simple SVG Icon Component untuk sosial media (Menghindari dependency eksternal tambahan)
const SocialIcon = ({ path, label, href }: { path: string, label: string, href: string }) => (
  <a 
    href={href} 
    aria-label={label} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-all duration-300"
  >
    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d={path} />
    </svg>
  </a>
);

// Data array untuk sosial media beserta path SVG sederhana
const socialIcons = [
  { label: 'Facebook', href: '#', path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
  { label: 'X', href: '#', path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: 'Instagram', href: '#', path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { label: 'TikTok', href: '#', path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.12-1.02 4.13-2.67 5.57-1.65 1.44-3.84 2.15-6.04 1.96-2.17-.18-4.18-1.2-5.58-2.81-1.39-1.61-2.11-3.73-1.99-5.88.11-2.09 1.15-4.04 2.73-5.41 1.57-1.36 3.65-2.05 5.75-1.93.02 1.42.01 2.84.02 4.26-1.07-.08-2.16.14-3.07.69-.91.55-1.58 1.39-1.87 2.4-.29 1.01-.19 2.11.28 3.04.47.93 1.29 1.63 2.27 1.94.98.31 2.06.21 2.96-.28.9-.49 1.58-1.31 1.88-2.31.22-.72.26-1.49.23-2.25l-.01-15.82z" },
  { label: 'WhatsApp', href: '#', path: "M12.031 0C5.395 0 0 5.394 0 12.031c0 2.112.55 4.154 1.597 5.961L.226 23.518l5.659-1.485c1.761.956 3.732 1.463 5.761 1.463 6.634 0 12.03-5.396 12.03-12.031S18.665 0 12.03 0h.001zm0 21.523c-1.782 0-3.526-.479-5.056-1.385l-.362-.214-3.757.986.997-3.663-.235-.375c-1-1.59-1.528-3.428-1.528-5.342 0-5.545 4.512-10.056 10.055-10.056 5.542 0 10.055 4.511 10.055 10.056 0 5.544-4.513 10.055-10.055 10.055h-.001zm5.518-7.533c-.302-.152-1.792-.885-2.071-.986-.278-.101-.482-.152-.685.152-.202.303-.782.986-.957 1.189-.176.202-.352.228-.654.076-1.597-.781-2.73-1.455-3.83-3.329-.204-.349.201-.326.79-1.503.101-.202.051-.379-.025-.53-.075-.152-.685-1.653-.938-2.262-.246-.593-.497-.512-.684-.521-.176-.008-.379-.011-.582-.011-.202 0-.53.076-.808.379-.278.303-1.06 1.037-1.06 2.528 0 1.491 1.085 2.934 1.237 3.137.151.202 2.138 3.262 5.178 4.57.72.311 1.282.497 1.722.636.723.23 1.382.197 1.902.119.584-.087 1.792-.733 2.044-1.442.252-.708.252-1.315.176-1.442-.075-.126-.278-.202-.581-.354z" },
  { label: 'YouTube', href: '#', path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { label: 'Discord', href: '#', path: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" },
  { label: 'Telegram', href: '#', path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
  { label: 'Pinterest', href: '#', path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" },
  { label: 'LinkedIn', href: '#', path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: 'Twitch', href: '#', path: "M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.806-6.806V0H2.149zm19.164 13.612l-4.119 4.119h-5.731l-3.045 3.045v-3.045H4.298V2.149h17.015v11.463zm-4.836-7.164v5.731h-2.149V6.448h2.149zm-5.373 0v5.731h-2.149V6.448h2.149z" },
  { label: 'VK', href: '#', path: "M22.469 11.23c0-.077 0-.154-.019-.221-.318-1.503-2.079-3.805-4.46-4.526-1.542-.462-3.189-.559-4.814-.559H8.223c-.702 0-1.127.356-1.272.934-.203.809-.231 2.35-.116 3.65.174 1.944 1.253 3.64 2.946 4.707.964.607 2.119.982 3.257 1.079.164.019.337.019.511.019v1.955s-1.898.058-2.736-.318c-1.378-.626-2.284-2.129-2.583-3.612-.221-1.088-.221-2.436-.087-3.525.106-.857.347-1.666.703-2.436.434-.934 1.157-1.666 2.062-2.148 1.099-.588 2.352-.809 3.606-.867 1.455-.067 2.939.116 4.318.597 1.995.694 3.73 2.148 4.781 3.968 1.108 1.916 1.349 4.19.829 6.27-.376 1.493-1.147 2.822-2.188 3.863-1.079 1.079-2.399 1.83-3.893 2.226-1.397.366-2.871.424-4.307.241-1.59-.203-3.113-.819-4.433-1.744-.925-.655-1.725-1.465-2.352-2.399-.183-.27-.087-.414.221-.414h1.995c.299 0 .463.154.607.385.742 1.205 1.773 2.148 3.036 2.765 1.118.549 2.38.742 3.624.636 1.195-.106 2.322-.501 3.286-1.166.867-.607 1.542-1.426 1.966-2.39.462-1.05.655-2.216.511-3.372a9.664 9.664 0 00-.771-2.765c-.299-.684-.694-1.32-1.166-1.879-.096-.116-.096-.289 0-.405.087-.106.318-.212.511-.318.992-.53 1.87-1.32 2.506-2.245.434-.636.752-1.349.973-2.091z" },
  { label: 'RSS', href: '#', path: "M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9zM6 17c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" },
];

// Data array untuk link internal. Tim bisa mengubah nilai "href" sesuai dengan routing utama.
const categories = [
  { name: 'Clothing', href: '#' },
  { name: 'Shoes', href: '#' },
  { name: 'Home & Living', href: '#' },
  { name: 'Jewelry & Accessories', href: '#' },
  { name: 'Toys & Entertainment', href: '#' },
  { name: 'Graphics & Photos', href: '#' },
  { name: 'Video & Audio', href: '#' },
  { name: 'Web Templates & Code', href: '#' },
];

const quickLinks = [
  { name: 'Home', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Shops', href: '#' },
  { name: 'Help Center', href: '#' },
];

const information = [
  { name: 'Terms & Conditions', href: '#' },
  { name: 'About Us', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    // Karena instruksi meminta agar form ini tidak terkoneksi ke backend:
    setMessage('Integration not available yet.');
    setEmail('');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <footer className="bg-zinc-50 border-t border-gray-100 pt-16 pb-8 font-sans w-full mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Layout: 4 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Column 1: Brand & Description (Wider col-span-4) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <span className="text-[32px] font-bold text-gray-800 tracking-tight">
                M<span className="text-[#00a99d]">o</span>desy
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 pr-4">
              Modesy is a modern e-commerce marketplace where buyers and sellers connect with ease. Whether you are looking to shop for unique items or grow your business by selling online, Modesy is here to help you every step of the way.
            </p>
            
            {/* Social Icons Grid */}
            <div className="flex flex-wrap gap-2">
              {socialIcons.map((icon, idx) => (
                <SocialIcon key={idx} path={icon.path} label={icon.label} href={icon.href} />
              ))}
            </div>
          </div>

          {/* Column 2: Categories (col-span-3) */}
          <div className="lg:col-span-3 lg:pl-6">
            <h3 className="text-[13px] font-bold text-gray-900 tracking-wider uppercase mb-5">Categories</h3>
            <ul className="space-y-[14px]">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link href={cat.href} className="text-gray-500 hover:text-black hover:underline text-sm transition-all duration-300">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & Information (col-span-2) */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <h3 className="text-[13px] font-bold text-gray-900 tracking-wider uppercase mb-5">Quick Links</h3>
              <ul className="space-y-[14px]">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-gray-500 hover:text-black hover:underline text-sm transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 tracking-wider uppercase mb-5">Information</h3>
              <ul className="space-y-[14px]">
                {information.map((info, idx) => (
                  <li key={idx}>
                    <Link href={info.href} className="text-gray-500 hover:text-black hover:underline text-sm transition-all duration-300">
                      {info.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter & Payments (col-span-3) */}
          <div className="lg:col-span-3">
            <h3 className="text-[13px] font-bold text-gray-900 tracking-wider uppercase mb-5">Newsletter</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Join our subscribers list to get the latest news, updates and special offers directly in your inbox
            </p>
            
            <form onSubmit={handleSubscribe} className="mb-6 relative flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-[11px] bg-white border border-gray-200 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                aria-label="Email address"
              />
              <button 
                type="submit"
                className="w-full bg-[#00a99d] hover:bg-[#00958b] text-white font-medium py-[11px] rounded text-sm transition-colors duration-300"
              >
                Subscribe
              </button>
              {message && (
                <p className="text-xs text-teal-600 absolute -bottom-6 left-0">{message}</p>
              )}
            </form>

            {/* Fake Payment Methods using CSS (karena aset gambar tidak tersedia di proyek utama) */}
            <div className="flex items-center gap-3 mt-8">
              {/* Visa */}
              <span className="font-bold text-[#1434CB] text-xl italic tracking-tighter" aria-label="Visa">VISA</span>
              {/* Mastercard */}
              <span className="flex items-center -space-x-2" aria-label="Mastercard">
                <span className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90 mix-blend-multiply"></span>
                <span className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90 mix-blend-multiply"></span>
              </span>
              {/* Maestro */}
              <span className="flex items-center -space-x-2" aria-label="Maestro">
                <span className="w-5 h-5 rounded-full bg-[#0064CB] opacity-90 mix-blend-multiply"></span>
                <span className="w-5 h-5 rounded-full bg-[#CC0000] opacity-90 mix-blend-multiply"></span>
              </span>
              {/* Amex */}
              <span className="font-bold text-[#002663] bg-[#0074df]/10 px-1 border border-[#0074df]/30 rounded text-[10px] py-0.5 tracking-wider" aria-label="American Express">AMEX</span>
              {/* Discover */}
              <span className="font-bold text-[#FF6000] text-sm italic tracking-tight" aria-label="Discover">Discover</span>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal Links */}
        <div className="border-t border-gray-200 pt-6 pb-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[13px]">
            Copyright 2025 Modesy - All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-[13px]">
            <Link href="#" className="text-gray-500 hover:text-black hover:underline transition-all duration-300">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-black hover:underline transition-all duration-300">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
