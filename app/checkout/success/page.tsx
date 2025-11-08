"use client";
import React from "react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 lg:px-12 py-20 text-center min-h-[120vh]">
      <h1 className="text-3xl font-bold mb-3">Payment successful</h1>
      <p className="text-gray-600 mb-8">Thank you for your order. A confirmation email will be sent shortly.</p>
      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900">Continue shopping</Link>
        <Link href="/cart" className="border border-gray-300 px-6 py-3 rounded-xl">View cart</Link>
      </div>
    </div>
  );
}
