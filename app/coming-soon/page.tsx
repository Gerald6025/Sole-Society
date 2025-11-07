"use client";
import { useEffect } from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa6";

export default function ComingSoonPage() {
  useEffect(() => {
    document.body.classList.add("bg-comingsoon");
    return () => {
      document.body.classList.remove("bg-comingsoon");
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white space-y-6 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Coming Soon</h1>
        <p className="text-lg opacity-90">
          We are crafting something special for sneaker lovers. Check back soon for New Arrivals, Men, Women, Brand and more.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="bg-white text-black px-4 py-2 rounded">Go Home</Link>
        </div>
        <div className="flex items-center justify-center gap-5 pt-4">
          <a href="https://instagram.com/trigga_92" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:opacity-80">
            <FaInstagram size={22} />
          </a>
          <a href="https://facebook.com/G" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:opacity-80">
            <FaFacebookF size={22} />
          </a>
          <a href="https://tiktok.com/@youraccount" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white hover:opacity-80">
            <FaTiktok size={22} />
          </a>
        </div>
      </div>
    </div>
  );
}
