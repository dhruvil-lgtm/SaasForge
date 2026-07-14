import { Shield, Zap, Database, CreditCard, GitBranch, Palette } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Auth that doesn't get in your way",
    description: "JWT auth with login, signup, password reset — all wired up. No boilerplate for your boilerplate.",
    highlight: true,
  },
  {
    icon: Database,
    title: "Supabase, pre-configured",
    description: "Schema migrations, RLS policies, seed data. Your database is ready the second the repo lands.",
    highlight: false,
  },
  {
    icon: Zap,
    title: "CI/CD that actually works",
    description: "GitHub Actions for tests, linting, deploy. Push once, ship everywhere.",
    highlight: false,
  },
  {
    icon: CreditCard,
    title: "Payments, not paperwork",
    description: "Stripe subscriptions with webhooks, pricing tiers, customer portal. Done.",
    highlight: false,
  },
  {
    icon: Palette,
    title: "UI you won't hate",
    description: "shadcn/ui, dark mode, a dashboard layout that doesn't look like a tutorial.",
    highlight: false,
  },
  {
    icon: GitBranch,
    title: "It's your repo, not ours",
    description: "We push the boilerplate to your GitHub. Own it, modify it, ship it.",
    highlight: false,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden mesh-gradient-1">
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">
            what you get
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Everything to ship,<br />
            <span className="text-white/40">nothing to set up.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative rounded-2xl border transition-all duration-500 ${
                feature.highlight
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/[0.06] bg-neutral-900/30 hover:bg-neutral-900/60 hover:border-white/[0.12]"
              }`}
            >
              <div className="p-7">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    feature.highlight ? "bg-white/15" : "bg-white/10 group-hover:bg-white/15"
                  } transition-all duration-300`}>
                    <feature.icon className={`h-5 w-5 ${
                      feature.highlight ? "text-white" : "text-white/60 group-hover:text-white/80"
                    } transition-colors`} />
                  </div>
                  <h3 className={`font-medium ${
                    feature.highlight ? "text-white" : "text-white/80 group-hover:text-white"
                  } transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed pl-14">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
