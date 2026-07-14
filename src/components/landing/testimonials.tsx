const testimonials = [
  {
    name: "Sarah Chen",
    role: "Built Collate — a link-in-bio analytics tool",
    content: "I was stuck for two weeks trying to get auth + stripe working together. Saasforge generated the whole thing in one go. I just deleted the parts I didn't need and deployed.",
  },
  {
    name: "Marcus Johnson",
    role: "Founder @ TaskFlow",
    content: "The supabase setup alone saved me a weekend of reading docs. Migrations, rls, seed data — it was all there. I've recommended this to three other founders this month.",
  },
  {
    name: "Priya Patel",
    role: "Freelance full-stack developer",
    content: "I used saasforge as the starting point for my last four client projects. Each one needed a different stack — next.js, fastapi, rails. It handled all of them. No boilerplate boilerplate.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden mesh-gradient-3">
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">
            real people, real projects
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Used by people who<br />
            <span className="text-white/40">actually ship things.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-white/[0.06] bg-neutral-900/40 p-7 hover:bg-neutral-900/60 transition-all duration-500 hover:border-white/[0.1]"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="flex -space-x-1">
                  {[...Array(3)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                {t.content}
              </p>
              <div>
                <p className="text-sm font-medium text-white/80">{t.name}</p>
                <p className="text-xs text-white/40 mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
