import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Indie Hacker",
    content: "I built and launched my MVP in one weekend. The Next.js boilerplate saved me at least two weeks of setup work.",
    initials: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Founder @ TaskFlow",
    content: "The Supabase integration alone was worth it. Everything just worked out of the box. Highly recommend.",
    initials: "MJ",
  },
  {
    name: "Priya Patel",
    role: "Full-Stack Developer",
    content: "I've tried a dozen boilerplates. SaaSForge is the only one that actually gave me a working codebase I could deploy immediately.",
    initials: "PP",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/50 lowercase mb-6">
            real feedback
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Trusted by founders
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto lowercase">
            join hundreds who shipped faster with saasforge.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="group relative rounded-2xl border border-white/[0.06] bg-neutral-900/30 p-7 hover:bg-neutral-900/50 transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.03)]"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <svg className="w-8 h-8 text-white/10 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  {t.content}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-white/10 text-white/70 text-xs">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white/80">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
