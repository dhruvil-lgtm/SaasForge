import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to use SaaSForge to generate production-ready SaaS boilerplates. Supports Next.js, Express, FastAPI, Go, Rails, and Laravel with auth, database, and CI/CD.",
};

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-16 max-w-3xl relative">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-20" />
      <div className="relative">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-8">
          Documentation
        </h1>

        <section className="mb-14">
          <h2 className="text-2xl font-medium text-white mb-5">How it works</h2>
          <div className="text-white/50 space-y-4 leading-relaxed">
            <p>
              You pick a stack. We build a complete, production-ready SaaS boilerplate. We push it to your GitHub. You build on top of it.
            </p>
            <ol className="space-y-3 list-none">
              {[
                "Go to the generator and pick a framework (Next.js, Express, FastAPI, Go, Rails, or Laravel).",
                "Choose your features — auth, database, payments, CI/CD, whatever you need.",
                "Name your project and connect your GitHub account.",
                "Hit generate. We assemble the boilerplate and push a new repo under your account.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-xs text-white/40 shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-sm text-white/50">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-medium text-white mb-5">Supported stacks</h2>
          <div className="grid gap-2">
            {[
              { name: "Next.js + TypeScript", desc: "Full-stack React with App Router, Server Components, Tailwind, and the largest ecosystem." },
              { name: "Node.js + Express", desc: "Traditional server-side with EJS templates, API routing, and session management." },
              { name: "Python + FastAPI", desc: "Async Python framework with automatic OpenAPI docs and Pydantic validation." },
              { name: "Go + Gin + Templ", desc: "Compiled language with Gin router and type-safe HTML templating." },
              { name: "Ruby on Rails", desc: "MVC with convention-over-configuration, Active Record, and Hotwire." },
              { name: "Laravel (PHP)", desc: "Elegant PHP framework with Sanctum auth, Cashier billing, and Forge deployment." },
            ].map((stack) => (
              <div key={stack.name} className="rounded-xl border border-white/[0.06] bg-neutral-900/30 p-4">
                <h3 className="text-sm font-medium text-white">{stack.name}</h3>
                <p className="text-sm text-white/40 mt-1">{stack.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-medium text-white mb-5">What&apos;s included</h2>
          <div className="grid gap-2">
            {[
              { title: "JWT Auth", desc: "Signup, login, password reset, protected routes. Works with any frontend." },
              { title: "Supabase", desc: "Pre-configured client, schema migrations, RLS policies, seed data." },
              { title: "Stripe billing", desc: "Subscriptions, webhooks, customer portal, metered billing." },
              { title: "CI/CD", desc: "GitHub Actions for lint, test, build, deploy. One push to ship." },
              { title: "Docker", desc: "Production-ready Dockerfiles and docker-compose for self-hosting." },
              { title: "shadcn/ui", desc: "Component library with dark mode, responsive layout, accessible markup." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/[0.06] bg-neutral-900/30 p-4 flex items-start gap-4">
                <div className="shrink-0">
                  <div className="h-2 w-2 rounded-full bg-white/20 mt-2" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-white/40 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-white mb-5">API endpoints</h2>
          <div className="grid gap-2">
            {[
              { method: "POST", path: "/auth/signup", desc: "Create an account with email + password." },
              { method: "POST", path: "/auth/login", desc: "Authenticate and receive a JWT." },
              { method: "POST", path: "/auth/logout", desc: "Invalidate the current session." },
              { method: "GET", path: "/api/projects", desc: "List all generated projects (auth required)." },
            ].map((endpoint) => (
              <div key={endpoint.path} className="rounded-xl border border-white/[0.06] bg-neutral-900/30 p-4 flex items-start gap-4">
                <span className="shrink-0 rounded-md bg-white/5 px-2 py-1 text-[11px] font-mono text-white/70">{endpoint.method}</span>
                <div className="min-w-0">
                  <code className="text-sm font-mono text-white/80 block break-all">{endpoint.path}</code>
                  <p className="text-sm text-white/40 mt-0.5">{endpoint.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
