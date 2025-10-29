"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

type Post = {
  _id: string;
  title: string;
  description: string;
  imageurl: string;
  price: number;
  brand?: string;
  createdAt?: string;
};

const currency = (n: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

const JustDropped: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/post", { cache: "no-store" });
        const data: Post[] = await res.json();
        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        setPosts(sorted.slice(0, 10));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const scroll = (dir: "left" | "right") => {
    const container = document.getElementById("just-dropped-scroll");
    if (!container) return;
    const amount = 350;
    container.scrollTo({
      left: dir === "left" ? container.scrollLeft - amount : container.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full mt-28 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-center pr-10">
        {/* LEFT IMAGE */}
        <div className="relative w-full ml-9 h-[380px] lg:h-[650px]">
          <Image
            src="/pal.jpg" // Replace with your image
            alt="Model sitting with sneakers"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="px-6 lg:px-8">
          <h2 className="text-4xl md:text-7xl font-bold mb-29">Just dropped kicks</h2>
          <p className="text-black mb-6 text-base">Keep your rotation fresh.</p>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-md font-medium hover:bg-gray-900 transition"
          >
            Shop now →
          </Link>

          {/* PRODUCT SCROLLER */}
          <div className="relative mt-8">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>

            <div
              id="just-dropped-scroll"
              className="flex overflow-x-auto gap-6 scroll-smooth no-scrollbar px-10"
            >
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-[200px] animate-pulse flex-shrink-0">
                      <div className="aspect-square bg-gray-200 rounded-md" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mt-3" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                    </div>
                  ))
                : posts.map((p) => (
                    <Link
                      key={p._id}
                      href={`/product/${p._id}`}
                      className="min-w-[200px] max-w-[200px] flex-shrink-0 group"
                    >
                      <div className="relative aspect-[1/1] rounded-md overflow-hidden bg-gray-200">
                        <Image
                          src={p.imageurl}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                          NEW
                        </span>
                      </div>
                      <div className="mt-3">
                        <h3 className="text-sm font-medium line-clamp-2">{p.title}</h3>
                        <p className="text-xs text-gray-500">{p.brand || p.description}</p>
                        <span className="text-sm font-semibold">{currency(p.price)}</span>
                      </div>
                    </Link>
                  ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JustDropped;
