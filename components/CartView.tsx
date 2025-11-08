"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/components/cartContext";
import Link from "next/link";

const currency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

const CartView: React.FC = () => {
  const { items, subtotal, removeItem, updateQty, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-14 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Your cart</h1>
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your cart</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {items.map((it) => (
            <li key={`${it.id}-${it.size ?? "_"}`} className="flex gap-4 p-4 sm:p-6 items-center">
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <Image src={it.image} alt={it.model} width={120} height={120} className="object-contain w-full h-full" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 uppercase font-semibold">{it.name}</p>
                <h3 className="text-base font-medium">{it.model}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  {it.size ? <span>Size {it.size}</span> : <span>No size selected</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQty(it.id, it.size, Math.max(1, it.qty - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 min-w-[2ch] text-center">{it.qty}</span>
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQty(it.id, it.size, it.qty + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="w-24 text-right font-semibold">{currency(it.price * it.qty)}</div>
                <button
                  className="text-red-600 hover:underline ml-2"
                  onClick={() => removeItem(it.id, it.size)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t">
          <button className="text-gray-500 hover:underline" onClick={clear}>Clear cart</button>
          <div className="flex items-center gap-6">
            <div className="text-lg">
              <span className="text-gray-500 mr-2">Subtotal</span>
              <span className="font-bold">{currency(subtotal)}</span>
            </div>
            <Link href="/checkout" className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900">Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
