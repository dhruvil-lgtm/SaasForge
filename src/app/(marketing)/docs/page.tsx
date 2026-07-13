import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to use SaaSForge to generate production-ready SaaS boilerplates. Supports Next.js, Express, FastAPI, Go, Rails, and Laravel with auth, database, and CI/CD.",
};

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-white mb-8">
        Documentation
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-white mb-4">Getting Started</h2>
        <div className="text-white/60 space-y-4">
          <p>
            saasforge generates a complete, production-ready saas boilerplate based on your
            technology preferences. here&apos;s how to use it.
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to the <a href="/generate" className="text-white hover:underline">Generator</a> page</li>
            <li>Select your preferred framework (next.js, express, fastapi, go, rails, or laravel)</li>
            <li>Choose your features (auth, database, ui, deployment)</li>
            <li>Name your project</li>
            <li>Connect your github account</li>
            <li>Click &ldquo;Generate&rdquo; &mdash; we&apos;ll create a repo under your account</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-white mb-4">Supported Stacks</h2>
        <div className="grid gap-3">
          {[
            { name: "Next.js + TypeScript", desc: "Full-stack React framework with App Router, Server Components, and the largest ecosystem." },
            { name: "Node.js + Express", desc: "Traditional server-side framework with EJS templates, perfect for APIs and SSR apps." },
            { name: "Python + FastAPI", desc: "High-performance async Python framework with automatic OpenAPI docs." },
            { name: "Go + Gin + Templ", desc: "Blazing-fast compiled language with Gin router and type-safe templating." },
            { name: "Ruby on Rails", desc: "Full-featured MVC framework with convention-over-configuration philosophy." },
            { name: "Laravel (PHP)", desc: "Elegant PHP framework with extensive ecosystem including Sanctum auth and Cashier billing." },
          ].map((stack) => (
            <div key={stack.name} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <h3 className="font-medium text-white">{stack.name}</h3>
              <p className="text-sm text-white/50 mt-1">{stack.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-white mb-4">Features Included</h2>
        <ul className="space-y-3 text-white/60">
          <li><strong className="text-white">JWT Authentication</strong> &mdash; Complete login, signup, and password reset flows with middleware protection.</li>
          <li><strong className="text-white">Supabase Database</strong> &mdash; Pre-configured client with environment variables, ready to connect.</li>
          <li><strong className="text-white">CI/CD Pipeline</strong> &mdash; GitHub Actions workflows for testing, linting, and deployment.</li>
          <li><strong className="text-white">Docker Support</strong> &mdash; Dockerfiles for production-ready containerization.</li>
          <li><strong className="text-white">Deployment Config</strong> &mdash; Vercel, Railway, or Docker Compose configurations included.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-medium text-white mb-4">API Reference</h2>
        <p className="text-white/60 mb-4">
          The generated boilerplate includes these API endpoints:
        </p>
        <div className="space-y-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <code className="text-sm font-mono bg-white/10 text-white/80 px-2 py-0.5 rounded">POST /auth/signup</code>
            <p className="text-sm text-white/50 mt-1">Create a new user account with email and password.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <code className="text-sm font-mono bg-white/10 text-white/80 px-2 py-0.5 rounded">POST /auth/login</code>
            <p className="text-sm text-white/50 mt-1">Authenticate with email and password, receive a JWT token.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <code className="text-sm font-mono bg-white/10 text-white/80 px-2 py-0.5 rounded">GET /dashboard</code>
            <p className="text-sm text-white/50 mt-1">Protected route that returns user dashboard data (requires auth token).</p>
          </div>
        </div>
      </section>
    </div>
  );
}
