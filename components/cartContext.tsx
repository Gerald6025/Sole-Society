"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

export type CartItem = {
  id: string;
  name: string;
  model: string;
  price: number;
  image: string;
  size?: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  subtotal: number;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (id: string, size?: number) => void;
  updateQty: (id: string, size: number | undefined, qty: number) => void;
  clear: () => void;
  clearWithoutPersist: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadForKey(key: string): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { data: session, status } = useSession();
  const email = session?.user?.email || null;
  const storageKey = email ? `cart:v1:${email}` : null;
  const [skipPersist, setSkipPersist] = useState(false);

  // Load cart for current user when session is ready/changes
  useEffect(() => {
    if (status === "loading") return;
    if (!storageKey) {
      // Logged out: ensure empty cart
      setItems([]);
      return;
    }
    setItems(loadForKey(storageKey));
  }, [storageKey, status]);

  // Persist cart to current user's storage key
  useEffect(() => {
    if (!storageKey) return;
    if (skipPersist) {
      setSkipPersist(false);
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, storageKey, skipPersist]);

  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const keyMatch = (i: CartItem) => i.id === item.id && i.size === item.size;
      const existing = prev.findIndex(keyMatch);
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = { ...copy[existing], qty: copy[existing].qty + (item.qty ?? 1) };
        return copy;
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  };

  const removeItem = (id: string, size?: number) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQty = (id: string, size: number | undefined, qty: number) => {
    setItems((prev) => prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i)));
  };

  const clear = () => setItems([]);
  const clearWithoutPersist = () => {
    setSkipPersist(true);
    setItems([]);
  };

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);

  const value: CartContextValue = { items, subtotal, addItem, removeItem, updateQty, clear, clearWithoutPersist };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
