import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on SaaS development, boilerplate generation, and shipping fast.",
};

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <a href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          back to home
        </a>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog</h1>
        <p className="text-white/50 leading-relaxed">Coming soon.</p>
      </div>
    </div>
  );
}
