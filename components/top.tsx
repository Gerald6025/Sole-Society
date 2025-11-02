"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  price: number;
  imageurl: string;
  imageurl2?: string;
  description: string;
  brand?: string;
  createdAt?: string;
}


const shoes: Post[] = [
  {
    _id: "s1",
    title: "Vans Sk8-Hi Vanscii sneakers",
    price: 102.99,
    imageurl: "/va.png",
    imageurl2: "/va2.png",
    description: "Lightweight daily trainer",
    brand: "Vans",
    createdAt: "2025-10-30T10:00:00Z",
  },
  {
    _id: "s2",
    title: "Adidas x Bad Bunny Campus Light Olive  sneakers",
    price: 240.00,
    imageurl: "/ad.png",
    imageurl2: "/ad2.png",
    description: "Minimal leather sneaker",
    brand: "Adidas",
    createdAt: "2025-10-29T12:00:00Z",
  },
  {
    _id: "s3",
    title: "Jordan x Travis Scott Air Jordan 1 Low sneakers",
    price: 2091.50,
    imageurl: "/tra.png",
    imageurl2: "/tra2.png",
    description: "Grip and support off-road",
    brand: "Jordan",
    createdAt: "2025-10-28T09:00:00Z",
  },
  {
    _id: "s4",
    title: "Converse Chuck Taylor CX Explore Origin Story Grey/Uncharted Waters Blue sneakers",
    price: 110.0,
    imageurl: "/conv.png",
    imageurl2: "/conv2.png",
    description: "All-day comfort knit",
    brand: "Converse",
    createdAt: "2025-10-27T14:30:00Z",
  },
  {
    _id: "s5",
    title: "Balenciaga Triple S",
    price: 1037.00,
    imageurl: "/bale.png",
    imageurl2:"/bale2.png",
    description: "Vintage hoops style",
    brand: "Balenciaga",
    createdAt: "2025-10-26T08:15:00Z",
  },
  {
    _id: "s6",
    title: "Puma Rs",
    price: 59.99,
    imageurl: "/puma.png",
    imageurl2: "/puma2.png",
    description: "Race day speed",
    brand: "Puma",
    createdAt: "2025-10-25T18:45:00Z",
  },
  {
    _id: "s7",
    title: "Reebok Club C 42",
    price: 93.99,
    imageurl: "/ree.png",
    imageurl2: "/ree2.png",
    description: "Durable suede board feel",
    brand: "Reebok",
    createdAt: "2025-10-24T16:20:00Z",
  },
 
];

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

const currency = (n: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

export default function Top() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
    const sorted = shoes.slice().sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
    setPosts(sorted);
    setLoading(false);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstSlide = el.querySelector<HTMLElement>("[data-slide]");
    const gapPx = parseFloat(getComputedStyle(el).columnGap || "0");
    const slideWidth = (firstSlide?.offsetWidth ?? el.clientWidth / 3) + (Number.isNaN(gapPx) ? 0 : gapPx);
    el.scrollBy({ left: dir === "left" ? -slideWidth : slideWidth, behavior: "smooth" });
  };

  return (
    <section className="px-6 lg:px-8 mt-30">
      <div className="flex items-center justify-between mb-4">
      <p className="text-black relative bottom-0 font-black text-4xl">Top Picks</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => scroll("left")}
          className="bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
          title="Previous"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
          title="Next"
        >
          <ChevronRight />
        </button>
      </div>
    </div>

      <div className="mt-4">

        <div
          id="top-scroll"
          ref={scrollerRef}
          className="flex w-full gap-4 px-0 mb-5 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div data-slide key={i} className="animate-pulse flex-shrink-0 basis-1/3 min-w-[33.333%] snap-start">
                  <div className="aspect-[10/9] bg-gray-200 rounded-md" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                </div>
              ))
            : posts.map((p) => (
                <Link
                  key={p._id}
                  href={`/product/${p._id}`}
                  data-slide
                  className="basis-1/3 flex-shrink-0 min-w-[33.333%] snap-start"
                >
                  <div className="group/image relative aspect-[10/9] rounded-md overflow-hidden bg-gray-200 ">
                    <Image
                      src={p.imageurl}
                      alt={p.title}
                      fill
                      unoptimized
                      className="object-contain object-center origin-center transition-all duration-500 ease-in-out pointer-events-none scale-[1.05] group-hover/image:scale-[1.1] opacity-100 group-hover/image:opacity-0"
                    />
                    <Image
                      src={p.imageurl2 ?? p.imageurl}
                      alt={p.title}
                      fill
                      unoptimized
                      className="object-contain object-center origin-center transition-all duration-500 ease-in-out pointer-events-none scale-[1.05] group-hover/image:scale-[1.1] opacity-0 group-hover/image:opacity-100"
                    />
                  
                  </div>
                  <div className="mt-3">
                    <h3 className="text-sm font-medium line-clamp-2">{p.title}</h3>
                    <p className="text-xs text-gray-500">{p.brand || p.description}</p>
                    <span className="text-sm font-semibold">{currency(p.price)}</span>
                  </div>
                </Link>
              ))}
        </div>

      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
