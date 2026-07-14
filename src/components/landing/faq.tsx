const faqs = [
  {
    q: "Which stacks do you support?",
    a: "Next.js + TypeScript, Node.js + Express, Python + FastAPI, Go + Templ, Ruby on Rails, Laravel. Pick whichever one makes sense for your project.",
  },
  {
    q: "How does the generation work?",
    a: "You pick your stack and options in a simple form. Our engine assembles a complete boilerplate behind the scenes and pushes it to a new GitHub repo under your account. No zip files, no manual downloads.",
  },
  {
    q: "Do I need a GitHub account?",
    a: "Yes — we use GitHub OAuth (or a personal access token if you prefer) to create the repository directly under your account.",
  },
  {
    q: "Can I modify the generated code?",
    a: "It's your repo from the moment it's created. Change anything, delete anything, deploy anywhere. No lock-in, no strings attached.",
  },
  {
    q: "Do templates get updated?",
    a: "The boilerplate is generated at the moment you create it. Pro users get notified when template updates are available and can merge them in.",
  },
  {
    q: "Can I deploy right after generation?",
    a: "Yes. Each boilerplate includes deployment configs for Vercel (Next.js), Railway (Express/FastAPI), and Dockerfiles for self-hosting. The CI/CD pipeline is already set up.",
  },
];

export function FAQ() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden mesh-gradient-6">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative container mx-auto px-4 max-w-2xl">
        <div className="mb-14 text-center">
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">
            still unsure?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Frequently asked
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-white/[0.06] bg-neutral-900/20 [&[open]]:bg-neutral-900/40 hover:border-white/[0.1] transition-all duration-300"
            >
              <summary className="flex items-center justify-between cursor-pointer text-sm text-white/70 px-6 py-5 rounded-2xl hover:text-white/90 transition-colors [&::-webkit-details-marker]:hidden">
                <span className="font-medium pr-4">{faq.q}</span>
                <span className="shrink-0 transition-transform duration-300 group-open:rotate-45 text-white/20 group-hover:text-white/40">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="block">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm text-white/40 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
