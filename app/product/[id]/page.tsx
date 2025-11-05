"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SneakerProduct from "@/components/sneakerProduct";
import { useCart } from "@/components/cartContext";

// Temporary product source matching IDs used in components/top.tsx
// If you later fetch from an API, replace this with a real fetch.
const SHOES = [
  {
    _id: "s1",
    name: "NIKE",
    model: "Vans Sk8-Hi Vanscii sneakers",
    price: 102.99,
    image: "/va.png",
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    _id: "s2",
    name: "ADIDAS",
    model: "Adidas x Bad Bunny Campus Light Olive  sneakers",
    price: 240.0,
    image: "/ad.png",
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    _id: "s3",
    name: "JORDAN",
    model: "Jordan x Travis Scott Air Jordan 1 Low sneakers",
    price: 2091.5,
    image: "/tra.png",
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    _id: "s4",
    name: "CONVERSE",
    model: "Converse Chuck Taylor CX Explore Origin Story Grey/Uncharted Waters Blue sneakers",
    price: 110.0,
    image: "/conv.png",
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    _id: "s5",
    name: "BALENCIAGA",
    model: "Balenciaga Triple S",
    price: 1037.0,
    image: "/bale.png",
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    _id: "s6",
    name: "PUMA",
    model: "Puma Rs",
    price: 59.99,
    image: "/puma.png",
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    _id: "s7",
    name: "REEBOK",
    model: "Reebok Club C 42",
    price: 93.99,
    image: "/ree.png",
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
];

type ShoeView = {
  name: string;
  model: string;
  price: number;
  image: string;
  sizes: number[];
};

type ApiPost = {
  _id: string;
  title?: string;
  description?: string;
  imageurl?: string;
  price?: number;
  brand?: string;
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const router = useRouter();
  const { addItem } = useCart();

  const [product, setProduct] = useState<ShoeView | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | undefined>();

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post", { cache: "no-store" });
        if (res.ok) {
          const items: ApiPost[] = await res.json();
          const found = items.find((p) => p._id === id);
          if (found) {
            const mapped: ShoeView = {
              name: (found.brand || found.title || "").toString().split(" ")[0].toUpperCase(),
              model: found.title || found.description || "",
              price: Number(found.price) || 0,
              image: found.imageurl || "/placeholder.png",
              sizes: [38, 39, 40, 41, 42, 43, 44],
            };
            if (!cancelled) setProduct(mapped);
            return;
          }
        }
      } catch {}
      // Fallback to local list used by Top Picks
      const local = SHOES.find((s) => s._id === id);
      if (!cancelled) {
        setProduct(
          local
            ? { name: local.name, model: local.model, price: local.price, image: local.image, sizes: local.sizes }
            : null
        );
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading && !product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">Loading product…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold">Product not found</p>
          <p className="text-gray-500 mt-2">The item you are looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-12 py-10">
      <SneakerProduct
        name={product.name}
        model={product.model}
        price={product.price}
        image={product.image}
        sizes={product.sizes}
        selectedSize={selected}
        onSizeSelect={(s) => setSelected(s)}
        onBuy={() => {
          addItem({
            id,
            name: product.name,
            model: product.model,
            price: product.price,
            image: product.image,
            size: selected,
          });
          router.push("/cart");
        }}
      />
    </div>
  );
}
