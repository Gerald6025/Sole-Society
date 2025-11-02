import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full -mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-3xl font-black tracking-tight">Sole Society</h3>
            <p className="text-base text-gray-300 leading-relaxed">
              Elevate your everyday with curated sneakers and streetwear. Premium drops, timeless classics.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold uppercase tracking-wider text-gray-300">Shop</h4>
            <ul className="mt-4 space-y-2 text-base text-gray-300">
              <li><Link href="/shop" className="hover:text-white transition">All Products</Link></li>
              <li><Link href="/men" className="hover:text-white transition">Men</Link></li>
              <li><Link href="/women" className="hover:text-white transition">Women</Link></li>
              <li><Link href="/new" className="hover:text-white transition">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold uppercase tracking-wider text-gray-300">Support</h4>
            <ul className="mt-4 space-y-2 text-base text-gray-300">
              <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold uppercase tracking-wider text-gray-300">Newsletter</h4>
            <p className="mt-4 text-base text-gray-300">Get the latest drops and exclusive offers.</p>
            <form className="mt-4 flex items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/10 text-white placeholder-gray-400 px-3 py-2 outline-none border border-white/10 focus:border-white/30"
              />
              <button
                type="button"
                className="bg-white text-black px-4 py-2 font-medium hover:bg-gray-200 transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 h-px bg-white/10" />

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Sole Society. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/cookies" className="hover:text-white transition">Cookies</Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/@solesocity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://x.com/@solesocity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
              className="text-gray-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2H21l-6.54 7.48L22 22h-6.9l-4.61-6.02L4.96 22H2l7.07-8.08L2 2h6.9l4.16 5.47L18.244 2Zm-2.42 18h1.86L8.3 4h-1.9l9.414 16Z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/@solesocity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.563 9.874v-6.985H7.898V12h2.54V9.797c0-2.507 1.492-3.891 3.777-3.891 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562V12h2.773l-.443 2.889h-2.33v6.985A10.001 10.001 0 0 0 22 12Z"/>
              </svg>
            </a>
            <a
              href="https://tiktok.com/@solesociety"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-gray-400 hover:text-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8.5a6.5 6.5 0 0 1-5-2.4V16a6 6 0 1 1-6-6c.34 0 .67.03 1 .08V13a3 3 0 1 0 3 3V2h3a6.5 6.5 0 0 0 4 5.5Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
