import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/50 lowercase mb-6">
            ready when you are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Ready to ship your saas?
          </h2>
          <p className="text-lg text-white/40 mb-10 lowercase max-w-md mx-auto">
            stop spending weeks on setup. generate your complete boilerplate in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/generate">
              <button className="bg-white text-black text-base rounded-full px-8 py-4 font-normal hover:bg-neutral-200 transition-all duration-300 inline-flex items-center gap-2 group shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)]">
                generate now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            <Link href="/docs">
              <button className="border border-white/20 text-white/70 text-base rounded-full px-8 py-4 font-normal hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300">
                read the docs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
