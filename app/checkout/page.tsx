"use client";
import React, { useMemo, useState } from "react";
import { useCart } from "@/components/cartContext";
import { useRouter } from "next/navigation";

type Method = "card" | "paypal" | "ecocash";

const currency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<Method>("card");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [paypalEmail, setPaypalEmail] = useState("");

  const [ecoPhone, setEcoPhone] = useState("");
  const [ecoCode, setEcoCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(() => subtotal, [subtotal]);

  function luhnValid(num: string) {
    const s = num.replace(/\s|-/g, "");
    if (!/^\d{12,19}$/.test(s)) return false;
    let sum = 0, dbl = false;
    for (let i = s.length - 1; i >= 0; i--) {
      let d = parseInt(s[i]);
      if (dbl) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      dbl = !dbl;
    }
    return sum % 10 === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!name || !email || !address) {
      setError("Please fill in name, email and address.");
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 900));

      if (method === "card") {
        const clean = cardNumber.replace(/\s|-/g, "");
        const isTestCard = [
          "4242424242424242",
          "4000000000000002",
          "4111111111111111",
        ].includes(clean);
        if (!isTestCard && !luhnValid(clean)) {
          throw new Error("Invalid card number (use a test card like 4242 4242 4242 4242).");
        }
        if (!/^\d{3,4}$/.test(cardCvv)) throw new Error("Invalid CVV");
        if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(cardExp)) throw new Error("Invalid expiry (MM/YY)");
      } else if (method === "paypal") {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(paypalEmail)) {
          throw new Error("Enter a valid PayPal email (sandbox accepted).");
        }
      } else if (method === "ecocash") {
        if (!/^\d{9,15}$/.test(ecoPhone.replace(/\D/g, ""))) throw new Error("Enter a valid EcoCash phone number.");
        if (ecoCode && !/^\d{4,6}$/.test(ecoCode)) throw new Error("Invalid EcoCash code.");
      }

      clear();
      router.push("/checkout/success");
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-10 min-h-[120vh]">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 space-y-6 min-h-[60vh]">
            {error && (
              <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <div>
              <h2 className="text-xl font-semibold mb-4">Contact & Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded-lg px-4 py-3" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
                <input className="border rounded-lg px-4 py-3" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
                <input className="md:col-span-2 border rounded-lg px-4 py-3" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Payment method</h2>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="method" checked={method==="card"} onChange={()=>setMethod("card")} /> Card
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="method" checked={method==="paypal"} onChange={()=>setMethod("paypal")} /> PayPal
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="method" checked={method==="ecocash"} onChange={()=>setMethod("ecocash")} /> EcoCash
                </label>
              </div>

              {method === "card" && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="md:col-span-2 border rounded-lg px-4 py-3" placeholder="Card number (e.g. 4242 4242 4242 4242)" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} />
                  <input className="border rounded-lg px-4 py-3" placeholder="MM/YY" value={cardExp} onChange={e=>setCardExp(e.target.value)} />
                  <input className="border rounded-lg px-4 py-3" placeholder="CVV" value={cardCvv} onChange={e=>setCardCvv(e.target.value)} />
                </div>
              )}

              {method === "paypal" && (
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <input className="border rounded-lg px-4 py-3" placeholder="PayPal email (sandbox)" type="email" value={paypalEmail} onChange={e=>setPaypalEmail(e.target.value)} />
                  <p className="text-sm text-gray-500">We will simulate a PayPal sandbox approval.</p>
                </div>
              )}

              {method === "ecocash" && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="border rounded-lg px-4 py-3" placeholder="EcoCash phone (e.g. 077xxxxxxx)" value={ecoPhone} onChange={e=>setEcoPhone(e.target.value)} />
                  <input className="border rounded-lg px-4 py-3" placeholder="Approval code (optional for mock)" value={ecoCode} onChange={e=>setEcoCode(e.target.value)} />
                  <p className="md:col-span-2 text-sm text-gray-500">This is a mock flow. No real charge will occur.</p>
                </div>
              )}
            </div>

            <button disabled={loading} className={`w-full md:w-auto bg-black text-white px-6 py-3 rounded-xl ${loading ? 'opacity-70' : 'hover:bg-gray-900'}`}>
              {loading ? 'Processing…' : `Pay ${currency(total)}`}
            </button>
          </form>

          <aside className="bg-white rounded-2xl shadow-sm p-6 h-max">
            <h2 className="text-xl font-semibold mb-4">Order summary</h2>
            <ul className="divide-y divide-gray-200 mb-4">
              {items.map((i) => (
                <li key={`${i.id}-${i.size ?? '_'}`} className="py-3 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{i.model}</div>
                    <div className="text-gray-500">{i.size ? `Size ${i.size}` : 'No size'} × {i.qty}</div>
                  </div>
                  <div className="font-semibold">{currency(i.price * i.qty)}</div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">{currency(subtotal)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
