const faqs = [
  {
    q: "What stacks do you support?",
    a: "We support Next.js + TypeScript, Node.js + Express, Python + FastAPI, Go + Templ, Ruby on Rails, and Laravel. More coming soon.",
  },
  {
    q: "How does the generation work?",
    a: "You pick your stack and features in a simple form. Our engine assembles a complete boilerplate and pushes it to a new GitHub repository under your account.",
  },
  {
    q: "Do I need a GitHub account?",
    a: "Yes. You'll authenticate with GitHub OAuth so we can create the repository directly under your account.",
  },
  {
    q: "Can I customize the generated code?",
    a: "Absolutely. The generated code is yours. Modify it, extend it, and deploy it however you want.",
  },
  {
    q: "Do I get updates after generation?",
    a: "The boilerplate is generated at the moment you create it. You keep the repo and can update dependencies yourself. Pro users get access to template updates.",
  },
  {
    q: "Can I deploy immediately?",
    a: "Yes. The generated boilerplate includes deployment configs for Vercel (Next.js), Railway (Express/FastAPI), and Dockerfiles for self-hosting.",
  },
];

export function FAQ() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-50" />
      <div className="relative container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/50 lowercase mb-6">
            got questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Frequently asked
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-white/[0.06] bg-neutral-900/20 [&[open]]:pb-6 hover:border-white/[0.1] transition-all duration-300"
            >
              <summary className="flex items-center justify-between cursor-pointer text-sm text-white/65 px-6 py-5 rounded-2xl hover:text-white/85 transition-colors [&::-webkit-details-marker]:hidden">
                <span className="font-medium pr-4">{faq.q}</span>
                <span className="shrink-0 transition-transform duration-300 group-open:rotate-45 text-white/25">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <p className="mt-1 px-6 text-sm text-white/40 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
