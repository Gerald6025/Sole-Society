"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to sign up");
        setLoading(false);
        return;
      }
      // After successful signup, send user to Sign in to log in with their new credentials
      router.push(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    } catch (e) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.add("bg-signup");
    return () => {
      document.body.classList.remove("bg-signup");
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <div className="fixed inset-0 bg-black/50 pointer-events-none"></div>
      <div className="relative z-10 w-full max-w-md space-y-8 bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow">
        <h1 className="text-2xl font-semibold text-center">Create your account</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full border px-3 py-2 rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border px-3 py-2 rounded" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border px-3 py-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full bg-black text-white px-4 py-2 rounded">{loading ? "Creating..." : "Create account"}</button>
        </form>
        <p className="text-sm text-center">Already have an account? <Link className="underline" href={`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Sign in</Link></p>
      </div>
    </div>
  );
}
