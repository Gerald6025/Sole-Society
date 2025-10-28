"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

interface LogoItem {
  id: string;
  href: string;
  alt: string;
  src: string; // image URL
}

interface LogoRowAnimatedProps {
  triggerOnScroll?: boolean;
}

// 🖼️ Replace these Cloudinary URLs with your own
const logos: LogoItem[] = [
  {
    id: "intel",
    href: "https://intel.com",
    alt: "Intel",
    src: "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761563036/Adidas-logo_mc2zgp.png",
  },
  {
    id: "youtube",
    href: "https://youtube.com",
    alt: "YouTube",
    src: "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761563035/Vans-Logo_yqw0sm.jpg",
  },
  {
    id: "netlify",
    href: "https://netlify.com",
    alt: "Netlify",
    src: "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761563037/Nike_mo35w7.png",
  },
  {
    id: "amazon",
    href: "https://amazon.com",
    alt: "Amazon",
    src: "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761563035/Converse_rxmm5d.png",
  },
  {
    id: "ford",
    href: "https://ford.com",
    alt: "Ford",
    src: "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761563034/puma_jx1gyi.png",
  },
  {
    id: "samsung",
    href: "https://samsung.com",
    alt: "Samsung",
    src: "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761563038/reebok_ytkxvb.png",
  },
];

const LogoRowAnimated: React.FC<LogoRowAnimatedProps> = ({
  triggerOnScroll = false,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);

  const setItemRef = (el: HTMLAnchorElement | null, index: number) => {
    if (el) itemsRef.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = itemsRef.current;
      gsap.set(nodes, { opacity: 0 });

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power1.inOut" },
      });

      // Smooth fade-in/out with overlap so screen is never empty
      tl.to(nodes, {
        opacity: 1,
        duration: 1.2,
        stagger: { each: 3.5, from: "center", yoyo: true, repeat: -1 },
      }).to(
        nodes,
        {
          opacity: 0,
          duration: 3.2,
          stagger: { each: 3.5, from: "center", yoyo: true, repeat: -1 },
        },
        "+=1"
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [triggerOnScroll]);

  return (
    <div
      ref={wrapRef}
      style={{
        background: "#ffffff",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <ul
        style={{
          display: "flex",
          gap: 75,
          listStyle: "none",
          padding: 0,
          margin: 0,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {logos.map((l, i) => (
          <li key={l.id}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.alt}
              ref={(el) => setItemRef(el, i)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 160,
                height: 64,
                filter: "grayscale(100%) brightness(1.4)",
                textDecoration: "none",
                transition: "filter 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "grayscale(0%) brightness(1.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.filter =
                  "grayscale(100%) brightness(1.4)")
              }
            >
              <img
                src={l.src}
                alt={l.alt}
                style={{
                  width: "100%",
                  maxWidth: 140,
                  height: "auto",
                  objectFit: "contain",
                }}
                loading="lazy"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoRowAnimated;
