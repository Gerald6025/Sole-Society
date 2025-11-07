"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [hasGoogle, setHasGoogle] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/providers");
        const data = await res.json();
        setHasGoogle(!!data?.google);
      } catch {}
    })();
  }, []);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", { email, password, callbackUrl });
    setLoading(false);
  };
  useEffect(() => {
    document.body.classList.add("bg-signin");
    return () => {
      document.body.classList.remove("bg-signin");
    };
  }, []);
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <div className="fixed inset-0 bg-black/50 pointer-events-none"></div>
      <div className="relative z-10 w-full max-w-md space-y-8 bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow">
        {hasGoogle && (
          <button onClick={() => signIn("google", { callbackUrl })} className="w-full border px-4 py-2 rounded">
            Continue with Google
          </button>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full border px-3 py-2 rounded" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border px-3 py-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button disabled={loading} className="w-full bg-black text-white px-4 py-2 rounded">{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <p className="text-sm text-center">No account? <Link className="underline" href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Sign up</Link></p>
      </div>
    </div>
  );
}
