"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Flame } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-black">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-30" />
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors z-10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="block"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        back
      </Link>
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-0 bg-white/[0.02] rounded-3xl blur-3xl pointer-events-none" />
        <div className="relative rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur p-8">
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <Flame className="h-5 w-5 text-white/50" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-white/40 mt-1 lowercase">sign in to your account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-white/50 lowercase">email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border-white/[0.08] bg-white/[0.03] text-white placeholder:text-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-white/50 lowercase">password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-white/[0.08] bg-white/[0.03] text-white placeholder:text-white/20"
              />
            </div>
            <Button type="submit" className="w-full rounded-full bg-white text-black hover:bg-neutral-200" disabled={loading}>
              {loading ? "signing in..." : "sign in"}
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-white/30">
            don&apos;t have an account?{" "}
            <Link href="/signup" className="text-white/60 hover:text-white transition-colors">
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
