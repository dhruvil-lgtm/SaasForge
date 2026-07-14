import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden mesh-gradient-1">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-5">
            what are you waiting for?
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            You could be shipping<br />
            <span className="text-white/30">right now.</span>
          </h2>
          <p className="text-base text-white/40 mb-10 max-w-md mx-auto">
            Stop reading. Pick a stack. Get a repo. Go build something.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/generate">
              <button className="bg-white text-black text-base rounded-full px-10 py-4 font-normal hover:bg-neutral-200 transition-all duration-300 inline-flex items-center gap-2 group">
                generate your boilerplate
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            <Link href="/pricing">
              <button className="border border-white/20 text-white/60 text-base rounded-full px-10 py-4 font-normal hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300">
                see pricing
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
