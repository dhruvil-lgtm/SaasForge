import { Shield, Zap, Database, CreditCard, GitBranch, Palette } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Auth Built-in",
    description: "JWT-based authentication with login, signup, password reset, and protected routes out of the box.",
  },
  {
    icon: Database,
    title: "Supabase Database",
    description: "Pre-configured Supabase client with schema migrations, RLS policies, and seed data ready to go.",
  },
  {
    icon: Zap,
    title: "CI/CD Ready",
    description: "GitHub Actions workflows for testing, linting, and deployment to Vercel or your preferred host.",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
    description: "Stripe subscription setup with webhook handling, pricing tiers, and customer portal (coming soon).",
  },
  {
    icon: Palette,
    title: "Beautiful UI",
    description: "shadcn/ui components with Tailwind CSS, dark mode, and a pre-built dashboard layout.",
  },
  {
    icon: GitBranch,
    title: "Your GitHub Repo",
    description: "The generated boilerplate is pushed directly to a new GitHub repository under your account.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/50 lowercase mb-6">
            everything included
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Ship-ready from day one
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto lowercase">
            every boilerplate comes with production essentials pre-configured.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-white/[0.06] bg-neutral-900/40 p-6 hover:bg-neutral-900/70 transition-all duration-500 hover:border-white/[0.15] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 mb-4 group-hover:bg-white/15 group-hover:scale-105 transition-all duration-300">
                  <feature.icon className="h-5 w-5 text-white/60 group-hover:text-white/80 transition-colors" />
                </div>
                <h3 className="font-medium text-white/80 group-hover:text-white transition-colors duration-300 mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 group-hover:text-white/50 transition-colors duration-300 leading-relaxed">
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
