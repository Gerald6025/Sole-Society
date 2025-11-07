"use client";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

type Product = {
  id: string;
  name: string;
  model: string;
  brand: string;
  price: number;
  image: string;
  sizes: number[];
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const isAdmin = useMemo(() => (session?.user as { role?: string } | undefined)?.role === "admin", [session]);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Partial<Product>>({ name: "", model: "", brand: "", price: 0, image: "", sizes: [7,8,9,10] });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!isAdmin) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setItems(data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, [isAdmin, status]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(p => `${p.name} ${p.model} ${p.brand}`.toLowerCase().includes(q));
  }, [items, search]);

  const resetForm = () => {
    setForm({ name: "", model: "", brand: "", price: 0, image: "", sizes: [7,8,9,10] });
    setEditingId(null);
  };

  const onEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ ...p });
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems(prev => prev.filter(p => p.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: Partial<Product> = {
        name: form.name,
        model: form.model,
        brand: form.brand,
        price: Number(form.price),
        image: form.image || "/Nike.jpeg",
        sizes: Array.isArray(form.sizes) ? form.sizes : [7,8,9,10],
      };
      let res: Response;
      if (editingId) {
        res = await fetch(`/api/products/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        res = await fetch(`/api/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setItems(prev => {
        const idx = prev.findIndex(p => p.id === saved.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = saved;
          return copy;
        }
        return [saved, ...prev];
      });
      resetForm();
    } catch {
      setError("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading…</p></div>;
  }
  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center"><p>Unauthorized</p></div>;
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-16 pb-40 space-y-12">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products…" className="border px-4 py-3 rounded w-80" />
      </div>

      <form onSubmit={onSubmit} className="border rounded p-6 grid grid-cols-1 md:grid-cols-6 gap-4">
        <input className="border px-4 py-3 rounded md:col-span-2" placeholder="Brand" value={form.brand || ''} onChange={e=>setForm(f=>({...f, brand: e.target.value}))} />
        <input className="border px-4 py-3 rounded md:col-span-2" placeholder="Name" value={form.name || ''} onChange={e=>setForm(f=>({...f, name: e.target.value}))} />
        <input className="border px-4 py-3 rounded md:col-span-2" placeholder="Model" value={form.model || ''} onChange={e=>setForm(f=>({...f, model: e.target.value}))} />
        <input className="border px-4 py-3 rounded md:col-span-2" placeholder="Image URL (/va.png)" value={form.image || ''} onChange={e=>setForm(f=>({...f, image: e.target.value}))} />
        <input className="border px-4 py-3 rounded md:col-span-2" type="number" step="0.01" placeholder="Price" value={form.price ?? 0} onChange={e=>setForm(f=>({...f, price: Number(e.target.value)}))} />
        <input className="border px-4 py-3 rounded md:col-span-2" placeholder="Sizes (e.g. 7,8,9)" value={(form.sizes || []).join(',')} onChange={e=>setForm(f=>({...f, sizes: e.target.value.split(',').map(s=>Number(s.trim())).filter(n=>!Number.isNaN(n))}))} />
        <div className="md:col-span-6 flex items-center gap-4">
          <button disabled={saving} className="bg-black text-white px-5 py-3 rounded">{editingId ? (saving ? 'Saving…' : 'Save changes') : (saving ? 'Creating…' : 'Create product')}</button>
          {editingId && <button type="button" className="border px-5 py-3 rounded" onClick={resetForm}>Cancel</button>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>

      <div className="overflow-x-auto mb-24">
        <table className="min-w-full border text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 border">Brand</th>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Model</th>
              <th className="p-4 border">Price</th>
              <th className="p-4 border">Sizes</th>
              <th className="p-4 border">Image</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-6 border text-center" colSpan={7}>Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td className="p-6 border text-center" colSpan={7}>No products</td></tr>
            ) : (
              filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border p-4">{p.brand}</td>
                  <td className="border p-4">{p.name}</td>
                  <td className="border p-4">{p.model}</td>
                  <td className="border p-4">${p.price.toFixed(2)}</td>
                  <td className="border p-4">{p.sizes?.join(', ')}</td>
                  <td className="border p-4"><span className="break-all text-xs">{p.image}</span></td>
                  <td className="border p-4">
                    <div className="flex gap-3">
                      <button className="border px-3 py-2 rounded" onClick={() => onEdit(p)}>Edit</button>
                      <button className="border px-3 py-2 rounded" onClick={() => onDelete(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
