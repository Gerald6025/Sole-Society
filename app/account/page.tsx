"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [meta, setMeta] = useState<{ createdAt?: string; updatedAt?: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setMeta({ createdAt: data.createdAt, updatedAt: data.updatedAt });
        }
      } catch {}
    })();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center"><p>Loading…</p></div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <p>You are not signed in.</p>
        <button className="border px-4 py-2 rounded" onClick={() => signIn(undefined, { callbackUrl: "/account" })}>Sign in</button>
      </div>
    );
  }

  const { name, email, image } = session.user;
  const firstName = (name || '').split(' ')[0] || '';
  const initial = firstName ? firstName[0]?.toUpperCase() : 'A';
  const fmt = (s?: string) => (s ? new Date(s).toLocaleDateString() : "-");
  const favorites = [
    "Nike Air Max",
    "Vans Old Skool",
    "Adidas Campus",
    "Jordan 1 Low",
  ];
  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 py-16 space-y-10">
      <h1 className="text-2xl font-semibold">My profile</h1>
      <div className="flex items-center gap-5">
        {image ? (
          <Image src={image} alt={name || "User"} width={80} height={80} className="rounded-full" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-semibold">{initial}</div>
        )}
        <div>
          <p className="text-xl font-semibold">{name || "Unnamed"}</p>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Member since</p>
          <p className="font-medium">{fmt(meta?.createdAt)}</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-500">Favorites</p>
        <div className="flex flex-wrap gap-2">
          {favorites.map((f) => (
            <span key={f} className="border rounded-full px-3 py-1 text-sm">{f}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="bg-black text-white px-4 py-2 rounded" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
      </div>
    </div>
  );
}
